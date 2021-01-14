import * as React from "react";
import { BrowserRouter, Link, Redirect } from "react-router-dom";

import Body from "./Mainarea";
import Database from "../data/Database";
import Footer from "./Footer";
import Header from "./Header";
import { error, info } from "../data/Logger";
import Trees from "../data/Trees";

interface Props {}

const Test: React.FC<Props> = (props) => {
  React.useEffect(() => {
    info("beginning load...");
    const db_trees = new Database("trees");
    db_trees
      .getInfo()
      .then((db_info) => {
        info(`${db_info.doc_count} documents to delete...`);
        return db_trees.allDocs();
      })
      .then((result) => {
        if (result.rows) {
          return Promise.all(
            result.rows.map((row) => {
              info(`deleting document ${JSON.stringify(row)}...`);
              return db_trees.delete(row.id, row.value.rev);
            })
          );
        }
        return Promise.resolve(null);
      })
      .then(() => {
        info(`adding new documents...`);
        return Promise.all(
          Object.keys(Trees).map((doc_id) =>
            db_trees.saveDocument(doc_id, Trees[doc_id])
          )
        );
      })
      .then(() => {
        info(`finished...`);
      })
      .catch((err) => {
        error(`an error occurred :-( ${err}`);
      });
    /*
    const db_name = "trees-server";
    const db_local = new Database(db_name);
    const db_remote = new Database("http://localhost:5984/" + db_name);
    db_local
      .getInfo()
      .then((db_info) => {
        if (db_info.doc_count > 0) {
          throw new Error(`${db_name} is already populated`);
        }
        info("beginning replication...");
        return db_local.replicateFrom(db_remote);
      })
      .then(() => {
        info("replication completed");
      })
      .catch((err) => {
        error(err);
      });
      */
  }, []);

  return (
    <>
      <Header></Header>
      <Body>
        <h1>Test</h1>
        <p>Re-loading the trees database, see log panel for progress</p>
        {/* <p>Replicating the trees-server database, see log panel for progress</p> */}
      </Body>
      <Footer></Footer>
    </>
  );
};

export default Test;
