import React, { createContext, useState, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import PageWrapper from "./hoc/PageWrapper";
import { Loader, ThemeToggleBtn } from "./components";
import "./App.css";
import ErrorBoundary from "./errorHandling/ErrorBoundary";
import { OfflineWrapper } from "./offlineHandling";
import { ServerError } from "./errorHandling";
import { Result } from "./features/dashboard";

// Lazy loading components
const GpaAssistant = lazy(() => import("./pages/GpaAssistant"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const GpaCalc = React.lazy(() => import("./pages/GpaCalc"));
const Login = React.lazy(() => import("./pages/Login"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const MyGpas = React.lazy(() => import("./pages/MyGpas"));
const SessionDashboard = React.lazy(() => import("./pages/SessionDashboard"));
const Signup = React.lazy(() => import("./pages/Signup"));
const StudyMaterials = React.lazy(() => import("./pages/StudyMaterials"));
const StudyTips = React.lazy(() => import("./pages/StudyTips"));
const UserSetup = React.lazy(() => import("./pages/UserSetup"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Error = React.lazy(() => import("./pages/Error"));
const NotFound = React.lazy(() => import("./pages/404"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const VerificationPage = lazy(() => import("./pages/VerificationPage"));
const OfflineNotification = React.lazy(() =>
  import("./offlineHandling/OfflineNotification")
);

export const UserContext = createContext({ userDetails: {} });

function App() {
  const [userDetails, setUserDetails] = useState({});
  const toast = useToast({ position: "top-right", duration: 3000 });
  const [error, setError] = useState({ title: "", message: "" });

  const pageRoutes = [
    { path: "/overview", Component: Dashboard },
    { path: "/overview/:resultId", Component: SessionDashboard },
    { path: "/gpa-calc", Component: GpaCalc },
    { path: "/gpa-calc/:resultId", Component: GpaCalc },
    { path: "/my-gpas", Component: MyGpas },
    { path: "/settings", Component: Settings },
    { path: "/study-tips", Component: StudyTips },
    { path: "/study-materials", Component: StudyMaterials },
    { path: "/gpa-assistant", Component: GpaAssistant },
    // Add more page components here
  ].map(({ path, Component }) => ({
    path,
    element: <ErrorBoundary children={<PageWrapper Component={Component} />} />,
  }));

  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/resetpassword/:oobCode",
      element: <ResetPassword />,
    },
    {
      path: "/user-setup",
      element: <UserSetup />,
    },
    {
      path: "verifyaccount",
      element: <VerificationPage />,
    },
    ...pageRoutes,

    { path: "/result/:uid/:resultId", element: <Result /> },
    { path: "/error", element: <Error /> },
    { path: "/server-error", element: <ServerError /> },
    { path: "/offline_notification", element: <OfflineNotification /> },
    { path: "*", element: <NotFound /> },
    // Other routes as needed
  ];

  const router = createBrowserRouter(routes);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        error,
        setError,
        toast,
      }}
    >
      <ThemeToggleBtn />
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <OfflineWrapper Component={RouterProvider} router={router} />
        </Suspense>
      </ErrorBoundary>
    </UserContext.Provider>
  );
}

export default App;
