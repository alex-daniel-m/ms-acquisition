import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorsTypes } from '../types/types';
import * as Constants from '../tools/constants';

@Injectable()
export class ConfigurationService {

  // variables
  private error_codes: Map<number, string>;
  private error_reasons: Map<number, string>;
  private error_messages: Map<number, string>;
  private layer_infraestructure: string;
  private layer_application: string;
  private env: string;
  private env_app_name: string;
  private env_app_timeout: string;
  private env_app_cb_threshold: string;
  private env_app_cb_half_open: string;
  private env_app_cb_sleep: string;
  private env_log_level: string;
  private env_app_fingerprint_secret: string;
  private env_app_api_version: string;

  // constructor
  constructor(
    private readonly config_service: ConfigService,
  ) {

    this.error_codes = new Map(Constants.ERROR_CODES);
    this.error_reasons = new Map(Constants.ERROR_REASONS);
    this.error_messages = new Map(Constants.ERROR_MESSAGES);

    this.layer_infraestructure = Constants.LAYER_INFRAESTRUCTURE;
    this.layer_application = Constants.LAYER_APPLICATION;

    this.env = this.config_service.get<string>('ENV') as string;
    this.env_app_name = this.config_service.get<string>('ENV_APP_NAME') as string;
    this.env_app_timeout = this.config_service.get<string>('ENV_APP_TIMEOUT') as string;
    this.env_app_cb_threshold = this.config_service.get<string>('ENV_APP_CB_THRESHOLD') as string;
    this.env_app_cb_half_open = this.config_service.get<string>('ENV_APP_CB_HALF_OPEN') as string;
    this.env_app_cb_sleep = this.config_service.get<string>('ENV_APP_CB_SLEEP') as string;
    this.env_log_level = this.config_service.get<string>('ENV_LOG_LEVEL') as string;
    this.env_app_fingerprint_secret = this.config_service.get<string>('ENV_APP_FINGERPRINT_SECRET') as string;
    this.env_app_api_version = this.config_service.get<string>('ENV_APP_API_VERSION') as string;
  }

  getErrors(): ErrorsTypes {
    return {
      error_codes: this.error_codes,
      error_reasons: this.error_reasons,
      error_messages: this.error_messages,
    }
  }

  getLayerInfrastructure(): string {
    return this.layer_infraestructure;
  }

  getLayerApplication(): string {
    return this.layer_application;
  }

  getEnv(): string {
    return this.env;
  }

  getEnvAppName(): string {
    return this.env_app_name;
  }

  getEnvAppTimeout(): string {
    return this.env_app_timeout;
  }

  getEnvAppCbThreshold(): string {
    return this.env_app_cb_threshold;
  }

  getEnvAppCbHalfOpen(): string {
    return this.env_app_cb_half_open;
  }

  getEnvAppCbSleep(): string {
    return this.env_app_cb_sleep;
  }

  getEnvLogLevel(): string {
    return this.env_log_level;
  }

  getEnvAppFingerprintSecret(): string {
    return this.env_app_fingerprint_secret;
  }

  getEnvAppApiVersion(): string {
    return this.env_app_api_version;
  }
}