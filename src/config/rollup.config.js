import builtins from "rollup-plugin-node-builtins";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import globals from "rollup-plugin-node-globals";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import typescript from "@rollup/plugin-typescript";

const isDevelopment = process.env.NODE_ENV === "development";

export default {
  input: "app/App.tsx",
  output: {
    // file: "build/index.js",
    dir: "../dist/",
    format: "iife",
    sourcemap: true,
    // exports: "named",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    builtins(),
    commonjs(),
    copy({
      targets: [
        { src: "assets/**", dest: "../dist/" },
        { src: "public/**", dest: "../dist/" },
      ],
    }),
    css({ output: "bundle.css" }),
    globals(),
    json(),
    nodeResolve({ browser: true, preferBuiltins: true }),
    isDevelopment
      ? serve({ contentBase: "../dist", historyApiFallback: true })
      : null,
    typescript(),
  ],
};
