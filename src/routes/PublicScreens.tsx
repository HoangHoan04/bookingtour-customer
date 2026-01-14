import ForgotPasswordScreen from "@/pages/auth/forgot-password";
import ResetPasswordScreen from "@/pages/auth/reset-password";
import ZaloCallback from "@/pages/auth/ZaloCallBack";
import AboutScreen from "@/pages/publics/about";
import ContactScreen from "@/pages/publics/contact";
import HomeScreen from "@/pages/publics/home";
import { PUBLIC_ROUTES } from "./routes";

export const PUBLIC_SCREENS = {
  [PUBLIC_ROUTES.HOME]: <HomeScreen />,
  [PUBLIC_ROUTES.ABOUT]: <AboutScreen />,
  [PUBLIC_ROUTES.FORGOT_PASSWORD]: <ForgotPasswordScreen />,
  [PUBLIC_ROUTES.RESET_PASSWORD]: <ResetPasswordScreen />,
  [PUBLIC_ROUTES.CONTACT]: <ContactScreen />,
  [PUBLIC_ROUTES.ZALO_CALLBACK]: <ZaloCallback />,
};
