import { Injectable } from "@nestjs/common";
import { als } from "./als.context";
import { ConfigurationService } from "./configuration.service";
import { SiteConfigType } from "../types/types";
import { LeadSourceType } from "@domain/types/lead-source.type";
import { LeadStatusType } from "@domain/types/lead-status.type";

@Injectable()
export class StateService {

  private authorized_sites: Map<string, SiteConfigType>;

  constructor(
    private readonly configuration_service: ConfigurationService
  ) {
    if (this.configuration_service.getEnv() === 'main') {
      this.authorized_sites = new Map([
        [
          '24a7bc15ffe0ef871f05c2c8f82638ff959533c5ca40d8866306650ab10e09ce',
          { domain: 'avengers.innosk.com', is_active: true }
        ],
        [
          'c947ed996436dbe0a300480daa33e9c5f158f77fdea3a12c8e941326f53e3522',
          { domain: 'cold-chain-monitoring.innosk.com', is_active: true }
        ],
        [
          'd9b46d31635ceb674cef80f11d7bba3f4bd94091208786702eb9a4145a5b72fa',
          { domain: 'cartagena-boat-rental.innosk.com', is_active: true }
        ]
      ]);
    }
    else {
      this.authorized_sites = new Map([
        [
          '49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763',
          { domain: 'localhost', is_active: true }
        ],
        [
          '5aeecffcffb8b84b606cf3ebd97cdcd77504fb52bcbc5219964f49a8d768ba87',
          { domain: 'api.dev-innosk', is_active: true }
        ]
      ]);
    }
  }

  // ----- Middleware Internal

  getXCorrelationId(): string {
    const store = als.getStore();
    return store?.x_correlation_id || 'no-id';
  }

  getStartTime(): number {
    const store = als.getStore();
    return store?.start_time || Date.now();
  }

  // ----- Middleware Web Browser

  getUserAgent(): string {
    const store = als.getStore();
    return store?.user_agent ?? '';
  }

  getHost(): string {
    const store = als.getStore();
    return store?.host ?? '';
  }

  getLanguage(): string {
    const store = als.getStore();
    return store?.language ?? '';
  }

  getReferrer(): string {
    const store = als.getStore();
    return store?.referrer ?? ''
  }

  // ----- NGINX

  getIp(): string {
    const store = als.getStore();
    return store?.ip ?? '0.0.0.0';
  }

  getProtocol(): string {
    const store = als.getStore();
    return store?.protocol ?? '';
  }

  getXOriginalHost(): string {
    const store = als.getStore();
    return store?.x_original_host ?? '';
  }

  getMethod(): string {
    const store = als.getStore();
    return store?.method ?? 'UNKNOWN';
  }

  // ----- Lead

  getLeadSource(): LeadSourceType {
    const store = als.getStore();
    return store?.lead_source ?? 'UNKNOWN';
  }

  getLeadStatus(): LeadStatusType {
    const store = als.getStore();
    return store?.lead_status ?? 'UNKNOWN';
  }

  // ----- General State

  getSiteConfig(
    site_id: string
  ): SiteConfigType | undefined {
    return this.authorized_sites.get(site_id);
  }


}