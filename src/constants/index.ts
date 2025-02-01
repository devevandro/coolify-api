import dotenv from 'dotenv';
dotenv.config();

export const ENVIRONMENTS = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  COOLIFY_API_TOKEN: process.env.COOLIFY_API_TOKEN,
  COOLIFY_API_URL: process.env.COOLIFY_API_URL,
  PROJECT_UUID: process.env.PROJECT_UUID,
  SERVER_UUID: process.env.SERVER_UUID,
  GITHUB_APP_UUID: process.env.GITHUB_APP_UUID,
  ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
};
