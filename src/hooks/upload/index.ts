import { API_ENDPOINTS } from "@/services/api-route";
import apiService from "@/services/api.service";
import { useMutation } from "@tanstack/react-query";

interface UploadResult {
  fileName: string;
  fileUrl: string;
  message: string;
}
export const useUploadSingle = () => {
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      // Vì interceptor của bạn đã trả về response.data
      // nên 'res' ở đây chính là object { fileName, fileUrl, message }
      const res = await apiService.post<UploadResult>(
        API_ENDPOINTS.UPLOAD_FILE.SINGLE,
        formData,
      );
      
      return res as unknown as UploadResult; 
    },
  });

  return {
    ...mutation,
    uploadAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    // data lúc này chính là UploadResult
    data: mutation.data, 
  };
};

export const useUploadMultiple = () => {
  const { isError, data, error, mutateAsync, mutate, isPending } = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await apiService.post<{ data: UploadResult[] }>(
        API_ENDPOINTS.UPLOAD_FILE.MULTI,
        formData,
      );
      return response;
    },
  });

  return {
    isError,
    data: data?.data,
    error,
    mutate,
    uploadAsync: mutateAsync,
    isLoading: isPending,
  };
};
