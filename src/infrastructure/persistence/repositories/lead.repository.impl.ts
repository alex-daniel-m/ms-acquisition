import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Lead } from "@domain/models/lead.model";
import { ILeadRepository } from "@domain/ports/lead.repository";
import { AuditPersistence } from "@share/common/audit-persistence.decorator";
import { BaseInfraService } from "@share/common/base-infra.service";
import { StateService } from "@share/common/state.service";
import { LeadEntity } from "../entities/lead.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class LeadRepositoryImpl extends BaseInfraService implements ILeadRepository {

  // constructor
  constructor(
    state_service: StateService,
    @InjectRepository(LeadEntity) private readonly repository: Repository<LeadEntity>
  ) {
    super(state_service);
  }

  @AuditPersistence('DB')
  async save(
    lead: Lead
  ): Promise<Lead> {

    // new Entity
    const lead_type = { ...lead.getLeadType() };
    const entity_lead = new LeadEntity();

    // mapper Entity
    entity_lead.x_correlation_id = lead_type.x_correlation_id;
    entity_lead.type = lead_type.type;
    entity_lead.id = lead_type.id;
    entity_lead.site_id = lead_type.site_id;
    entity_lead.session_id = lead_type.session_id;
    entity_lead.tracking = lead_type.tracking?.getTrackingType() ?? {};
    entity_lead.context = lead_type.context.getContextDto();
    entity_lead.niche_data = lead_type.niche_data?.getNicheDataType() ?? {};
    entity_lead.user_agent = lead_type.user_agent;
    entity_lead.host = lead_type.host;
    entity_lead.language = lead_type.language;
    entity_lead.referrer = lead_type.referrer;
    entity_lead.ip = lead_type.ip;
    entity_lead.protocol = lead_type.protocol;
    entity_lead.x_original_host = lead_type.x_original_host;
    entity_lead.method = lead_type.method;
    entity_lead.fingerprint = lead_type.fingerprint;
    entity_lead.api_version = lead_type.api_version;
    entity_lead.status = lead_type.status;
    entity_lead.created_at = lead_type.created_at;

    // save Entity
    try {
      await this.repository.save(entity_lead);
    }
    catch (err) {
      throw new InternalServerErrorException(String(err));
    }

    // new lead
    return lead;
  }
}