import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Callback from "./pages/Callback";
import LoadingSongs from "./pages/LoadingSongs/LoadingSongs";
import ActionPage from "./pages/ActionPage/ActionPage";
import DataPage from "./pages/DataPage/DataPage";
import FAQS from "./pages/FAQS/FAQS";
import Footer from "./components/Footer/Footer";

//create layout to expand for header/footer
const Layout = () => {

  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}

export default function Router() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      //pages here
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/festival-search',
          element: <ActionPage />,
        },
        {
          path: '/festival-results',
          element: <DataPage />,
        },
        {
          path: '/callback',
          element: <Callback />,
        },
        {
          path: '/loading-songs',
          element: <LoadingSongs />,
        },
        {
          path: '/FAQS',
          element: <FAQS/>,
        },
        //catch all route for 404 
        {
          path: '*',
          element: <ErrorPage />,
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}