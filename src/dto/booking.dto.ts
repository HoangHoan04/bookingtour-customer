export interface BookingDto {
  id: string;
  code: string;
  contactFullname: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  note?: string;
  totalPrice?: number;
  discountAmount: number;
  finalPrice?: number;
  voucherCode?: string;
  cancelReason?: string;
  expiredAt?: Date;
  confirmedAt?: Date;
  completedAt?: Date;
  status: string;
}

export interface BookingDetail {
  id: string;
  price: number;
  bookingId: string;
  booking?: BookingDto;
  tourId: string;
  quantity: number;
  subtotal: number;
  status: string;
  tourDetailId: string;
  tourDetail?: any;
  tourPriceId?: string;
  tourPrice?: any;
}
