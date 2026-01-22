import type {
  PageResponse,
  PaginationDto,
  SuccessResponse,
} from "@/dto/base.dto";
import type {
  BlogCommentDto,
  BlogCommentFilterDto,
  BlogDto,
  BlogFilterDto,
  CreateBlogCommentDto,
  UpdateBlogCommentDto,
} from "@/dto/blog.dto";
import { API_ENDPOINTS } from "@/services/api-route";
import apiService from "@/services/api.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePaginationBlog = (params: PaginationDto<BlogFilterDto>) => {
  const { data, isLoading, refetch, error } = useQuery<PageResponse<BlogDto>>({
    queryKey: [API_ENDPOINTS.BLOG.PAGINATION, params],
    queryFn: () => apiService.post(API_ENDPOINTS.BLOG.PAGINATION, params),
  });

  return {
    data: data?.data || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};

export const useBlogDetail = (id: string | undefined | null) => {
  const { data, isLoading, refetch, error } = useQuery<
    SuccessResponse<BlogDto>
  >({
    queryKey: [API_ENDPOINTS.BLOG.FIND_BY_ID, id],
    queryFn: async () => {
      const res = await apiService.post(API_ENDPOINTS.BLOG.FIND_BY_ID, {
        id,
      });
      return res.data as SuccessResponse<BlogDto>;
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

export const useBlogBySlug = (slug: string | undefined | null) => {
  const { data, isLoading, refetch, error } = useQuery<
    SuccessResponse<BlogDto>
  >({
    queryKey: [API_ENDPOINTS.BLOG.FIND_BY_SLUG, slug],
    queryFn: async () => {
      const res = await apiService.post(API_ENDPOINTS.BLOG.FIND_BY_SLUG, {
        slug,
      });
      return res.data as SuccessResponse<BlogDto>;
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

export const useIncrementBlogView = () => {
  const queryClient = useQueryClient();

  const { mutate: incrementView, isPending } = useMutation({
    mutationFn: (id: string) =>
      apiService.post(API_ENDPOINTS.BLOG.INCREMENT_VIEW, {
        id,
      }) as Promise<SuccessResponse>,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.BLOG.FIND_BY_ID, id],
      });
    },
  });

  return { incrementView, isLoading: isPending };
};

export const useLikeBlog = () => {
  const queryClient = useQueryClient();

  const { mutate: likeBlog, isPending } = useMutation({
    mutationFn: (id: string) =>
      apiService.post(API_ENDPOINTS.BLOG.LIKE, {
        id,
      }) as Promise<SuccessResponse>,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.BLOG.FIND_BY_ID, id],
      });
    },
  });

  return { likeBlog, isLoading: isPending };
};

export const useUnlikeBlog = () => {
  const queryClient = useQueryClient();

  const { mutate: unlikeBlog, isPending } = useMutation({
    mutationFn: (id: string) =>
      apiService.post(API_ENDPOINTS.BLOG.UNLIKE, {
        id,
      }) as Promise<SuccessResponse>,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.BLOG.FIND_BY_ID, id],
      });
    },
  });

  return { unlikeBlog, isLoading: isPending };
};

export const useCreateBlogComment = () => {
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending } = useMutation({
    mutationFn: (body: CreateBlogCommentDto) =>
      apiService.post(
        API_ENDPOINTS.BLOG.CREATE_COMMENT,
        body,
      ) as Promise<SuccessResponse>,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.BLOG.PAGINATION_COMMENT],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.BLOG.FIND_BY_ID, variables.postId],
      });
    },
  });

  return { createComment, isLoading: isPending };
};

export const useUpdateBlogComment = () => {
  const queryClient = useQueryClient();

  const { mutate: updateComment, isPending } = useMutation({
    mutationFn: (data: UpdateBlogCommentDto) => {
      return apiService.post(
        API_ENDPOINTS.BLOG.UPDATE_COMMENT,
        data,
      ) as Promise<SuccessResponse>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.BLOG.PAGINATION_COMMENT],
      });
    },
  });

  return { updateComment, isLoading: isPending };
};

export const useDeleteBlogComment = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteComment, isPending: isLoading } = useMutation({
    mutationFn: (id: string) =>
      apiService.post(API_ENDPOINTS.BLOG.DELETE_COMMENT, {
        id,
      }) as Promise<SuccessResponse>,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.BLOG.PAGINATION_COMMENT],
      });
    },
  });

  return {
    deleteComment,
    isLoading,
  };
};

export const usePaginationBlogComment = (
  params: PaginationDto<BlogCommentFilterDto>,
) => {
  const { data, isLoading, refetch, error } = useQuery<
    PageResponse<BlogCommentDto>
  >({
    queryKey: [API_ENDPOINTS.BLOG.PAGINATION_COMMENT, params],
    queryFn: () =>
      apiService.post(API_ENDPOINTS.BLOG.PAGINATION_COMMENT, params),
  });

  return {
    data: data?.data || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};
