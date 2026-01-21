import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../api-route";
import apiService from "../../api.service";

interface SubscribeNewsletterResponse {
  success: boolean;
  message: string;
}

const subscribeNewsletter = async (
  email: string,
): Promise<SubscribeNewsletterResponse> => {
  const response = await apiService.post<SubscribeNewsletterResponse>(
    API_ENDPOINTS.NEWSLETTER.SUBSCRIBE,
    { email },
  );
  return response.data;
};

export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: subscribeNewsletter,
  });
};
