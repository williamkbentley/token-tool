import { IModelHost, IpcHandler } from "@itwin/core-backend";
import { ElectronMainAuthorization } from "@itwin/electron-authorization/lib/cjs/ElectronMain";

import type {
  MyAppIpc,
  ViewerConfig,
} from "../common/MyAppConfig";
import { channelName } from "../common/MyAppConfig";
import { getAppEnvVar } from "./AppInfo";

class MyAppHandler extends IpcHandler implements MyAppIpc {
  private static _authInitialized = false;

  public get channelName() {
    return channelName;
  }
  /**
   * create the config object to send to the frontend
   * @returns Promise<ViewerConfig>
   */
  public async getConfig(): Promise<ViewerConfig> {
    return {
      clientId: getAppEnvVar("CLIENT_ID") ?? "",
      redirectUri: getAppEnvVar("REDIRECT_URI") ?? "",
      issuerUrl: getAppEnvVar("ISSUER_URL"),
    };
  }

  /**
    Initialize IModelHost.authorizationClient with an instance of ElectronMainAuthorization
   */
  public async initAuth(): Promise<void> {
    if (!MyAppHandler._authInitialized) {
      const clientId = getAppEnvVar("CLIENT_ID") ?? "";
      const scope = getAppEnvVar("SCOPE") ?? "";
      const redirectUri = getAppEnvVar("REDIRECT_URI");
      const issuerUrl = getAppEnvVar("ISSUER_URL");

      const authClient = new ElectronMainAuthorization({
        clientId,
        scope,
        redirectUri: redirectUri,
        issuerUrl: issuerUrl,
      });
      await authClient.signInSilent();
      IModelHost.authorizationClient = authClient;
      MyAppHandler._authInitialized = true;
    }
  }
}

export default MyAppHandler;
