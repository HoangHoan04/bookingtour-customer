import type { PageResponse, PaginationDto } from "@/dto/base.dto";
import type { NewDto, NewFilterDto } from "@/dto/new.dto";
import { API_ENDPOINTS } from "@/services/api-route";
import rootApiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";

export const usePaginationNew = (params: PaginationDto<NewFilterDto>) => {
  const { data, isLoading, refetch, error } = useQuery<PageResponse<NewDto>>({
    queryKey: [API_ENDPOINTS.NEWS.PAGINATION, params],
    queryFn: () => rootApiService.post(API_ENDPOINTS.NEWS.PAGINATION, params),
  });

  return {
    data: data?.data || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};

export const useNewDetail = (id: string | undefined | null) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [API_ENDPOINTS.NEWS.DETAIL, id],
    queryFn: async () => {
      const res = await rootApiService.post(API_ENDPOINTS.NEWS.DETAIL, {
        id,
      });
      return res;
    },
    enabled: !!id,
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
    error,
  };
};

export const useFeaturedNews = (limit: number = 5) => {
  const { data, isLoading, refetch, error } = useQuery<PageResponse<NewDto>>({
    queryKey: [API_ENDPOINTS.NEWS.FEATURED, limit],
    queryFn: async () =>
      rootApiService.post(API_ENDPOINTS.NEWS.FEATURED, {
        take: limit,
      }),
  });

  return {
    data: data?.data || [],
    isLoading,
    refetch,
    error,
  };
};

export const useRelatedNews = (
  id: string | undefined | null,
  limit: number = 4,
) => {
  const { data, isLoading, refetch, error } = useQuery<PageResponse<NewDto>>({
    queryKey: [API_ENDPOINTS.NEWS.RELATED, id, limit],
    queryFn: async () =>
      rootApiService.post(API_ENDPOINTS.NEWS.RELATED, {
        id,
        limit,
      }),
    enabled: !!id,
  });

  return {
    data: data?.data || [],
    isLoading,
    refetch,
    error,
  };
};

export const useLatestNews = () => {
  const { data, isLoading, refetch, error } = useQuery<PageResponse<NewDto>>({
    queryKey: [API_ENDPOINTS.NEWS.LATEST],
    queryFn: async () => await rootApiService.post(API_ENDPOINTS.NEWS.LATEST),
  });

  return {
    data: data?.data || [],
    isLoading,
    refetch,
    error,
  };
};

export const useNewsByType = (
  type: string,
  params: PaginationDto<NewFilterDto>,
) => {
  const { data, isLoading, refetch, error } = useQuery<PageResponse<NewDto>>({
    queryKey: [API_ENDPOINTS.NEWS.FIND_BY_TYPE, type, params],
    queryFn: () =>
      rootApiService.post(API_ENDPOINTS.NEWS.FIND_BY_TYPE, {
        type,
        ...params,
      }),
    enabled: !!type,
  });

  return {
    data: data?.data || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};

export const useSearchNews = (
  keyword: string,
  params: PaginationDto<NewFilterDto>,
) => {
  const { data, isLoading, refetch, error } = useQuery<PageResponse<NewDto>>({
    queryKey: [API_ENDPOINTS.NEWS.SEARCH, keyword, params],
    queryFn: () =>
      rootApiService.post(API_ENDPOINTS.NEWS.SEARCH, {
        keyword,
        ...params,
      }),
    enabled: !!keyword && keyword.length > 0,
  });

  return {
    data: data?.data || [],
    total: data?.total || 0,
    keyword: keyword,
    isLoading,
    refetch,
    error,
  };
};

export const useCountNewsByType = () => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [API_ENDPOINTS.NEWS.COUNT_BY_TYPE],
    queryFn: async () => {
      const res = await rootApiService.post(
        API_ENDPOINTS.NEWS.COUNT_BY_TYPE,
        {},
      );
      return res;
    },
  });

  return {
    data: data?.data || {},
    isLoading,
    refetch,
    error,
  };
};
