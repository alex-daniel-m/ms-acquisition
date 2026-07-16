import { TrackingType } from "../types/tracking.type";

export class Tracking {

  /**
   * variables
   */
  private tracking_type: TrackingType;

  /**
   * constructor
   */
  constructor(
    tracking_type: TrackingType
  ) {
    this.tracking_type = { ...tracking_type };
  }

  /**
   * getter
   */
  getTrackingType(): TrackingType {
    return this.tracking_type;
  }

  /**
   * setter
   */
  setTrackingType(
    tracking_dto: TrackingType
  ): void {
    this.tracking_type = { ...tracking_dto };
  }

  /**
   * get field
   * 
   * tracking.getField('utm_source')
   * 
   */
  getField<K extends keyof TrackingType>(key: K): string {
    return this.tracking_type[key] || '';
  }
}