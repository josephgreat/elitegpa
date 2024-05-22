import { createContext, useState } from "react";
import { Navbar } from "./components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AiChat,
  Dashboard,
  GpaCalc,
  Login,
  MyGpas,
  SessionDashboard,
  Signup,
  StudyMaterials,
  StudyTips,
} from "./pages";
import "./App.css";
import PageWrapper from "./PageWrapper";

export const UserContext = createContext({ userDetails: {} });

function App() {
  const [userDetails, setUserDetails] = useState({});

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageWrapper Component={Dashboard} />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/overview/:resultId",
      element: <PageWrapper Component={SessionDashboard} />,
    },
    {
      path: "/gpa-calc",
      element: <PageWrapper Component={GpaCalc} />,
    },
    {
      path: "/gpa-calc/:resultId",
      element: <PageWrapper Component={GpaCalc} />,
    },
    {
      path: "/my-gpas",
      element: <PageWrapper Component={MyGpas} />,
    },
    {
      path: "/ai-chat",
      element: <PageWrapper Component={AiChat} />,
    },
    {
      path: "/study-materials",
      element: <PageWrapper Component={StudyMaterials} />,
    },
    {
      path: "/study-tips",
      element: <PageWrapper Component={StudyTips} />,
    },
  ]);
  return (
    <UserContext.Provider
      value={{ userDetails: userDetails, setUserDetails: setUserDetails }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
