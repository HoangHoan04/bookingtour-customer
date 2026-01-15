// Enums
export type NotificationType =
  | "system"
  | "booking"
  | "payment"
  | "promotion"
  | "general";
export type NotificationPriority = "low" | "normal" | "high" | "urgent";
export type RelatedEntityType = "booking" | "payment" | "tour" | "user";

// Interface cho notification item
export interface NotificationItem {
  id: string;
  customerId: string;
  title: string;
  content: string;
  notificationType: NotificationType;
  relatedEntity?: RelatedEntityType | null;
  relatedId?: string | null;
  isRead: boolean;
  readAt?: string | null;
  priority: NotificationPriority;
  actionUrl?: string | null;
  expiresAt?: string | null;
  icon?: string | null;
  color?: string | null;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  customer?: {
    id: string;
    fullName?: string;
    email?: string;
    avatar?: string;
  };
}

// DTO để filter notification
export interface NotificationFilterDto {
  notificationType?: NotificationType;
  priority?: NotificationPriority;
  isRead?: boolean;
  relatedEntity?: RelatedEntityType;
}

// DTO pagination cho notification
export interface NotificationPaginationDto {
  skip?: number;
  take?: number;
  where?: NotificationFilterDto;
}

// DTO để đánh dấu đã đọc
export interface MarkReadListDto {
  lstId: string[];
}

// Response count
export interface NotificationCountResponse {
  countAll: number;
}

// DTO cài đặt notification
export interface NotificationSettingDto {
  id: string;
  customerId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  promotionNotifications: boolean;
  bookingNotifications: boolean;
  recommendationNotifications: boolean;
  createdAt: string;
  updatedAt?: string;
}

// DTO cập nhật cài đặt
export interface UpdateNotificationSettingDto {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  smsNotifications?: boolean;
  promotionNotifications?: boolean;
  bookingNotifications?: boolean;
  recommendationNotifications?: boolean;
}

// Response pagination
export interface NotificationPaginationResponse {
  data: NotificationItem[];
  total: number;
}
