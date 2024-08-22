import { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  GpaAssistant,
  Dashboard,
  GpaCalc,
  Login,
  MyGpas,
  SessionDashboard,
  Signup,
  StudyMaterials,
  StudyTips,
  UserSetup,
  Settings,
  Error,
  NotFound,
  LandingPage,
  Offline,
} from "./pages";
import PageWrapper from "./PageWrapper";
import { ThemeToggleBtn } from "./components";
import "./App.css";

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
    { path: "/user-setup", element: <UserSetup /> },
    { path: "/overview/:resultId", element: <PageWrapper Component={SessionDashboard} /> },
    { path: "/gpa-calc", element: <PageWrapper Component={GpaCalc} /> },
    { path: "/gpa-calc/:resultId", element: <PageWrapper Component={GpaCalc} /> },
    { path: "/my-gpas", element: <PageWrapper Component={MyGpas} /> },
    { path: "/gpa-assistant", element: <PageWrapper Component={GpaAssistant} /> },
    { path: "/study-materials", element: <PageWrapper Component={StudyMaterials} /> },
    { path: "/study-tips", element: <PageWrapper Component={StudyTips} /> },
    { path: "/settings", element: <PageWrapper Component={Settings} /> },
    { path: "/error", element: <Error /> },
    {path: "/offline", element: <Offline />},
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
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
