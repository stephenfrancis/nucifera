import PouchDB from "pouchdb";
import BuiltinTemplate from "./builtin_template.json";

import { error, info } from "./Logger";
import { Template } from "../types/Template";

export default class Database {
  public readonly name: string;
  private db_id: string;
  private pouch: PouchDB.Database;

  constructor(db_id: string) {
    this.db_id = db_id;
    this.name = db_id;
    this.pouch = new PouchDB(db_id);
    info(`opening database: ${db_id}`);
  }

  createNewDocumentFromTemplate(
    template_id: string,
    doc_id?: string
  ): Promise<[{}, Template]> {
    info(`createNewDocumentFromTemplate(${template_id}, ${doc_id})`);
    let template: Template;
    return this.pouch
      .get(template_id)
      .then((result: any) => {
        template = result;
      })
      .catch((err) => {
        error(err);
        template = BuiltinTemplate as Template;
      })
      .then(() => {
        return [{}, template];
      });
  }

  getExistingDocumentAndTemplate(doc_id: string): Promise<[any, Template]> {
    let doc, template;
    info(`getExistingDocumentAndTemplate(${doc_id})`);
    return this.pouch
      .get(doc_id)
      .then((result: any) => {
        doc = result;
        const template_id = doc.template;
        if (template_id && template_id !== "main") {
          info(`getting template: ${template_id}`);
          return this.pouch.get(template_id);
        }
      })
      .then((result: any) => {
        if (result) {
          template = result;
        } else {
          info(`getting template: main`);
          return this.pouch.get("main");
        }
      })
      .then((result: any) => {
        if (result) {
          template = result;
        }
        if (!template) {
          info(`getting template: builtin`);
          template = BuiltinTemplate as Template;
        }
        return [doc, template];
      });
  }
}
