
import { useAccessToken } from "../hooks/useMyAccessToken";
import React from "react";

import { SignIn } from "./signin/SignIn";

export const Home = () => {
  const accessToken = useAccessToken();

  return accessToken ? (
    <div>{accessToken}</div>
  ) : (
    <div>
      <SignIn />
    </div>
  );
};
