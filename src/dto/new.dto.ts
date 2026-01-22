import type { BaseDto, FileDto } from "./base.dto";

export interface NewDto extends BaseDto {
  code: string;
  titleVI: string;
  titleEN: string;
  contentVI: string;
  contentEN: string;
  url: string;
  type: string;
  effectiveStartDate: Date;
  effectiveEndDate: Date;
  status: string;
  rank?: number;
  isVisible: boolean;
  images?: FileDto[];
  __images__?: FileDto[];
}

export interface NewFilterDto {
  code?: string;
  title?: string;
  types?: string;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
  status?: string;
  isDeleted?: boolean;
  isPost?: boolean;
}
