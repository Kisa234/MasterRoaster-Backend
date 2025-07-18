import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  JWT_REFRESH_SECRET: get('JWT_REFRESH_SECRET').required().asString(),
  CORS_ORIGINS: get('CORS_ORIGINS').default('').asArray(',')

}



