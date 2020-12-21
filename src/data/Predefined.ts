import PouchDB from "pouchdb";

import Builtins from "./Builtins";

export function checkAndPopulateDatabase(db: PouchDB.Database): Promise<any> {
  if (db.name === "databases") {
    return db.info().then((info) => {
      if (info.doc_count === 0) {
        return Promise.all([db.put(Builtins.docs), db.put(Builtins.main)]);
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
