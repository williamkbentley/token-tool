import React, { useEffect, useState } from "react";
import { ElectronRendererAuthorization } from "@itwin/electron-authorization/lib/cjs/ElectronRenderer";
import { ElectronApp } from "@itwin/core-electron/lib/cjs/ElectronFrontend";
import { Home } from "./Home";
import { MyApp } from "../app/MyApp";

const App = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const doInit = async () => {
      const authClient = new ElectronRendererAuthorization();
      await ElectronApp.startup({
        iModelApp: { authorizationClient: authClient },
      });
      // Initialize my auth client on the backend
      void MyApp.ipcCall.initAuth();
    };

    doInit().then(() => setInitialized(true));
  }, [initialized]);

  return initialized ? (
    <div style={{ height: "100%" }}>
      <Home />
    </div>
  ) : (
    <></>
  );
};

export default App;
