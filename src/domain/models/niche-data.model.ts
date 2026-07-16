import { NicheDataType } from '../types/niche-data.type';

export class NicheData {
  /**
   * variables
   */
  private niche_data_type: NicheDataType;

  /**
   * constructor
   */
  constructor(niche_data_type: NicheDataType) {
    this.niche_data_type = { ...niche_data_type };
  }

  /**
   * getter
   */
  getNicheDataType(): NicheDataType {
    return this.niche_data_type;
  }

  /**
   * setter
   */
  setNicheDataType(niche_data_config: NicheDataType): void {
    this.niche_data_type = { ...niche_data_config };
  }

  /**
   * get field
   */
  getField<T = any>(key: string): T | undefined {
    return this.niche_data_type && key in this.niche_data_type
      ? this.niche_data_type[key]
      : undefined;
  }
}
