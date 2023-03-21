export const getAppEnvVar = (varName: string): string | undefined =>
  process.env[`${varName}`];
