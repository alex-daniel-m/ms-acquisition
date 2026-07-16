/**
 * 
 * @description
 * 
 * Descripciones de los códigos HTTP para documentación
 * Swagger
 * 
 */

type SwaggerDescriptionsType = {
  HTTP_2XX_DEFAULT: string;
  HTTP_4XX_DEFAULT: string;
  HTTP_5XX_DEFAULT: string;
  HTTP_201: string;
  HTTP_400: string;
  HTTP_401: string;
  HTTP_403: string;
  HTTP_404: string;
  HTTP_415: string;
  HTTP_429: string;
  HTTP_500: string;
  HTTP_502: string;
  HTTP_503: string;
  HTTP_504: string;
};

export const swagger_desc: SwaggerDescriptionsType = {
  HTTP_2XX_DEFAULT: 'Success Response Object',
  HTTP_4XX_DEFAULT: 'Business Error Response Object',
  HTTP_5XX_DEFAULT: 'Technical Error Response Object',
  HTTP_201: 'Created Lead',
  HTTP_400: 'Invalid request format',
  HTTP_401: 'Authentication failed',
  HTTP_403: 'Access denied',
  HTTP_404: 'No matching API endpoint',
  HTTP_415: 'Unsupported content type',
  HTTP_429: 'Too many requests',
  HTTP_500: 'Unexpected technical error',
  HTTP_502: 'External service error',
  HTTP_503: 'Service temporarily unavailable',
  HTTP_504: 'Timeout while processing request',
}