import design from "../predefined/builtin/design.json";
import docs from "../predefined/builtin/docs.json";
import info from "../predefined/builtin/info.json";
import main from "../predefined/builtin/main.json";
import template from "../predefined/builtin/template.json";
import view from "../predefined/builtin/view.json";

const all = {
  design,
  docs,
  info,
  main,
  template,
  view,
};

Object.keys(all).forEach((doc_id) => {
  if (!all[doc_id] || all[doc_id]._id !== doc_id) {
    console.error(`invalid builtin: ${doc_id}`);
  }
});

export default all;
