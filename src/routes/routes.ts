export const REQUIRE_AUTH_ROUTES = {};

export const PUBLIC_ROUTES = {
  HOME: "/",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  ABOUT: "/about",
  CONTACT: "/contact",
  BLOGS: "/blogs",
  BLOG_DETAIL: "/blogs/:id",
  FAQ: "/faq",
  SERVICES: "/services",
  SERVICE_DETAIL: "/services/:id",
  TOUR_GUIDE: "/tour-guide",
  TOUR_GUIDE_DETAIL: "/tour-guide/:id",
  DESTINATIONS: "/destinations",
  DESTINATION_DETAIL: "/destinations/:slug",
  ZALO_CALLBACK: "/zalo-callback",
};

export type RequireAuthRouteKeys = keyof typeof REQUIRE_AUTH_ROUTES;
export type PublicRouteKeys = keyof typeof PUBLIC_ROUTES;
