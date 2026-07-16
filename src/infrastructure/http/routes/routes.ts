import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * 
 * Types
 * 
 */

type EnvType = {
  ENV: string;
};

type RouteTypes = {
  ENV_APP_HOST: string;
  ENV_APP_PATH: string;
  ENV_APP_PORT: string;
  ENV_LEAD_RESOURCE: string;
  ENV_VISITS_RESOURCE: string;
  ENV_SWAGGER_DOCS_RESOURCE: string;
};


/**
 * 
 * Env Files
 * 
 */

function getEnvData(): RouteTypes {

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
    ).parsed as RouteTypes;
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
    ).parsed as RouteTypes;
  }
}

const env_data = getEnvData();


/**
 * 
 */
function getAppHost(
  host: string | undefined,
): string {

  return host
    ? env_data.ENV_APP_HOST
    : 'localhost';
}

/**
 * 
 */
function getAppPath(
  app_path: string | undefined,
): string {

  return app_path
    ? env_data.ENV_APP_PATH
    : '/v1';
}

/**
 * 
 */
function getAppPort(
  port: string | undefined
): string {
  if (port) {
    try {
      parseInt(port);
      return port;
    }
    catch (err: any) {
      throw new Error(`The environment variable ENV_APP_PORT does not contain a numeric value, ${err.toString()}`);
    }
  }
  return '8080';
}

/**
 * 
 */
function getAppLeadResource(
  operation: string | undefined
): string {

  return operation
    ? env_data.ENV_LEAD_RESOURCE
    : '/lead';
}

/**
 * 
 */
function getAppVistisResource(
  operation: string | undefined
): string {

  return operation
    ? env_data.ENV_VISITS_RESOURCE
    : '/lead';
}

/**
 * 
 */
function getAppSwaggerResource(
  operation: string | undefined
): string {

  return operation
    ? env_data.ENV_SWAGGER_DOCS_RESOURCE
    : '/docs';
}

/**
 * 
 */
export const routes: RouteTypes = {
  ENV_APP_HOST: getAppHost(
    env_data.ENV_APP_HOST,
  ),
  ENV_APP_PATH: getAppPath(
    env_data.ENV_APP_PATH
  ),
  ENV_APP_PORT: getAppPort(
    env_data.ENV_APP_PORT
  ),
  ENV_LEAD_RESOURCE: getAppLeadResource(
    env_data.ENV_LEAD_RESOURCE
  ),
  ENV_VISITS_RESOURCE: getAppVistisResource(
    env_data.ENV_VISITS_RESOURCE
  ),
  ENV_SWAGGER_DOCS_RESOURCE: getAppSwaggerResource(
    env_data.ENV_SWAGGER_DOCS_RESOURCE
  )
}