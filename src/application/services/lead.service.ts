import { Inject, Injectable } from "@nestjs/common";
import { ILeadRepository } from "@domain/ports/lead.repository";
import { ConfigurationService } from "@share/common/configuration.service";
import { StateService } from "@share/common/state.service";
import { LResponseDto } from "../dtos/lead-response.dto";
import { LRequestDto } from "../dtos/lead-request.dto";
import { generateFingerprint } from "@share/tools/tools";
import { Tracking } from "@domain/models/tracking.model";
import { Context } from "@domain/models/context.model";
import { NicheData } from "@domain/models/niche-data.model";
import { LeadType } from "@domain/types/lead.type";
import { LeadSourceType } from "@domain/types/lead-source.type";
import { Lead } from "@domain/models/lead.model";
import { LeadStatusType } from "@domain/types/lead-status.type";
import { als } from "@share/common/als.context";
import { TrackingType } from "@domain/types/tracking.type";

@Injectable()
export class LeadService {

  constructor(
    private readonly configuration_service: ConfigurationService,
    private readonly state_service: StateService,
    @Inject(ILeadRepository) private readonly lead_repository: ILeadRepository
  ) { }

  async save(
    body: LRequestDto
  ): Promise<LResponseDto> {

    // ------ Data
    const x_correlation_id = this.state_service.getXCorrelationId();
    const type = this.getTypeOfLead(body.vsi);
    const id = crypto.randomUUID();
    const { vsi: site_id, vssi: session_id, vc: context, vn: niche_data } = body;
    const user_agent = this.state_service.getUserAgent();
    const host = this.state_service.getHost();
    const language = this.state_service.getLanguage();
    const referrer = this.state_service.getReferrer();
    const ip = this.state_service.getIp();
    const protocol = this.state_service.getProtocol();
    const x_original_host = this.state_service.getXOriginalHost();
    const method = this.state_service.getMethod();
    const fingerprint = generateFingerprint(
      ip,
      user_agent,
      language,
      site_id,
      this.configuration_service.getEnvAppFingerprintSecret()
    );
    const api_version = this.configuration_service.getEnvAppApiVersion();
    const status = this.getStatusOfLead(site_id);
    const created_at = new Date();

    // ------ Models
    const tracking_model = new Tracking(this.mapUrlToTracking(context.vp) ?? {});
    const context_model = new Context(context);
    const niche_data_model = new NicheData(niche_data ?? {});
    const new_lead_type: LeadType = {
      x_correlation_id,
      type,
      id,
      site_id,
      session_id,
      tracking: tracking_model,
      context: context_model,
      niche_data: niche_data_model,
      user_agent,
      host,
      language,
      referrer,
      ip,
      protocol,
      x_original_host,
      method,
      fingerprint,
      api_version,
      status,
      created_at
    };
    const new_lead = new Lead(new_lead_type);
    const lead = await this.lead_repository.save(new_lead);
    const lead_type = lead.getLeadType();

    // ------ Response
    return {
      x_correlation_id: lead_type.x_correlation_id,
      vtp: lead_type.type,
      vi: lead_type.id,
      vav: lead_type.api_version
    }
  }

  private mapUrlToTracking(
    full_url: string
  ): TrackingType {
    try {
      const parsed_url = new URL(full_url);
      const params = parsed_url.searchParams;

      return {
        utm_source: params.get('utm_source') || 'direct',
        utm_medium: params.get('utm_medium') || 'none',
        utm_campaign: params.get('utm_campaign') || 'organic',
        gclid: params.get('gclid') || '',
        fbclid: params.get('fbclid') || '',
        host: parsed_url.hostname,
        path: parsed_url.pathname
      }
    }
    catch (err) {
      return {
        utm_source: 'error',
        utm_medium: 'invalid_url',
        utm_campaign: 'none',
        gclid: '',
        fbclid: '',
        host: 'unknown',
        path: '/'
      }
    }
  }

  private getTypeOfLead(
    site_id: string
  ): LeadSourceType {
    const store = als.getStore();
    const site = this.state_service.getSiteConfig(site_id);
    if (store && site) {
      if (site.domain === 'avengers.innosk.com') {
        store.lead_source = 'API';
      }
    }
    return this.state_service.getLeadSource();
  }

  private getStatusOfLead(
    site_id: string
  ): LeadStatusType {
    const store = als.getStore();
    const site = this.state_service.getSiteConfig(site_id);
    if (store && site) {
      if (site.domain === 'avengers.innosk.com') {
        store.lead_status = 'API';
      }
    }
    return this.state_service.getLeadStatus();
  }
}