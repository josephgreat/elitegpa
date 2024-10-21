import React, { createContext, useState, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import PageWrapper from "./PageWrapper";
import { Loader, ThemeToggleBtn } from "./components";
import "./App.css";

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
const Offline = React.lazy(() => import("./pages/Offline"));

export const UserContext = createContext({ userDetails: {} });

function App() {
  const [userDetails, setUserDetails] = useState({});
  const toast = useToast({ position: "top-right", duration: 3000 });
  const [error, setError] = useState({ title: "", message: "" });

  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/overview", element: <PageWrapper Component={Dashboard} /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/forgotpassword", element: <ForgotPassword /> },
    { path: "/resetpassword/:oobCode", element: <ResetPassword  /> },
    { path: "/user-setup", element: <UserSetup /> },
    {
      path: "/overview/:resultId",
      element: <PageWrapper Component={SessionDashboard} />,
    },
    { path: "/gpa-calc", element: <PageWrapper Component={GpaCalc} /> },
    {
      path: "/gpa-calc/:resultId",
      element: <PageWrapper Component={GpaCalc} />,
    },
    { path: "/my-gpas", element: <PageWrapper Component={MyGpas} /> },
    {
      path: "/gpa-assistant",
      element: <PageWrapper Component={GpaAssistant} />,
    },
    {
      path: "/study-materials",
      element: <PageWrapper Component={StudyMaterials} />,
    },
    { path: "/study-tips", element: <PageWrapper Component={StudyTips} /> },
    { path: "/settings", element: <PageWrapper Component={Settings} /> },
    { path: "/error", element: <Error /> },
    { path: "/offline", element: <Offline /> },
    {
      path: "verifyaccount",
      element: <VerificationPage />,
    },
    { path: "*", element: <NotFound /> },
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
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
