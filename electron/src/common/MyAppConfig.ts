

import { iTwinChannel } from "@itwin/core-common";

export const channelName = iTwinChannel("my-app");

export interface MyAppIpc {
  getConfig: () => Promise<ViewerConfig>;
  initAuth: () => Promise<void>;
}

export interface ViewerConfig {
  clientId: string;
  redirectUri: string;
  issuerUrl?: string;
}
