import { fusebox /*, pluginCSS, pluginPostCSS*/ } from "fuse-box";
import { IPublicConfig } from "fuse-box/config/IConfig";
import * as path from "path";

const env = process.env.NODE_ENV || "";
const workspace = path.join(__dirname, "../..");

if (["development", "production"].indexOf(env) === -1) {
  throw new Error(
    `unrecognized NODE_ENV: ${env} (should be 'development' or 'production')`
  );
}

const config: IPublicConfig = {
  entry: "../app/index.html",
  target: "browser",
  // plugins: [
  //   pluginPostCSS("*.css", {
  //     asModule: {
  //       scopeBehaviour: "local",
  //     },
  //   }),
  //   pluginCSS(),
  // ],
  devServer: false,
  // webIndex: {
  //   template: "../public/index.html",
  // },
  watcher: {
    root: workspace, // watch parent folder
  },
};

if (env === "development") {
  config.devServer = {
    httpServer: {
      express: (app, express) => {
        // example on how you can set something completely custom
        app.use(/.*\.css\.map$/, (req: any, res: any, next: any) => {
          res.status(404).end();
        });
      },
    },
  };
}

const fuse = fusebox(config);

if (env === "development") {
  fuse.runDev({
    bundles: {
      distRoot: "../../dist",
    },
  });
} else {
  fuse.runProd({
    bundles: {
      distRoot: "../../dist",
    },
  });
}
