import type { BaseDto } from "./base.dto";

export interface TourGuide extends BaseDto {
  code: string;
  name: string;
}

export interface TourGuideFilterDto {
  code?: string;
}
