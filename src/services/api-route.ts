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

  TRAVEL_HINT: {
    GET_TRAVEL_HINT_BY_TYPE: `${prefix}/travel-hint/get-travel-hint-by-type`,
  },

  NEWSLETTER: {
    SUBSCRIBE: `${prefix}/newsletter/subscribe`,
    UNSUBSCRIBE: `${prefix}/newsletter/unsubscribe`,
  },

  BLOG: {
    PAGINATION: `${prefix}/blog/pagination`,
    FIND_BY_ID: `${prefix}/blog/find-by-id`,
    FIND_BY_SLUG: `${prefix}/blog/find-by-slug`,
    INCREMENT_VIEW: `${prefix}/blog/increment-view`,
    LIKE: `${prefix}/blog/like`,
    UNLIKE: `${prefix}/blog/unlike`,
    CREATE_COMMENT: `${prefix}/blog/create-comment`,
    UPDATE_COMMENT: `${prefix}/blog/update-comment`,
    DELETE_COMMENT: `${prefix}/blog/delete-comment`,
    PAGINATION_COMMENT: `${prefix}/blog/pagination-comment`,
  },

  NEWS: {
    PAGINATION: `${prefix}/news/pagination`,
    DETAIL: `${prefix}/news/detail`,
    FEATURED: `${prefix}/news/featured`,
    RELATED: `${prefix}/news/related`,
    LATEST: `${prefix}/news/latest`,
    FIND_BY_TYPE: `${prefix}/news/find-by-type`,
    SEARCH: `${prefix}/news/search`,
    COUNT_BY_TYPE: `${prefix}/news/count-by-type`,
  },

  UPLOAD_FILE: {
    SINGLE: "/api/upload/uploadFiles/upload-single",
    MULTI: "/api/upload/uploadFiles/upload-multi",
  },

  EMAIL: {
    SEND_CONTACT: "/api/email/send-contact",
  },

  TOUR_GUIDE: {
    PAGINATION: `${prefix}/tour-guide/pagination`,
    FIND_BY_SLUG: `${prefix}/tour-guide/find-by-slug`,
  },

  DESTINATION: {
    PAGINATION: `${prefix}/destination/pagination`,
    FIND_BY_SLUG: `${prefix}/destination/find-by-slug`,
    GET_TOUR_BY_DESTINATION: `${prefix}/destination/get-tour-by-destination`,
    INCREMENT_VIEW: `${prefix}/destination/increment-view`,
    POPULAR: `${prefix}/destination/popular`,
    SEARCH: `${prefix}/destination/search`,
  },
};
