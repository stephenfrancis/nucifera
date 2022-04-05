const Fs = require("fs");
const Ajv = require("ajv");
const ajv = new Ajv();

const getObjFromFile = (filename) =>
  JSON.parse(
    Fs.readFileSync(__dirname + filename, {
      encoding: "utf-8",
    })
  );

let all_passed = true;

const testAndOutput = (validator, filename) => {
  const data = getObjFromFile(filename);
  if (validator(data)) {
    console.log(`${filename} passed`);
  } else {
    console.log(`${filename} failed:`);
    console.error(JSON.stringify(validator.errors, null, 2));
    all_passed = false;
  }
};

const viewValidator = ajv.compile(getObjFromFile("/view.json"));
const templateValidator = ajv.compile(getObjFromFile("/template.json"));

testAndOutput(viewValidator, "/../predefined/builtin/design.json");
testAndOutput(viewValidator, "/../predefined/builtin/docs.json");
testAndOutput(viewValidator, "/../predefined/databases/docs.json");
testAndOutput(viewValidator, "/../predefined/trees/deciduouses.json");
testAndOutput(viewValidator, "/../predefined/trees/docs.json");
testAndOutput(viewValidator, "/../predefined/trees/shrubs.json");

testAndOutput(templateValidator, "/../predefined/builtin/info.json");
testAndOutput(templateValidator, "/../predefined/builtin/main.json");
testAndOutput(templateValidator, "/../predefined/builtin/template.json");
testAndOutput(templateValidator, "/../predefined/databases/main.json");
testAndOutput(templateValidator, "/../predefined/trees/deciduous.json");
testAndOutput(templateValidator, "/../predefined/trees/main.json");
testAndOutput(templateValidator, "/../predefined/trees/shrub.json");

if (!all_passed) {
  process.exit(-1);
}
