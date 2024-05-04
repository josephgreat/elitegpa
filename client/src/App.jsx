import { useState } from 'react'
import { Navbar } from './components'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {AiChat, Dashboard, GpaCalc, MyGpas, StudyMaterials, StudyTips} from "./pages"
import "./App.css"
import PageWrapper from './PageWrapper'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageWrapper Component={Dashboard} />
    },
    {
      path: "/gpa-calc",
      element: <PageWrapper Component={GpaCalc} />
    },
    {
      path: "/gpa-calc/:resultId",
      element: <PageWrapper Component={GpaCalc} />
    },
    {
      path: "/my-gpas",
      element: <PageWrapper Component={MyGpas} />
    },
    {
      path: "/ai-chat",
      element: <PageWrapper Component={AiChat} />
    },
    {
      path: "/study-materials",
      element: <PageWrapper Component={StudyMaterials} />
    },
    {
      path: "/study-tips",
      element: <PageWrapper Component={StudyTips} />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
