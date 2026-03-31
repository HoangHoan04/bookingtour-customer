import { lazy } from "react";
import { PUBLIC_ROUTES } from "./routes";

const ZaloCallback = lazy(() => import("@/pages/auth/ZaloCallBack"));
const AboutScreen = lazy(() => import("@/pages/publics/about"));
const BlogScreen = lazy(() => import("@/pages/publics/blogs"));
const BlogDetailScreen = lazy(
  () => import("@/pages/publics/blogs/blog-detail"),
);
const BookingScreen = lazy(() => import("@/pages/publics/booking"));
const ContactScreen = lazy(() => import("@/pages/publics/contact"));
const FaqScreen = lazy(() => import("@/pages/publics/contact/faq"));
const DestinationScreen = lazy(() => import("@/pages/publics/destinations"));
const DestinationDetailScreen = lazy(
  () => import("@/pages/publics/destinations/destination-detail"),
);
const HomeScreen = lazy(() => import("@/pages/publics/home"));
const ServiceScreen = lazy(() => import("@/pages/publics/services"));
const ServiceDetailScreen = lazy(
  () => import("@/pages/publics/services/service-detail"),
);
const TourGuideScreen = lazy(() => import("@/pages/publics/tour-guides"));
const TourGuideDetailScreen = lazy(
  () => import("@/pages/publics/tour-guides/tour-guide-detail"),
);
const TourScreen = lazy(() => import("@/pages/publics/tours"));
const TourDetailScreen = lazy(
  () => import("@/pages/publics/tours/tour-detail"),
);
const TourDetailAllPricesScreen = lazy(
  () => import("@/pages/publics/tours/tour-detail/list-tour-detail"),
);

export const PUBLIC_SCREENS = {
  [PUBLIC_ROUTES.HOME]: <HomeScreen />,
  [PUBLIC_ROUTES.TOURS]: <TourScreen />,
  [PUBLIC_ROUTES.TOUR_DETAIL]: <TourDetailScreen />,
  [PUBLIC_ROUTES.TOUR_DETAIL_ALL_PRICES]: <TourDetailAllPricesScreen />,
  [PUBLIC_ROUTES.BOOKING]: <BookingScreen />,
  [PUBLIC_ROUTES.ABOUT]: <AboutScreen />,
  [PUBLIC_ROUTES.CONTACT]: <ContactScreen />,
  [PUBLIC_ROUTES.ZALO_CALLBACK]: <ZaloCallback />,
  [PUBLIC_ROUTES.CONTACT]: <ContactScreen />,
  [PUBLIC_ROUTES.BLOGS]: <BlogScreen />,
  [PUBLIC_ROUTES.BLOG_DETAIL]: <BlogDetailScreen />,
  [PUBLIC_ROUTES.FAQ]: <FaqScreen />,
  [PUBLIC_ROUTES.SERVICES]: <ServiceScreen />,
  [PUBLIC_ROUTES.SERVICE_DETAIL]: <ServiceDetailScreen />,
  [PUBLIC_ROUTES.TOUR_GUIDE]: <TourGuideScreen />,
  [PUBLIC_ROUTES.TOUR_GUIDE_DETAIL]: <TourGuideDetailScreen />,
  [PUBLIC_ROUTES.DESTINATIONS]: <DestinationScreen />,
  [PUBLIC_ROUTES.DESTINATION_DETAIL]: <DestinationDetailScreen />,
};
