import ZaloCallback from "@/pages/auth/ZaloCallBack";
import AboutScreen from "@/pages/publics/about";
import BlogScreen from "@/pages/publics/blogs";
import BlogDetailScreen from "@/pages/publics/blogs/blog-detail";
import ContactScreen from "@/pages/publics/contact";
import FaqScreen from "@/pages/publics/contact/faq";
import DestinationScreen from "@/pages/publics/destinations";
import DestinationDetailScreen from "@/pages/publics/destinations/destination-detail";
import HomeScreen from "@/pages/publics/home";
import ServiceScreen from "@/pages/publics/services";
import ServiceDetailScreen from "@/pages/publics/services/service-detail";
import TourGuideScreen from "@/pages/publics/tour-guides";
import TourGuideDetailScreen from "@/pages/publics/tour-guides/tour-guide-detail";
import { PUBLIC_ROUTES } from "./routes";

export const PUBLIC_SCREENS = {
  [PUBLIC_ROUTES.HOME]: <HomeScreen />,
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
