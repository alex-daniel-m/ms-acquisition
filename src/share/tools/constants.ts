/**
 * 
 *  Layers
 * 
 */

export const LAYER_INFRAESTRUCTURE: string = 'Infraestructure';
export const LAYER_APPLICATION: string = 'Application';

/**
 * 
 *  Inbound Errors
 * 
 */

export const ERROR_CODES: [number, string][] = [
  [400, 'REQUEST_MALFORMED'],
  [401, 'UNAUTHORIZED'],
  [403, 'FORBIDDEN'],
  [404, 'ENDPOINT_NOT_FOUND'],
  [409, 'CONFLICT'],
  [412, 'PRECONDITION_FAILED'],
  [415, 'UNSUPPORTED_MEDIA_TYPE'],
  [422, 'BUSINESS_RULE_VIOLATION'],
  [429, 'RATE_LIMIT_EXCEEDED'],
  [500, 'TECHNICAL_ERROR'],
  [502, 'TECHNICAL_ERROR'],
  [503, 'SERVICE_UNAVAILABLE'],
  [504, 'GATEWAY_TIMEOUT'],
];

export const ERROR_REASONS: [number, string][] = [
  [400, 'Invalid request format'],
  [401, 'Authentication failed'],
  [403, 'Access denied'],
  [404, 'No matching API endpoint'],
  [409, 'Resource state conflict'],
  [412, 'Precondition for the requested operation failed'],
  [415, 'Unsupported content type'],
  [422, 'Business validation failed'],
  [429, 'Too many requests'],
  [500, 'Unexpected technical error'],
  [502, 'External service error'],
  [503, 'Service temporarily unavailable'],
  [504, 'Timeout while processing request'],
];

export const ERROR_MESSAGES: [number, string][] = [
  [400, 'The request payload is not a valid JSON or does not follow the expected structure'],
  [401, 'Authentication credentials are missing or invalid'],
  [403, 'You do not have permission to access this resource'],
  [404, 'The requested API endpoint does not exist'],
  [409, 'Resource state conflict'],
  [412, 'Precondition for the requested operation failed'],
  [415, 'The request Content-Type is not supported'],
  [422, 'Business validation failed'],
  [429, 'The allowed request rate has been exceeded'],
  [500, 'An unexpected technical error occurred while processing the request'],
  [502, 'An error occurred while communicating with an external system'],
  [503, 'The service is currently unavailable. Please try again later'],
  [504, 'The request could not be completed due to a timeout'],
];

