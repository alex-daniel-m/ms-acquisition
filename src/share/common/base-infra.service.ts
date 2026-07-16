import { Injectable } from "@nestjs/common";
import { StateService } from "./state.service";

@Injectable()
export abstract class BaseInfraService {
  constructor(
    protected readonly state_service: StateService
  ) { }
}