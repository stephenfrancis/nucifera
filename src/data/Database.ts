import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

import Builtins from "./Builtins";
import Document from "./Document";
import { error, info } from "./Logger";
import { checkAndPopulateDatabase } from "./Predefined";
import { Template } from "../types/Template";
import View from "./View";
import { DocContent } from "../types/General";
import { View as ViewSpec } from "../types/View";

PouchDB.plugin(PouchDBFind);

export default class Database {
  public readonly name: string;
  private pouch: PouchDB.Database;

  constructor(name: string) {
    this.name = name;
    this.pouch = new PouchDB(name);
    info(`opening database: ${name}`);
    checkAndPopulateDatabase(this.pouch);
  }

  allDocs(options?: any): Promise<any> {
    return this.pouch.allDocs(options || {});
  }

  createNewDocumentFromTemplate(
    template_id: string,
    _id?: string
  ): Promise<Document> {
    info(`createNewDocumentFromTemplate(${template_id}, ${_id})`);
    let builtin: Template;
    let id_already_exists = true;
    if (!_id) {
      _id = `d${Math.random() * 10e16}`;
    }
    return this.pouch
      .get(_id)
      .catch((err) => {
        if (err.name === "not_found") {
          id_already_exists = false;
        } else {
          error(err);
        }
      })
      .then(() => {
        if (id_already_exists) {
          throw new Error(`id already exists: ${_id}`);
        }
        builtin = this.getBuiltin(template_id);
        if (!builtin) {
          return this.pouch.get(template_id);
        }
      })
      .then((template: any) => {
        return new Document(
          this,
          _id,
          {
            _id,
            template: template_id,
          },
          builtin || template
        );
      });
  }

  delete(_id: string, _rev: string): Promise<any> {
    return this.pouch.remove(_id, _rev);
  }

  // requires pouch-find plugin
  find(
    index_name: string,
    index_fields: string[],
    retrieve_fields: string[],
    selector?: any,
    sort?: string[]
  ): Promise<any> {
    // this.pouch.getIndexes()
    //   .then((indexes) => {
    //     console.log()
    //   })
    if (retrieve_fields.indexOf("_id") === -1) {
      retrieve_fields.push("_id");
    }
    info(`creating index: ${index_name}, with fields: ${index_fields}`);
    return this.pouch
      .createIndex({
        index: {
          name: index_name,
          fields: index_fields,
        },
      })
      .then(() => {
        info(
          `executing find: selector: ${JSON.stringify(
            selector
          )}; fields: ${retrieve_fields}; sort: ${sort}`
        );
        return this.pouch.find({
          selector,
          fields: retrieve_fields,
          sort,
        });
      })
      .then((data) => {
        info(`${data.docs.length} documents retrieved`);
        console.log(`returned data from find: ${JSON.stringify(data)}`);
        return data.docs as DocContent[];
      });
  }

  getBuiltin(template_or_view_id: string): any {
    if (template_or_view_id.indexOf("builtin:") === 0) {
      return Builtins[template_or_view_id.substr(8)];
    }
    return null;
  }

  getDocOrBuiltIn(template_or_view_id: string): Promise<any> {
    const builtin = this.getBuiltin(template_or_view_id);
    if (builtin) {
      return Promise.resolve(builtin);
    }
    return this.pouch.get(template_or_view_id);
  }

  getExistingDocumentAndTemplate(_id: string): Promise<Document> {
    let doc;
    info(`getExistingDocumentAndTemplate(${_id})`);
    return this.pouch
      .get(_id)
      .then((result: any) => {
        info(`got doc: ${JSON.stringify(result)}`);
        doc = result;
        if (!doc._rev) {
          error(`no _rev in retrieved doc`);
        }
        const template_id = doc.template;
        if (!template_id) {
          throw "no template specified in document";
        }
        info(`getting template: ${template_id}`);
        return this.getDocOrBuiltIn(template_id);
      })
      .then((result: any) => {
        info(`got template: ${JSON.stringify(result)}`);
        return new Document(this, _id, doc, result);
      })
      .catch((err) => {
        error(err);
        if (!doc) {
          throw err;
        }
        info(`template not found in database, using builtin`);
        return new Document(this, _id, doc, Builtins.main as Template);
      });
  }

  getInfo(): Promise<PouchDB.Core.DatabaseInfo> {
    return this.pouch.info();
  }

  getView(view_id: string): Promise<View> {
    info(`getView(${view_id})`);
    return this.getDocOrBuiltIn(view_id)
      .then((result: any) => {
        return result as ViewSpec;
      })
      .catch((err) => {
        error(err);
        info(
          `view '${view_id}' not found in database, using builtin '${JSON.stringify(
            Builtins.docs
          )}'`
        );
        return Builtins.docs as ViewSpec;
      })
      .then((spec: ViewSpec) => {
        return new View(this, view_id, spec);
      });
  }

  replicateFrom(
    remote_db: Database,
    options?: PouchDB.Replication.ReplicateOptions
  ): Promise<any> {
    return this.pouch.replicate.from(remote_db.pouch, options);
  }

  replicateTo(
    remote_db: Database,
    options?: PouchDB.Replication.ReplicateOptions
  ): Promise<any> {
    return this.pouch.replicate.to(remote_db.pouch, options);
  }

  saveDocument(_id: string, data: any) {
    data._id = _id;
    if (!data.created_at) {
      data.created_at = Date.now();
    }
    return this.pouch.put(data);
  }
}
