import Cookies from "js-cookie";

interface TokenData {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
}

const STORAGE_KEYS = {
  ACCESS_TOKEN: "token",      // Key này phải khớp với Cookies.get() trong initApi.ts
  REFRESH_TOKEN: "refresh_token",
  USER: "user_data",
};

class TokenCache {
  // Khởi tạo cache mặc định
  private cache: TokenData = {
    accessToken: null,
    refreshToken: null,
    user: null,
  };

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Load dữ liệu từ Cookie và LocalStorage vào bộ nhớ tạm (cache)
   */
  private loadFromStorage(): void {
    if (typeof window === "undefined") return;

    try {
      this.cache.accessToken = Cookies.get(STORAGE_KEYS.ACCESS_TOKEN) || null;
      this.cache.refreshToken = Cookies.get(STORAGE_KEYS.REFRESH_TOKEN) || null;
      
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      if (userStr) {
        this.cache.user = JSON.parse(userStr);
      }
    } catch (error) {
      console.error("TokenCache: Error loading from storage", error);
      this.clear(); // Nếu dữ liệu lỗi (VD: JSON sai), xóa sạch để tránh crash app
    }
  }

  /**
   * Lưu toàn bộ thông tin đăng nhập
   */
  setAuthData(accessToken: string, refreshToken: string, user: any): void {
    try {
      this.cache.accessToken = accessToken;
      this.cache.refreshToken = refreshToken;
      this.cache.user = user;

      // 1. Lưu Token vào Cookies (Hết hạn sau 7 ngày)
      // Path: '/' cực kỳ quan trọng để các trang con đều đọc được
      const cookieOptions = { expires: 7, path: '/' };
      Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken, cookieOptions);
      Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken, cookieOptions);

      // 2. Lưu thông tin User vào LocalStorage (Vì dung lượng lớn hơn Cookie)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error("TokenCache: Error setting auth data", error);
    }
  }

  /**
   * Cập nhật riêng thông tin User (dùng sau khi gọi GetMe)
   */
  updateUser(user: any): void {
    this.cache.user = user;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  /**
   * Xóa sạch dữ liệu (dùng khi Logout hoặc Token hết hạn)
   */
  clear(): void {
    this.cache.accessToken = null;
    this.cache.refreshToken = null;
    this.cache.user = null;

    Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN, { path: '/' });
    Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN, { path: '/' });
    localStorage.removeItem(STORAGE_KEYS.USER);
    
    // Xóa thêm các key cũ nếu trước đó bạn lỡ đặt tên khác
    localStorage.removeItem("access_token"); 
  }

 
  getAccessToken(): string | null {
    return this.cache.accessToken || Cookies.get(STORAGE_KEYS.ACCESS_TOKEN) || null;
  }

  getRefreshToken(): string | null {
    return this.cache.refreshToken || Cookies.get(STORAGE_KEYS.REFRESH_TOKEN) || null;
  }

  getUser(): any | null {
    if (!this.cache.user) {
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    }
    return this.cache.user;
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }
}

// Export một instance duy nhất (Singleton pattern)
export const tokenCache = new TokenCache();
export default tokenCache;