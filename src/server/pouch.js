const express = require("express");
const app = express();
const PouchDB = require("pouchdb");
const Fs = require("fs");

app.use(
  "/db",
  require("express-pouchdb")(PouchDB, {
    configPath: "./build/couch-server/config.json",
  })
);

const db = new PouchDB("trees");
db.info()
  .then((data) => {
    console.log(`${data.doc_count} documents to delete...`);
    return db.allDocs();
  })
  .then((result) => {
    if (result.rows) {
      return Promise.all(
        result.rows.map((row) => {
          return db.remove(row.id, row.value.rev);
        })
      );
    }
    return Promise.resolve(null);
  })
  .then((items) => {
    console.log(`deleted ${items ? items.length : 0}; adding new documents...`);
    const trees_dir = "../../src/predefined/trees/";
    const files = Fs.readdirSync(trees_dir, {
      encoding: "utf8",
    }).filter((name) => name.match(/\.json$/));
    return Promise.all(
      files.map((filename) =>
        db.put(
          JSON.parse(
            Fs.readFileSync(trees_dir + filename, {
              encoding: "utf8",
            })
          )
        )
      )
    );
  })
  .then((items) => {
    console.log(`added ${items ? items.length : 0}; finished...`);
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(5984);
