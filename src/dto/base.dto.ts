export interface BasePermissions {
  isCanView: boolean;
  isCanEdit: boolean;
  isCanDeactivate: boolean;
  isCanActivate: boolean;
  isCanCreate: boolean;
  isCanImport: boolean;
  isCanExport: boolean;
}

export interface BaseDto extends BasePermissions {
  id: string;
  createAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
}

export interface PaginationDto<T> {
  skip: number;
  take: number;
  where: T;
}

export interface ActionLogDto extends BaseDto {
  functionId: string;
  functionType: string;
  type: string;
  description: string;
  createdByName?: string;
  employeeCode?: string;
}
