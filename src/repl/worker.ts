import Database from "../data/Database";

const start = () => {
  const db = new Database("databases");
  return db
    .allDocs()
    .then((result) => {
      console.log(`got alldocs() back: ${JSON.stringify(result)}`);
      return Promise.all(
        result.rows.map((row) => {
          return db.getExistingDocumentAndTemplate(row.id).then((doc) => {
            const data = doc.getData();
            if (data.template === "main" && data.remote_url) {
              return replicate(doc.getId(), data.remote_url);
            }
          });
        })
      );
    })
    .catch((err) => {
      console.error(`error in start: ${err}`);
    });
};

const replicate = async (db_id: string, remote_url: string) => {
  console.log(`starting replication of ${db_id}`);
  return new Database(db_id)
    .replicateFrom(new Database(remote_url))
    .then(() => {
      console.log(`finished replication of ${db_id}`);
    })
    .catch((err) => {
      console.error(`error in replicate: ${err}`);
    });
};

onmessage = function (e) {
  console.log(`Message received from main script: ${e.data}`);
  var workerResult = "Result: " + e.data[0] * e.data[1];
  start();
  // console.log("Posting message back to main script");
  // postMessage(workerResult);
};
