import type { BaseDto, FileDto } from "./base.dto";

export interface TourGuide extends BaseDto {
  code: string;
  name: string;
  phone: string;
  slug: string;
  email: string;
  address?: string;
  gender?: string;
  birthday: Date;
  nationality?: string;
  identityCard?: string;
  passportNumber?: string;
  shortBio?: string;
  bio?: string;
  languages?: string[];
  specialties?: string[];
  yearsOfExperience?: number;
  licenseNumber?: string;
  licenseIssuedDate?: Date;
  licenseExpiryDate?: Date;
  licenseIssuedBy?: string;
  averageRating?: number;
  totalReviews?: number;
  totalToursCompleted?: number;
  status: string;
  description?: string;
  baseSalary?: number;
  commissionRate?: number;
  startDate?: Date;
  endDate?: Date;
  isAvailable: boolean;
  bankAccountNumber?: string;
  bankName?: string;
  bankAccountName?: string;
  avatar: FileDto[];
}

export interface TourGuideFilterDto {
  code?: string;
}
