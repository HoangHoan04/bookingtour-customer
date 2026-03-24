export interface TourDto {
  id: string;
  code?: string;
  title: string;
  slug: string;
  location: string;
  durations: string;
  shortDescription: string;
  longDescription?: string;
  highlights?: string;
  included?: string;
  excluded?: string;
  rating: number;
  reviewCount: number;
  viewCount: number;
  bookingCount: number;
  category?: string;
  tags?: string[];
  flag: string;
  status: string;
  tourDetails?: any[];
  reviews?: any[];
  __tourDetails__?: TourDetail[];
}

export interface TourDetail {
  id: string;
  tourId?: string;
  tour?: TourDto;
  code: string;
  startDay: string;
  endDay: string;
  startLocation: string;
  capacity: number;
  remainingSeats: number;
  status: string;
  tourPrice?: TourPrice[];
  tourItinerarie?: TourItinerarie[];
  bookingDetails?: any[];
}

export interface TourPrice {
  id: string;
  tourDetailId?: string;
  tourDetail?: TourDetail;
  priceType: string;
  amount: number;
  currency: string;
}

export interface TourItinerarie {
  id: string;
  tourDetailId?: string;
  tourDetail?: TourDetail;
  day: number;
  title: string;
  description: string;
}

export interface TourFilterDto {
  keyword?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  category?: string;
  tags?: string[];
}
