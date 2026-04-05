import { API_ENDPOINTS } from "@/services/api-route";
import apiService from "@/services/api.service";
import { useMutation } from "@tanstack/react-query";

export interface OrderInfo {
  contactFullname: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  totalPrice: number;
  note: string;
  bookingDetails: BookingDetail[];
}

export interface BookingDetail {
  tourId: string | undefined;
  price: number;
  tourDetailId: string | undefined;
  quantity: number;
  tourPriceId: string | undefined;
}

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (orderInfo: OrderInfo) => {
      const response = await apiService.post(
        API_ENDPOINTS.BOOKING.CREATE,
        orderInfo,
      );
      return response;
    },
  });
};
