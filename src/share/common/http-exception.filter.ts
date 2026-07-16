import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { FResponseDto } from "../dtos/fault-response.dto";
import { FaultNestType } from "../types/types";
import { ConfigurationService } from "./configuration.service";
import { FastifyReply, FastifyRequest } from 'fastify';
import { StateService } from "./state.service";
import { AuditException } from "./audit-exception.decorator";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  // constructor
  constructor(
    private readonly configuration_service: ConfigurationService,
    private readonly state_service: StateService
  ) { }


  // catch
  catch(
    exception: HttpException,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    const catch_fault: string | object = exception.getResponse();
    console.log(JSON.stringify(catch_fault));
    const fault_response_dto = this.catchException(
      status,
      catch_fault
    );

    response
      .status(status)
      .send(fault_response_dto);
  }

  @AuditException('FAULT')
  private catchException(
    status: number,
    catch_fault: string | object
  ): FResponseDto {

    let fault_response_dto: FResponseDto;
    let fault_nest_type: FaultNestType;

    if (typeof catch_fault === 'object') {

      fault_nest_type = catch_fault as FaultNestType;

      fault_response_dto = {
        x_correlation_id: this.state_service.getXCorrelationId(),
        code: this.configuration_service.getErrors().error_codes.get(status) as string,
        reason: this.configuration_service.getErrors().error_reasons.get(status) as string,
        status: status.toString(),
        message: this.configuration_service.getErrors().error_messages.get(status) as string,
      };
      return fault_response_dto;
    }
    else {
      return {
        x_correlation_id: 'x',
        code: 'code',
        message: 'message',
        status: '500',
        reason: 'rease'
      }
    }
  }
}