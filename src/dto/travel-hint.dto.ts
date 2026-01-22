import type { BaseDto, FileDto } from "./base.dto";

export interface TravelHintDto extends BaseDto {
  month: number;
  locationName: string;
  description: string;
  reason: string;
  type: string;
  tags: string[];
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  images: FileDto[];
}
