import ZaloCallback from "@/pages/auth/ZaloCallBack";
import AboutScreen from "@/pages/publics/about";
import BlogScreen from "@/pages/publics/blogs";
import BlogDetailScreen from "@/pages/publics/blogs/blog-detail";
import ContactScreen from "@/pages/publics/contact";
import FaqScreen from "@/pages/publics/contact/faq";
import HomeScreen from "@/pages/publics/home";
import ServiceScreen from "@/pages/publics/services";
import ServiceDetailScreen from "@/pages/publics/services/service-detail";
import TourScreen from "@/pages/publics/tours";
import TourDetailScreen from "@/pages/publics/tours/tour-detail";
import { PUBLIC_ROUTES } from "./routes";
import BookingScreen from "@/pages/publics/booking";

export const PUBLIC_SCREENS = {
  [PUBLIC_ROUTES.HOME]: <HomeScreen />,
  [PUBLIC_ROUTES.TOURS]: <TourScreen />,
  [PUBLIC_ROUTES.TOUR_DETAIL]: <TourDetailScreen />,
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
};
