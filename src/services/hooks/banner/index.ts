import { API_ENDPOINTS } from "@/services/api-route";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";

export interface Banner {
  id: string;
  title: string;
  titleEn: string;
  displayOrder: number;
  isVisible: boolean;
  status: string;
  type: string;
  url?: string;
  image: {
    fileName: string;
    fileUrl: string;
  }[];
}

const fetchBanners = async (type?: string): Promise<Banner[]> => {
  const { data } = await apiService.post(API_ENDPOINTS.BANNER.GET_BY_TYPE, {
    type,
  });
  return data.data || [];
};

export const useBanners = (type?: string) => {
  return useQuery({
    queryKey: ["banners", type],
    queryFn: () => fetchBanners(type),
    staleTime: 5 * 60 * 1000, // 5 phút
    refetchOnWindowFocus: false,
  });
};
