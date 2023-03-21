# Getting Started with the iTwin Viewer Create React App Template

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment Variables

Prior to running the app, you will need to add OIDC client configuration to the variables in the .env file:

```
CLIENT_ID="native-xxxxxxxx"
```

- You should generate a [client](https://developer.bentley.com/register/) to get started. The client that you generate should be for a desktop app and use the following list of apis. You can add the default redirect uri (http://localhost:3000/signin-callback).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the Electron app in the development mode.\
The page will reload if you make edits.
