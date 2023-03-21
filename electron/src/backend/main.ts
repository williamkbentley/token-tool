import { IModelHostConfiguration } from "@itwin/core-backend";
import type { ElectronHostOptions } from "@itwin/core-electron/lib/cjs/ElectronBackend";
import { ElectronHost } from "@itwin/core-electron/lib/cjs/ElectronBackend";
import { BackendIModelsAccess } from "@itwin/imodels-access-backend";

import * as path from "path";

import MyAppHandler from "./MyAppHandler";

require("dotenv-flow").config(); // eslint-disable-line @typescript-eslint/no-var-requires

const myAppMain = async () => {
  const electronHost: ElectronHostOptions = {
    webResourcesPath: path.join(__dirname, "..", "..", "build"),
    developmentServer: process.env.NODE_ENV === "development",
    ipcHandlers: [MyAppHandler],
  };

  const iModelHost = new IModelHostConfiguration();
  iModelHost.hubAccess = new BackendIModelsAccess();

  await ElectronHost.startup({ electronHost, iModelHost });

  await ElectronHost.openMainWindow({
    width: 1280,
    height: 800,
    show: true,
    title: "My App",
    autoHideMenuBar: false,
  });
};


try {
  void myAppMain();
} catch (error) {
  process.exitCode = 1;
}
