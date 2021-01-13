const FakeCouchServer = require("fakecouch");
const Fs = require("fs");

const couch = new FakeCouchServer({
  port: 5984,
  logger: false,
});

couch.setup();
couch.authenticate();

const db = couch.addDatabase("trees-server");

console.log(process.cwd());

const path = "./src/predefined/trees";
Fs.readdirSync(path, {
  encoding: "utf8",
}).forEach((filename) => {
  if (filename.endsWith(".json"))
    db.addDoc(
      JSON.parse(
        Fs.readFileSync(path + "/" + filename, {
          encoding: "utf8",
        })
      )
    );
});

const terminate = () => {
  couch.reset();
  process.exit(0);
};

process.on("SIGINT", () => {
  terminate();
});

process.on("SIGTERM", () => {
  terminate();
});
