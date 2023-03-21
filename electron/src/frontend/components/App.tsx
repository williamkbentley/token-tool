import React, { useEffect } from "react";

import { Home } from "./Home";
import { MyApp } from "../app/MyApp";
import { useDesktopViewerInitializer } from "@itwin/desktop-viewer-react";

const App = () => {

  // Here, I am using the initializer from the desktop viewer
  // It does a bunch of stuff
  // https://github.com/iTwin/viewer/blob/master/packages/modules/desktop-viewer-react/src/hooks/useDesktopViewerInitializer.tsx
  const initialized = useDesktopViewerInitializer({
    enablePerformanceMonitors: true,
  });

  useEffect(() => {
    if (initialized) {
      // Initialize my auth client on the backend
      void MyApp.ipcCall.initAuth();
    }
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
