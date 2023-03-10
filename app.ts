import * as readline from "readline";
import { getTestAccessToken, TestUserCredentials } from "@itwin/oidc-signin-tool";
import { AccessToken } from "@itwin/core-bentley";
import dotenv from "dotenv";
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class TokenGetter {
  public static async getTokenFromSigninTool(username: string, secret: string): Promise<AccessToken> {
    const oidcConfig = {
      clientId: process.env.CLIENT_ID,
      redirectUri: "http://localhost:3000/signin-callback",
      scope: process.env.SCOPES,
      authority: "https://ims.bentley.com",
    };

    const userCredentials: TestUserCredentials = {
      email: username,
      password: secret,
    };

    let token;
    try {
      token = await getTestAccessToken(oidcConfig, userCredentials);
    } catch (err) {
      const error = "oidc-signin-tool failed to generate token and failed with error: " + err;
      throw Error(error);
    }
    return token;
  }
}

rl.question('Email: ', (email: string) => {
  hideInput();
  rl.question('Password: ', (async (password: string) => {
    rl.close();
    const token = await TokenGetter.getTokenFromSigninTool(email, password);
    console.log('\n\x1b[36m%s\x1b[0m\n', '-'.repeat(40));
    console.log(token);
    console.log('\n\x1b[36m%s\x1b[0m\n', '-'.repeat(40));
  }));
});

const hideInput = () => {
  process.stdin.on("keypress", function (c, k) {
    var len = rl.line.length;
    readline.moveCursor(process.stdout, -len, 0);
    readline.clearLine(process.stdout, 1);
    for (var i = 0; i < len; i++) {
      process.stdout.write("*");
    }
  });
}
