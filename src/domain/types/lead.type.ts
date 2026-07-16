import { Context } from "../models/context.model";
import { NicheData } from "../models/niche-data.model";
import { Tracking } from "../models/tracking.model";
import { LeadSourceType } from "./lead-source.type";
import { LeadStatusType } from "./lead-status.type";

export type LeadType = {
  x_correlation_id: string; // column -> internal
  type: LeadSourceType; // column -> internal (visit | lead | api)
  id: string; // column -> internal
  site_id: string; // column -> body
  session_id: string; // column -> body
  tracking?: Tracking; // column JSONB -> body
  context: Context; // column JSONB -> body
  niche_data?: NicheData; // column JSONB -> body
  user_agent: string; // column -> headers['user-agent']
  host: string; // column -> headers['host']
  language: string; // column -> headers['accept-language']
  referrer: string; // column -> headers['referer']
  ip: string; // column -> headers['x-forwarded-for']
  protocol: string; // column -> headers['x-forwarded-proto']
  x_original_host: string; // column -> headers['x-original-host']
  method: string; // column -> req.method
  fingerprint: string; // column -> internal
  api_version: string; // column -> internal
  status: LeadStatusType; // column -> internal
  created_at: Date; // columns -> internal
}