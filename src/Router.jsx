import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Profile from "./pages/Profile/Profile";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

//create layout to expand for header/footer
const Layout = () => {

  return (
    <>
      <Outlet />
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
          element: <Welcome />,
        },
        {
          path: '/profile',
          element: <Profile />,
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