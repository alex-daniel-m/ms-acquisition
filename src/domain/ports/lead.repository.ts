import { Lead } from "../models/lead.model"

export const ILeadRepository = Symbol('ILeadRepository')

export interface ILeadRepository {

  save(
    lead: Lead,
  ): Promise<Lead>
}