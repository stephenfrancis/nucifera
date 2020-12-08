import PouchDB from "pouchdb";

import BuiltinTemplate from "../predefined/builtin/main.json";
import BuiltinView from "../predefined/builtin/docs.json";
import DatabasesTemplate from "../predefined/databases/main.json";
import DatabasesView from "../predefined/databases/docs.json";
import Document from "./Document";
import { error, info } from "./Logger";
import { Template } from "../types/Template";
import View from "./View";
import { View as ViewSpec } from "../types/View";

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

  allDocs(options?: any): Promise<any> {
    return this.pouch.allDocs(options);
  }

  createNewDocumentFromTemplate(
    template_id: string,
    doc_id?: string
  ): Promise<Document> {
    info(`createNewDocumentFromTemplate(${template_id}, ${doc_id})`);
    let template: Template;
    if (!doc_id) {
      doc_id = `d${Math.random() * 10e16}`;
    }
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
        return new Document(this, doc_id, {}, template);
      });
  }

  // requires puch-find plugin
  // find(request?: any): Promise<any> {
  //   return this.pouch.find();
  // }

  getExistingDocumentAndTemplate(doc_id: string): Promise<Document> {
    let doc;
    info(`getExistingDocumentAndTemplate(${doc_id})`);
    return this.pouch
      .get(doc_id)
      .then((result: any) => {
        doc = result;
        const template_id = doc.template;
        if (!template_id) {
          throw "no template specified in document";
        }
        info(`getting template: ${template_id}`);
        return this.pouch.get(template_id);
      })
      .then((result: any) => {
        return new Document(this, doc_id, doc, result);
      })
      .catch((err) => {
        error(err);
        if (this.db_id === "databases" && doc_id === "docs") {
          return this.saveDocument("docs", DatabasesTemplate).then(() => {
            return new Document(
              this,
              doc_id,
              DatabasesTemplate,
              BuiltinTemplate as Template
            );
          });
        }
        if (!doc) {
          throw err;
        }
        info(`template not found in database, using builtin`);
        return new Document(this, doc_id, doc, BuiltinTemplate as Template);
      });
  }

  getInfo(): Promise<PouchDB.Core.DatabaseInfo> {
    return this.pouch.info();
  }

  getView(view_id: string): Promise<View> {
    info(`getView(${view_id})`);
    return this.pouch
      .get(view_id)
      .then((result: any) => {
        return result as ViewSpec;
      })
      .catch((err) => {
        error(err);
        if (this.db_id === "databases" && view_id === "docs") {
          return this.saveDocument("docs", DatabasesView).then(() => {
            return DatabasesView as ViewSpec;
          });
        }
        info(`view ${view_id} not found in database, using builtin`);
        return BuiltinView as ViewSpec;
      })
      .then((spec: ViewSpec) => {
        return new View(this, view_id, spec);
      });
  }

  saveDocument(id: string, data: any) {
    data._id = id;
    return this.pouch.put(data);
  }
}
