import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import GlobalLoading from "../components/ui/Loading";
import AuthLayout from "../layout/AuthLayout";
import PublicLayout from "../layout/PublicLayout";
import RequireAuthLayout from "../layout/RequireAuthLayout";
import PrivateRoute from "./PrivateRoutes";
import { PUBLIC_SCREENS } from "./PublicScreens";
import { PUBLIC_ROUTES } from "./routes";

const Page404 = lazy(() => import("../pages/NotFound"));

const RequireAuthRoutes = [
  {
    path: "/",
    element: (
      <RequireAuthLayout>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute />
        </Suspense>
      </RequireAuthLayout>
    ),
    children: [],
  },
];

const AuthRoutes = [
  {
    path: "/",
    element: (
      <AuthLayout>
        <Suspense fallback={<GlobalLoading />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    ),
    children: [
      {
        path: PUBLIC_ROUTES.FORGOT_PASSWORD,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.FORGOT_PASSWORD],
      },
      {
        path: PUBLIC_ROUTES.RESET_PASSWORD,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.RESET_PASSWORD],
      },
    ],
  },
];

const PublicRoutes = [
  {
    path: "/",
    element: (
      <PublicLayout>
        <Suspense fallback={<GlobalLoading />}>
          <Outlet />
        </Suspense>
      </PublicLayout>
    ),
    children: [
      {
        index: true,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.HOME],
      },
      {
        path: PUBLIC_ROUTES.TOURS,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.TOURS],
      },
      {
        path: PUBLIC_ROUTES.TOUR_DETAIL,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.TOUR_DETAIL],
      },
      {
        path: PUBLIC_ROUTES.BOOKING,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.BOOKING],
      },
      {
        path: PUBLIC_ROUTES.ABOUT,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.ABOUT],
      },
      {
        path: PUBLIC_ROUTES.CONTACT,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.CONTACT],
      },
      {
        path: PUBLIC_ROUTES.CONTACT,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.CONTACT],
      },
      {
        path: PUBLIC_ROUTES.BLOGS,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.BLOGS],
      },
      {
        path: PUBLIC_ROUTES.BLOG_DETAIL,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.BLOG_DETAIL],
      },
      {
        path: PUBLIC_ROUTES.FAQ,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.FAQ],
      },
      {
        path: PUBLIC_ROUTES.SERVICES,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.SERVICES],
      },
      {
        path: PUBLIC_ROUTES.SERVICE_DETAIL,
        element: PUBLIC_SCREENS[PUBLIC_ROUTES.SERVICE_DETAIL],
      },
    ],
  },
];

export default function AppRouter() {
  const routes = useRoutes([
    ...PublicRoutes,
    ...RequireAuthRoutes,
    ...AuthRoutes,
    {
      path: "/404",
      element: (
        <Suspense fallback={<GlobalLoading />}>
          <Page404 />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <Navigate replace to="/404" />,
    },
  ]);

  return routes;
}
