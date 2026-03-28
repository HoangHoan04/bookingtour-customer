import { PageResponse, type PaginationDto } from "@/dto/base.dto";
import type { TourDto, TourFilterDto } from "@/dto/tour.dto";
import { API_ENDPOINTS } from "@/services/api-route";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Lấy danh sách tour đã xuất bản (cho user)
 */
export const usePaginationTour = (params: PaginationDto<TourFilterDto>) => {
  const { data, isLoading, refetch, error } = useQuery<PageResponse<TourDto>>({
    queryKey: [API_ENDPOINTS.TOUR.PAGINATION, params],
    queryFn: async () =>
      (await apiService.post(
        API_ENDPOINTS.TOUR.PAGINATION,
        params,
      )) as unknown as PageResponse<TourDto>,
  });

  return {
    data: data?.data || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};

/**
 * Lấy chi tiết tour theo slug
 */
export const useTourBySlug = (slug: string | undefined | null) => {
  const { data, isLoading, refetch, error } = useQuery<TourDto>({
    queryKey: [API_ENDPOINTS.TOUR.FIND_BY_SLUG, slug],
    queryFn: async () => {
      const res = await apiService.get(
        API_ENDPOINTS.TOUR.FIND_BY_SLUG.replace(":slug", slug || ""),
      );
      return res as unknown as TourDto;
    },
    enabled: !!slug,
  });

  return {
    data: data,
    isLoading,
    refetch,
    error,
  };
};

/**
 * Lấy tour liên quan
 */
// export const useRelatedTours = (id: string | undefined, limit: number = 5) => {
//   const { data, isLoading } = useQuery({
//     queryKey: [API_ENDPOINTS.TOUR.RELATED, id, limit],
//     queryFn: async () => {
//       const res = await apiService.post(API_ENDPOINTS.TOUR.RELATED, {
//         id,
//         limit,
//       });
//       return res;
//     },
//     enabled: !!id,
//   });

//   return {
//     data: data?.data || [],
//     isLoading,
//   };
// };

/**
 * Lấy tour phổ biến
 */
// export const usePopularTours = (limit: number = 10) => {
//   const { data, isLoading } = useQuery({
//     queryKey: [API_ENDPOINTS.TOUR.POPULAR, limit],
//     queryFn: async () => {
//       const res = await apiService.post(API_ENDPOINTS.TOUR.POPULAR, {
//         limit,
//       });
//       return res;
//     },
//   });

//   return {
//     data: data?.data || [],
//     isLoading,
//   };
// };

/**
 * Lấy bài viết mới nhất
 */
export const useLatestBlogs = (limit: number = 10) => {
  const { data, isLoading } = useQuery({
    queryKey: [API_ENDPOINTS.BLOG.LATEST, limit],
    queryFn: async () => {
      const res = await apiService.post(API_ENDPOINTS.BLOG.LATEST, {
        limit,
      });
      return res;
    },
  });

  return {
    data: data?.data || [],
    isLoading,
  };
};
