import type {
  PageResponse,
  PaginationDto,
  SuccessResponse,
} from "@/dto/base.dto";
import type {
  DestinationDto,
  DestinationFilterDto,
} from "@/dto/destination.dto";

import { API_ENDPOINTS } from "@/services/api-route";
import apiService from "@/services/api.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePaginationDestination = (
  params: PaginationDto<DestinationFilterDto>,
) => {
  const { data, isLoading, refetch, error } = useQuery<
    PageResponse<DestinationDto>
  >({
    queryKey: [API_ENDPOINTS.DESTINATION.PAGINATION, params],
    queryFn: () =>
      apiService.post(API_ENDPOINTS.DESTINATION.PAGINATION, params),
  });

  return {
    data: data?.data || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};

export const useDestinationBySlug = (slug: string | undefined | null) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [API_ENDPOINTS.DESTINATION.FIND_BY_SLUG, slug],
    queryFn: async () => {
      const res = await apiService.post(
        API_ENDPOINTS.DESTINATION.FIND_BY_SLUG,
        {
          slug,
        },
      );
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

export const useIncrementDestinationView = () => {
  const queryClient = useQueryClient();

  const { mutate: incrementView, isPending } = useMutation({
    mutationFn: (id: string) =>
      apiService.post(API_ENDPOINTS.DESTINATION.INCREMENT_VIEW, {
        id,
      }) as Promise<SuccessResponse>,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.DESTINATION.FIND_BY_SLUG, id],
      });
    },
  });

  return { incrementView, isLoading: isPending };
};

export const usePopularDestination = () => {
  const { data, isLoading, refetch, error } = useQuery<
    PageResponse<DestinationDto>
  >({
    queryKey: [API_ENDPOINTS.DESTINATION.POPULAR],
    queryFn: () => apiService.post(API_ENDPOINTS.DESTINATION.POPULAR),
  });

  return {
    data: data?.data || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};

export const useGetTourByDestination = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: getTourByDestination, isPending: isLoading } =
    useMutation({
      mutationFn: (id: string) =>
        apiService.post(API_ENDPOINTS.DESTINATION.GET_TOUR_BY_DESTINATION, {
          id,
        }) as Promise<SuccessResponse>,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.DESTINATION.GET_TOUR_BY_DESTINATION],
        });
      },
    });

  return {
    getTourByDestination,
    isLoading,
  };
};

export const useSearchDestination = (
  params: PaginationDto<DestinationFilterDto>,
) => {
  const { data, isLoading, refetch, error } = useQuery<
    PageResponse<DestinationDto>
  >({
    queryKey: [API_ENDPOINTS.DESTINATION.SEARCH, params],
    queryFn: () => apiService.post(API_ENDPOINTS.DESTINATION.SEARCH, params),
  });

  return {
    data: data?.data || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};
