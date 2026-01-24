import type { BaseDto, FileDto } from "./base.dto";

export interface DestinationDto extends BaseDto {
  code: string;
  name: string;
  slug: string;
  country: string;
  region: string;
  description: string;
  latitude: number;
  longitude: number;
  bestTimeToVisit: string;
  averageTemperature: string;
  popularActivities: string[];
  viewCount: number;
  touringCount: number;
  rating: number;
  status: string;
  image: FileDto;
}

export interface DestinationFilterDto {
  name?: string;
  country?: string;
  region?: string;
  status?: string;
  isDeleted?: boolean;
}
