import { createHash } from 'crypto';
import * as path from 'path';
import * as dotenv from 'dotenv';

export function getEnvFile(): dotenv.DotenvParseOutput | undefined {
  const ENV = '.env';
  const ENV_PATH_LOCAL = '.env.local';
  const ENV_PATH_MAIN = '.env.main';
  const ENV_PATH_TEST = '.env.test';

  const getEnvFileFromPath = (ENV_PATH: string) => {
    let env_config_file: dotenv.DotenvParseOutput | undefined;
    env_config_file = dotenv.config({
      path: path.resolve(
        __dirname,
        '../../../',
        ENV_PATH
      )
    }).parsed;
    return env_config_file;
  };

  const getEnvFileFromEnvironment = () => {
    let env_config_file: dotenv.DotenvParseOutput | undefined;
    const env = getEnvFileFromPath(ENV);
    const env_is_local = env !== undefined && env.ENV.toLowerCase() === 'local';
    const env_is_test = env !== undefined && env.ENV.toLowerCase() === 'test';

    if (env_is_local) {
      env_config_file = getEnvFileFromPath(ENV_PATH_LOCAL);
      return {
        ...env,
        ...env_config_file
      };
    }

    if (env_is_test) {
      env_config_file = getEnvFileFromPath(ENV_PATH_TEST);
      return {
        ...env,
        ...env_config_file
      };
    }

    env_config_file = getEnvFileFromPath(ENV_PATH_MAIN);
    return {
      ...env,
      ...env_config_file
    };
  };

  return getEnvFileFromEnvironment();
}

export function generateFingerprint(
  ip: string,
  user_agent: string,
  language: string,
  site_id: string,
  secret: string
): string {

  const componentes = [
    ip,
    user_agent,
    language,
    site_id,
    secret
  ];

  const seed = componentes
    .filter(Boolean)
    .map(item => String(item).trim().toLocaleLowerCase())
    .join('|');

  return createHash('sha256')
    .update(seed)
    .digest('hex');
}