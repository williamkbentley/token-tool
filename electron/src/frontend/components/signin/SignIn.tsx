import { IModelApp } from "@itwin/core-frontend";
import { ElectronRendererAuthorization } from "@itwin/electron-authorization/lib/cjs/ElectronRenderer";
import { Button } from "@itwin/itwinui-react";
import React, { useState } from "react";

export const SignIn = () => {
  const [signingIn, setSigningIn] = useState(false);

  const onSignInClick = async () => {
    setSigningIn(true);
    // Check if the IModelApp auth client is ElectronRenderer. It should be because
    // of the useDesktopViewerInitializer in App.tsx
    if (
      IModelApp.authorizationClient instanceof ElectronRendererAuthorization
    ) {
      await IModelApp.authorizationClient?.signIn();
    }
  };

  return (
    <div className="signin-container">
      <div className="signin">
        <Button
          className="signin-button"
          styleType="cta"
          disabled={signingIn}
          onClick={onSignInClick}
        >
          Sign In
        </Button>
        {signingIn && (
          <span>Please switch to your browser and enter your credentials</span>
        )}
      </div>
    </div>
  );
};
