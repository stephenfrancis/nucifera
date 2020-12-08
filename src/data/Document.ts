import Database from "./Database";
import { error, info } from "./Logger";
import { Template } from "../types/Template";

export default class Document {
  private data: any;
  private db: Database;
  public readonly id: string;
  private template: Template;

  constructor(db: Database, id: string, data: any, template: Template) {
    this.db = db;
    this.id = id;
    this.data = data;
    this.template = template;
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
    return `/${this.db.name}/edit/${this.id}`;
  }

  getShowLink(): string {
    return `/${this.db.name}/show/${this.id}`;
  }

  getTemplate(): Template {
    return this.template;
  }

  save() {
    info(`saving document: ${this.id}`);
    if (!this.data.created_at) {
      this.data.created_at = Date.now();
    }
    return this.db.saveDocument(this.id, this.data);
  }
}
