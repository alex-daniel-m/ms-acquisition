import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { StateService } from "./state.service";
import { als } from "./als.context";

@Injectable()
export class AuditRequest implements NestInterceptor {

  private readonly logger = new Logger('ControllerLogger');

  constructor(
    private readonly state_service: StateService,
  ) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {

    /**
     * 
     * before
     * 
     */

    // colors for logging
    const YELLOW = '\x1b[33m';
    const GREEN = '\x1b[32m';
    const RESET = '\x1b[0m';

    // common
    const class_name: string = context.getClass().name;
    const method_name: string = context.getHandler().name;
    const x_correlation_id = this.state_service.getXCorrelationId();
    const http_method = this.state_service.getMethod();

    //
    const store = als.getStore();
    if (store) {
      if (method_name === 'lead_save') {
        store.lead_source = 'LEAD';
        store.lead_status = 'PENDING';
      }

      if (method_name === 'visit_save') {
        store.lead_source = 'VISIT';
        store.lead_status = 'VISIT';
      }
    }

    return next
      .handle()
      .pipe(
        tap(
          () => {

            /**
             * 
             * after
             * 
             */
            const duration = Date.now() - this.state_service.getStartTime();
            this.logger.log(`${x_correlation_id} ${YELLOW}[${http_method}]${GREEN} ${class_name}.${method_name} ${YELLOW}+${duration}ms${RESET}`);
          }
        )
      );
  }

}