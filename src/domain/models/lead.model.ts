import { LeadType } from "../types/lead.type";

export class Lead {

  // ------ Variables

  private lead_type: LeadType;

  // ------ Contructor

  constructor(
    lead_type: LeadType
  ) {
    this.lead_type = { ...lead_type };
  }

  // ------ Getters & Setters

  getLeadType(): LeadType {
    return this.lead_type;
  }

  setLeadType(
    lead_type: LeadType
  ): void {
    this.lead_type = { ...lead_type };
  }
}