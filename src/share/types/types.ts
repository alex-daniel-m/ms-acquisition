import { BaseInfraService } from "../common/base-infra.service";
import { StateService } from "../common/state.service";

/**
 * 
 */
export type InterceptorType = (
  target: Object,
  property_key: string,
  descriptor: PropertyDescriptor
) => void;

/**
 * 
 */
export type InfraestructureInstanceType =
  BaseInfraService &
  { state_service: StateService; }


/**
 * 
 */
export type ErrorsTypes = {
  error_codes: Map<number, string>,
  error_reasons: Map<number, string>,
  error_messages: Map<number, string>,
};

/**
 * 
 */
export type SiteConfigType = {
  domain: string;
  is_active: boolean;
}

/**
 * 
 */
export type FaultNestType = {
  statusCode: number;
  error: string;
  message: string | string[];
  layer: string;
  code?: string;
}