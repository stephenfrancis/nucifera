import PouchDB from "pouchdb";

import docs from "../predefined/databases/docs.json";
import main from "../predefined/databases/main.json";

export function checkAndPopulateDatabase(db: PouchDB.Database): Promise<any> {
  if (db.name === "databases") {
    return db.info().then((info) => {
      if (info.doc_count === 0) {
        return Promise.all([db.put(docs), db.put(main)]);
      }
    });
    // } else if (db.name === "trees") {
    //   return db.info().then((info) => {
    //     if (info.doc_count === 0) {
    //       return Promise.all([
    //         db.put(TreesBirch),
    //         db.put(TreesDocs),
    //         db.put(TreesMain),
    //       ]);
    //     }
    //   });
  }
  return Promise.resolve();
}
