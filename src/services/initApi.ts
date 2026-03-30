import { logOut } from "@/layout/lib/auth-event-emitter";
import axios from "axios";
import { tokenCache } from "@/utils/token-cache";

const ERROR_DEBOUNCE_MS = 3000;
let lastErrorMessage = "";
let lastErrorTimestamp = 0;

const initApi = (url?: string, headers = {}) => {
  if (url == null) throw new Error("URL is required");

  const api = axios.create({
    baseURL: url,
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      ...headers,
    },
  });

  api.interceptors.request.use(async (config) => {
    try {
      const token = tokenCache.getAccessToken();
      const languageKey = localStorage.getItem("language") || "vi";
      const tokenId = localStorage.getItem("tokenId");

      config.headers["x-lang"] = languageKey;
      if (tokenId) {
        config.headers["tokenid"] = tokenId; 
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }
    } catch (error) {
      console.error("Interceptor error:", error);
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response?.data,
    (error) => {
      const statusCode = error?.response?.status;

      if (statusCode === 401) {
        tokenCache.clear(); // Xóa sạch token khi hết hạn
        logOut(); // Phát event logout để UI cập nhật

        // Tránh reload lặp lại vô tận
        if (!window.location.pathname.includes("/login")) {
          // window.location.href = '/'; // Tùy chọn redirect
        }
      }

      // Logic hiển thị Toast (Giữ nguyên của bạn)
      let message = error?.response?.data?.message || "Có lỗi xảy ra";
      const now = Date.now();
      if (
        message !== lastErrorMessage ||
        now - lastErrorTimestamp > ERROR_DEBOUNCE_MS
      ) {
        lastErrorMessage = message;
        lastErrorTimestamp = now;
        // Gọi toast ở đây nếu cần
      }

      return Promise.reject(error);
    },
  );

  return api;
};

export default initApi;
