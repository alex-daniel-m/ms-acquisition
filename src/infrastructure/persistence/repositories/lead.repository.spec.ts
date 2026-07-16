import { Injectable } from "@nestjs/common";
import { Lead } from "@domain/models/lead.model";
import { ILeadRepository } from "@domain/ports/lead.repository";
import { AuditPersistence } from "@share/common/audit-persistence.decorator";
import { BaseInfraService } from "@share/common/base-infra.service";
import { StateService } from "@share/common/state.service";

@Injectable()
export class LeadRepositorySpec extends BaseInfraService implements ILeadRepository {

  // variables
  private leads: Lead[];

  // constructor
  constructor(
    state_service: StateService,
  ) {
    super(state_service);
    this.leads = [];
  }

  @AuditPersistence('DB')
  async save(
    lead: Lead
  ): Promise<Lead> {

    const lead_type = { ...lead.getLeadType() };
    const new_lead = new Lead(lead_type);
    console.log(JSON.stringify(lead_type));
    return new_lead;
  }
}