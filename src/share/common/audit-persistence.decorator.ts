import { Logger } from "@nestjs/common";
import { InfraestructureInstanceType, InterceptorType } from "../types/types";

export function AuditPersistence(
  adapter_type: string
): InterceptorType {

  // colors for logging
  const logger: Logger = new Logger('InfraLayerLogger');
  const YELLOW = '\x1b[33m';
  const GREEN = '\x1b[32m';
  const RESET = '\x1b[0m';

  return function (
    target: Object,
    property_key: string,
    descriptor: PropertyDescriptor
  ): void {

    // get original method
    const original_method = descriptor.value;

    // overwrite method
    descriptor.value = async function (
      this: InfraestructureInstanceType,
      ...args: unknown[]
    ): Promise<any> {

      // -------------------------
      // before
      // -------------------------

      const state_service = (this as any).state_service;
      const x_correlation_id = state_service.getXCorrelationId();
      const class_name = target.constructor.name;
      const method_name = String(property_key);
      const start = Date.now();

      try {

        // -------------------------
        // execute original method
        // -------------------------

        const result: Promise<any> = await original_method.apply(this, args);
        const duration = Date.now() - start;

        // -------------------------
        // after success
        // -------------------------
        logger.log(`${x_correlation_id} ${YELLOW}[${adapter_type}]${RESET}  ${GREEN}${class_name}.${method_name}${RESET} ${YELLOW}+${duration}ms${RESET}`);
        return result;

      }
      catch (error) {

        // -------------------------
        // after error
        // -------------------------
        const duration = Date.now() - start;
        logger.error(`${x_correlation_id} ${YELLOW}[${adapter_type}]${RESET} ${GREEN}${class_name}.${method_name}${RESET}  ${YELLOW}+${duration}ms${RESET}`);
        throw error;
      }
    }
  }
}