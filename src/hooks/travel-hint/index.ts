import type { TravelHintDto } from "@/dto/travel-hint.dto";
import { API_ENDPOINTS } from "@/services/api-route";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";

const fetchTravelHints = async (type?: string): Promise<TravelHintDto[]> => {
  const response = await apiService.post(
    API_ENDPOINTS.TRAVEL_HINT.GET_TRAVEL_HINT_BY_TYPE,
    {
      type,
    },
  );
  return response.data || [];
};

export const useGetTravelHints = (type?: string) => {
  return useQuery({
    queryKey: ["travelHints", type],
    queryFn: () => fetchTravelHints(type),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
