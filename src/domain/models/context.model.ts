import { VcDto } from "../../application/dtos/context.dto";

export class Context {

  /**
   * variables
   */
  private context_dto: VcDto;

  /**
   * constructor
   */
  constructor(
    context_dto: VcDto
  ) {
    this.context_dto = { ...(context_dto || {}) } as VcDto;
  }

  /**
   * getter
   */
  public getContextDto(): VcDto {
    return this.context_dto;
  }

  /**
   * setter
   */
  public setContextDto(
    context_config: VcDto
  ): void {
    this.context_dto = { ...context_config };
  }

  /**
   * get field
   * 
   * tracking.getField('first_referrer')
   * 
   */
  getField<K extends keyof VcDto>(key: K): string {
    return this.context_dto[key] || '';
  }
}