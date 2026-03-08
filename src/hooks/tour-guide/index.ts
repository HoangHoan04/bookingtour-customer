import { PageResponse, type PaginationDto } from "@/dto/base.dto";
import type { TourGuide, TourGuideFilterDto } from "@/dto/tour-guide.dto";
import { API_ENDPOINTS } from "@/services/api-route";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";

export const usePaginationTourGuide = (
  params: PaginationDto<TourGuideFilterDto>,
) => {
  const { data, isLoading, refetch, error } = useQuery<PageResponse<TourGuide>>(
    {
      queryKey: [API_ENDPOINTS.TOUR_GUIDE.PAGINATION, params],
      queryFn: () =>
        apiService.post(API_ENDPOINTS.TOUR_GUIDE.PAGINATION, params),
    },
  );

  return {
    data: data?.data || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};

/**
 * Lấy chi tiết hướng dẫn viên theo slug
 */
export const useTourGuideDetail = (slug: string | undefined | null) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [API_ENDPOINTS.TOUR_GUIDE.FIND_BY_SLUG, slug],
    queryFn: async () => {
      const res = await apiService.post(API_ENDPOINTS.TOUR_GUIDE.FIND_BY_SLUG, {
        slug,
      });
      return res;
    },
    enabled: !!slug,
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
    error,
  };
};
