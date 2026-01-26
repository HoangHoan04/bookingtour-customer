export const REQUIRE_AUTH_ROUTES = {};

export const PUBLIC_ROUTES = {
  HOME: "/",
  TOURS: "/tours",
  TOUR_DETAIL: "/tours/:slug",
  BOOKING: "/tours/booking/:slug",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  ABOUT: "/about",
  CONTACT: "/contact",
  BLOGS: "/blogs",
  BLOG_DETAIL: "/blogs/:id",
  FAQ: "/faq",
  SERVICES: "/services",
  SERVICE_DETAIL: "/services/:id",
  ZALO_CALLBACK: "/zalo-callback",
};

export type RequireAuthRouteKeys = keyof typeof REQUIRE_AUTH_ROUTES;
export type PublicRouteKeys = keyof typeof PUBLIC_ROUTES;
