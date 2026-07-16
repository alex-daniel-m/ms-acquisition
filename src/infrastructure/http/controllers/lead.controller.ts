import { Body, Controller, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { routes } from "../routes/routes";
import { AuditRequest } from "../../../share/common/audit-request.interceptor";
import { LeadService } from "../../../application/services/lead.service";
import { SiteGuard } from "../../../share/common/site.guard";
import { ApiResponse } from "@nestjs/swagger";
import { swagger_desc } from "../swagger/swagger-status-codes";
import { LRequestDto } from "../../../application/dtos/lead-request.dto";
import { LResponseDto } from "../../../application/dtos/lead-response.dto";
import { FResponseDto } from "../../../share/dtos/fault-response.dto";

@Controller(routes.ENV_APP_PATH)
export class LeadController {

  //
  constructor(
    private readonly lead_service: LeadService
  ) { }

  //
  @UseGuards(SiteGuard)
  @UseInterceptors(AuditRequest)
  @Post(routes.ENV_LEAD_RESOURCE)
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  @ApiResponse({
    status: '2XX',
    description: swagger_desc.HTTP_2XX_DEFAULT,
    type: LResponseDto
  })
  @ApiResponse({
    status: '5XX',
    description: swagger_desc.HTTP_5XX_DEFAULT,
    type: FResponseDto
  })
  async lead_save(
    @Body() body: LRequestDto
  ): Promise<LResponseDto> {
    return await this.lead_service.save(body);
  }

  //
  @UseGuards(SiteGuard)
  @UseInterceptors(AuditRequest)
  @Post(routes.ENV_VISITS_RESOURCE)
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  @ApiResponse({
    status: '2XX',
    description: swagger_desc.HTTP_2XX_DEFAULT,
    type: LResponseDto
  })
  @ApiResponse({
    status: '5XX',
    description: swagger_desc.HTTP_5XX_DEFAULT,
    type: FResponseDto
  })
  async visit_save(
    @Body() body: LRequestDto
  ): Promise<LResponseDto> {
    return await this.lead_service.save(body);
  }
}