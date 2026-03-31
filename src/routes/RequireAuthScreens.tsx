import { REQUIRE_AUTH_ROUTES } from "./routes";
import ChangePasswordPage from "@/pages/require-auth/change-password";
import ProfilePage from "@/pages/require-auth/profile";

export const REQUIRE_AUTH_SCREENS = {
  [REQUIRE_AUTH_ROUTES.CHANGE_PASSWORD]: <ChangePasswordPage />,
  [REQUIRE_AUTH_ROUTES.PROFILE]: <ProfilePage />,
};
