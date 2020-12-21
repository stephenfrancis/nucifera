
const PouchDB = require("pouchdb")
const Fs = require("fs")

const pouch = new PouchDB("trees")
const path = "./src/predefined/trees/"
const files = Fs.readdirSync(path);
files.forEach((name) => {
  const data = JSON.parse(Fs.readFileSync(path + name))
  console.log(`file: ${name} tax: ${data.taxonomy}`)
  pouch.put(data)
})
