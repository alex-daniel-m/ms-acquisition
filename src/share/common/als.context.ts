import { AsyncLocalStorage } from "async_hooks";
import { LeadSourceType } from "../../domain/types/lead-source.type";
import { LeadStatusType } from "../../domain/types/lead-status.type";

export interface RequestStore {
  // ----- Internal
  x_correlation_id: string;
  start_time: number;
  // ----- Web Browser
  user_agent: string; // user-agent
  host: string; // host
  language: string; // accept-language
  referrer: string; // referrer
  // ----- NGINX
  ip: string; // x-forwarded-for
  protocol: string; // x-forwarded-proto
  x_original_host: string;
  method: string;
  // ----- Lead
  lead_source: LeadSourceType;
  lead_status: LeadStatusType;
}

export const als = new AsyncLocalStorage<RequestStore>();