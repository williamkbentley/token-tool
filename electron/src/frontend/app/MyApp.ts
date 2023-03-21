import type { AsyncFunction, PromiseReturnType } from "@itwin/core-bentley";
import { IpcApp } from "@itwin/core-frontend";

import type { ViewerConfig, MyAppIpc } from "../../common/MyAppConfig";
import { channelName } from "../../common/MyAppConfig";


export class MyApp {
  private static _config: ViewerConfig;

  public static ipcCall = new Proxy({} as MyAppIpc, {
    get(_target, key: keyof MyAppIpc): AsyncFunction {

      const makeIpcCall =
        <T extends keyof MyAppIpc>(methodName: T) =>
        async (...args: Parameters<MyAppIpc[T]>) =>
          IpcApp.callIpcChannel(
            channelName,
            methodName,
            ...args
          ) as PromiseReturnType<MyAppIpc[T]>;

      switch (key) {
        case "getConfig":
          return async () => {
            if (!MyApp._config) {
              MyApp._config = await makeIpcCall("getConfig")();
            }
            return MyApp._config;
          };
        default:
          return makeIpcCall(key);
      }
    },
  });
}
