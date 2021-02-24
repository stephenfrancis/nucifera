import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";

import Database from "./Database";
import { error, info } from "./Logger";
import { Template } from "../types/Template";
import { validateTemplate } from "../app/fields/validate";

export default class Document {
  private data: any;
  private db: Database;
  private has_been_deleted: boolean;
  private orig_data: any;
  public readonly _id: string;
  private template: Template;

  constructor(db: Database, data: any, template: Template) {
    this.db = db;
    this.has_been_deleted = false;
    this._id = data._id || "<unassigned>";
    this.data = data;
    this.orig_data = cloneDeep(data);
    this.template = template;
  }

  delete(): Promise<any> {
    this.has_been_deleted = true;
    if (this._id && this.data._rev) {
      return this.db.delete(this._id, this.data._rev);
    }
    return Promise.resolve(null);
  }

  getData(): any {
    return this.data;
  }

  getDatabase(): Database {
    return this.db;
  }

  getDefaultViewLink(): string {
    return `/${this.db.name}/view/docs`;
  }

  getEditLink(): string {
    return `/${this.db.name}/edit/${this._id}`;
  }

  getShowLink(): string {
    return `/${this.db.name}/show/${this._id}`;
  }

  getTemplate(): Template {
    return this.template;
  }

  isModified(): boolean {
    return !isEqual(this.data, this.orig_data);
  }

  isValid(): boolean {
    return validateTemplate(this.template, this.data);
  }

  save(): Promise<void> {
    if (this.has_been_deleted) {
      throw new Error(
        `document ${this._id} has been deleted and cannot be saved`
      );
    }
    if (!this.isModified()) {
      throw new Error(`document ${this._id} is not modified`);
    }
    if (!this.isValid()) {
      throw new Error(`document ${this._id} is not valid`);
    }
    info(`saving document: ${this._id}`);
    return this.db.saveDocument(this.data).then(() => {
      info("saved");
    });
  }
}
