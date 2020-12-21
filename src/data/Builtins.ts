import design from "../predefined/builtin/design.json";
import docs from "../predefined/builtin/docs.json";
import main from "../predefined/builtin/main.json";
import template from "../predefined/builtin/template.json";
import view from "../predefined/builtin/view.json";

const all = {
  design,
  docs,
  main,
  template,
  view,
};

Object.keys(all).forEach((doc_id) => {
  if (!all[doc_id] || all[doc_id]._id !== doc_id) {
    console.error(`invalid builtin: ${doc_id}`);
  }
});

// console.log(`builtins: ${JSON.stringify(all, null, 2)}`);

export default all;
