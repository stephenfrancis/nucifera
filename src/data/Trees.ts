import beech from "../predefined/trees/beech.json";
import birch from "../predefined/trees/birch.json";
import deciduous from "../predefined/trees/deciduous.json";
import deciduouses from "../predefined/trees/deciduouses.json";
import docs from "../predefined/trees/docs.json";
import info from "../predefined/trees/info.json";
import main from "../predefined/trees/main.json";
import shrub from "../predefined/trees/shrub.json";
import shrubs from "../predefined/trees/shrubs.json";

const all = {
  beech,
  birch,
  deciduous,
  deciduouses,
  docs,
  info,
  main,
  shrub,
  shrubs,
};

Object.keys(all).forEach((doc_id) => {
  if (!all[doc_id] || all[doc_id]._id !== doc_id) {
    console.error(`invalid tree: ${doc_id}`);
  }
});

// console.log(`builtins: ${JSON.stringify(all, null, 2)}`);

export default all;
