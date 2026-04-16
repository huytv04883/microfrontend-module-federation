import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import React from "react";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const HomePage = React.lazy(() => import("@/pages/Home"));
const LoginPage = React.lazy(() => import("@/pages/Login"));
const NotFoundPage = React.lazy(() => import("@/pages/404"));
const ReactRemotePage = React.lazy(() => import("@/pages/ReactRemote"));
const VueRemotePage = React.lazy(() => import("@/pages/VueRemote"));

function LazyPage({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export const routes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <LazyPage>
            <HomePage />
          </LazyPage>
        ),
      },
      {
        path: "/react",
        element: (
          <LazyPage>
            <ReactRemotePage />
          </LazyPage>
        ),
      },
      {
        path: "/vue",
        element: (
          <LazyPage>
            <VueRemotePage />
          </LazyPage>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: (
          <LazyPage>
            <LoginPage />
          </LazyPage>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <LazyPage>
        <NotFoundPage />
      </LazyPage>
    ),
  },
];
