import { Injectable, NestMiddleware } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { als } from "./als.context";

@Injectable()
export class MiddlewareService implements NestMiddleware {

  use(
    req: FastifyRequest['raw'],
    res: FastifyReply['raw'],
    next: () => void
  ): void {

    // ----- Internal

    const x_correlation_id_raw = req.headers['x-correlation-id'];
    const x_correlation_id: string = Array.isArray(x_correlation_id_raw)
      ? x_correlation_id_raw[0]
      : (x_correlation_id_raw || crypto.randomUUID());
    const start_time = Date.now();

    // ----- Web Browser

    const user_agent = req.headers['user-agent'] ?? '';
    const host = req.headers['host'] ?? '';
    const language = req.headers['accept-language']?.split(',')[0].trim() ?? '';
    const referrer_raw = req.headers['referer'] ?? req.headers['referrer'] ?? '';
    const referrer = Array.isArray(referrer_raw) ? referrer_raw[0] : referrer_raw;

    // ----- NGINX

    const ip_raw = req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '';
    const ip = Array.isArray(ip_raw)
      ? ip_raw[0].split(',')[0].trim()
      : ip_raw
        ? ip_raw.split(',')[0].trim()
        : '0.0.0.0';
    const protocol_raw = req.headers['x-forwarded-proto'] ?? '';
    const protocol = Array.isArray(protocol_raw) ? protocol_raw[0] : protocol_raw;
    const origin_raw = req.headers['x-original-host'] ?? req.headers['origin'] ?? '';
    const x_original_host = Array.isArray(origin_raw)
      ? origin_raw[0].trim()
      : origin_raw.split(',')[0].trim();
    const method = (req.method ?? 'UNKNOWN').toUpperCase();

    als.run(
      {
        x_correlation_id,
        start_time,
        user_agent,
        host,
        language,
        referrer,
        ip,
        protocol,
        x_original_host,
        method,
        lead_source: 'UNKNOWN',
        lead_status: 'UNKNOWN'
      },
      () => {
        res.setHeader('X-Correlation-Id', x_correlation_id);
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        next();
      }
    )
  }
}