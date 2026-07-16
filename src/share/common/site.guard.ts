import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { StateService } from "./state.service";

@Injectable()
export class SiteGuard implements CanActivate {

  constructor(
    private readonly state_service: StateService
  ) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const { vsi } = request.body;
    const site = this.state_service.getSiteConfig(vsi);

    if (!site) {
      // ${site_id} not found in dictionary
      throw new ForbiddenException('Site Id not Found');
    }

    if (!site.is_active) {
      // ${site_id} is disabled
      throw new ForbiddenException('Site Id is disabled');
    }

    // domain validation
    const domain = this.state_service.getXOriginalHost();
    if (!domain.includes(site.domain)) {
      // domain mismatch. Origin: ${origin} & Expected: ${site.domain}
      throw new ForbiddenException('Domain mismatch');
    }

    return true;
  }

}