const prefix = "/api/user";
export const API_ENDPOINTS = {
  LOGIN: `${prefix}/auth/login`,
  GET_ME: `${prefix}/auth/me`,
  CHANGE_PASSWORD: `${prefix}/auth/update-password`,
  GET_TOKEN_ID: `${prefix}/auth/get-token-id`,
  LOGIN_WITH_GOOGLE: `${prefix}/auth/login/google`,
  LOGIN_WITH_FACEBOOK: `${prefix}/auth/login/facebook`,
  LOGIN_WITH_ZALO: `${prefix}/auth/login/zalo`,

  CUSTOMER: {
    CHECK_PHONE_EMAIL: `${prefix}/customer/check-phone-email`,
    SEND_OTP: `${prefix}/customer/send-otp`,
    SEND_OTP_VERIFY: `${prefix}/customer/send-otp-verify`,
    FORGOT_PASSWORD: `${prefix}/customer/forgot-password`,
    REGISTER: `${prefix}/customer/register`,
    UPDATE: `${prefix}/customer/:id`,
    VERIFY_OTP: `${prefix}/customer/verify-otp`,
    FIND_BY_PHONE_EMAIL: `${prefix}/customer/find-by-phone-email`,
    UPDATE_AVATAR: `${prefix}/customer/update-avatar`,
  },

  NOTIFY: {
    SEEN_ALL: `${prefix}/notify/update-seen-all`,
    SEEN_LIST: `${prefix}/notify/update-seen-list`,
    COUNT_NOT_SEEN: `${prefix}/notify/find-count-notify-not-seen`,
    PAGINATION: `${prefix}/notify/pagination`,
  },

  BANNER: {
    GET_BY_TYPE: `${prefix}/banner/get-by-type`,
  },

  NEWSLETTER: {
    SUBSCRIBE: `${prefix}/newsletter/subscribe`,
  },
};
