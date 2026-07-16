import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { join } from 'path';

/**
 * 
 * Types
 * 
 */

type EnvType = {
  ENV: string;
};

type DatabaseTypes = {
  ENV_DB_HOST: string;
  ENV_DB_PORT: string;
  ENV_DB_USERNAME: string;
  ENV_DB_PASSWORD: string;
  ENV_DB_NAME: string;
};


/**
 * 
 * Env Files
 * 
 */
function getEnvData(): DatabaseTypes {

  const env: EnvType = dotenv.config(
    {
      path: path.resolve(
        __dirname,
        '../../../../',
        '.env'
      )
    }
  ).parsed as EnvType;

  if (env.ENV === "main") {
    return dotenv.config(
      {
        path: path.resolve(
          __dirname,
          '../../../../',
          '.env.main'
        )
      }
    ).parsed as DatabaseTypes;
  }
  else {
    return dotenv.config(
      {
        path: path.resolve(
          __dirname,
          '../../../../',
          '.env.local'
        )
      }
    ).parsed as DatabaseTypes;
  }
}

const env_data = getEnvData();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env_data.ENV_DB_HOST,
  port: parseInt(env_data.ENV_DB_PORT || '5432'),
  username: env_data.ENV_DB_USERNAME,
  password: env_data.ENV_DB_PASSWORD,
  database: env_data.ENV_DB_NAME,
  synchronize: false, // Siempre false
  entities: [join(__dirname, '../entities/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations'
});