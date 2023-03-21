import React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

export enum AppLoggerCategory {
  Frontend = "iTwinViewer.Frontend",
  Backend = "iTwinViewer.Backend",
}

const appFrontendMain = async () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

appFrontendMain(); // eslint-disable-line @typescript-eslint/no-floating-promises
