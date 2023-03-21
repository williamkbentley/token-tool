import type { AccessToken } from "@itwin/core-bentley";
import { IModelApp } from "@itwin/core-frontend";
import { useEffect, useState } from "react";
import { ElectronRendererAuthorization } from "@itwin/electron-authorization/lib/cjs/ElectronRenderer";


// Hook to get the access token from the authClient
export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<AccessToken>();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await IModelApp.authorizationClient?.getAccessToken();
        setAccessToken(token);
      } catch {}
    };
    void getAccessToken();
  }, []);

  useEffect(() => {
    (IModelApp.authorizationClient as ElectronRendererAuthorization).onAccessTokenChanged.addListener(e => setAccessToken(e));
  }, []);

  return accessToken;
};
