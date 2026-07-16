import { Logger } from "@nestjs/common";
import { InterceptorType } from "../types/types";
import { StateService } from "./state.service";

export function AuditException(
  adapter_type: string
): InterceptorType {

  // colors for logging
  const logger: Logger = new Logger('ExceptionLogger');
  const YELLOW = '\x1b[33m';
  const RESET = '\x1b[0m';
  const GREEN = '\x1b[32m';

  return function (
    target: Object,
    property_key: string,
    descriptor: PropertyDescriptor
  ): void {

    // get original method
    const original_method = descriptor.value;

    // overwrite method
    descriptor.value = function (
      ...args: unknown[]
    ): any {

      // -------------------------
      // before
      // -------------------------

      const state_service: StateService = this.state_service;
      const x_correlation_id = state_service.getXCorrelationId();
      const class_name = target.constructor.name;
      const method_name = String(property_key);

      // -------------------------
      // execute original method
      // -------------------------

      const result = original_method.apply(this, args);
      const duration = Date.now() - state_service.getStartTime();

      // -------------------------
      // after success
      // -------------------------

      logger.error(`${x_correlation_id} ${YELLOW}[${adapter_type}]${RESET} ${GREEN}${class_name}.${method_name}${RESET} ${YELLOW}+${duration}ms${GREEN}${RESET}`);
      return result;
    }
  }
}