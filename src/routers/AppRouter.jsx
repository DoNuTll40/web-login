import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AuthHook from "../hooks/AuthHook";
import Header from "../components/Header";

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Outlet />
        </>,
        children: [
            { index: true, element: <LoginPage /> }
        ]
    }
])

const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header />
            <Outlet />
        </>,
        children: [
            { index: true, element: <HomePage /> }
        ]
    }
])

export default function AppRouter() {
    const { user } = AuthHook();
    const finalRouter = user?.user_id ? userRouter : guestRouter

  return (
    <RouterProvider router={finalRouter} />
  )
}
