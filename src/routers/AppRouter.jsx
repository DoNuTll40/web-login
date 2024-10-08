import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AuthHook from "../hooks/AuthHook";
import Header from "../components/Header";
import RegisterPage from "../pages/RegisterPage";

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Outlet />
        </>,
        children: [
            { index: true, element: <LoginPage /> },
            { path: "/sign-up", element: <RegisterPage /> }
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
    console.log(user?.id)
    const finalRouter = user?.id ? userRouter : guestRouter

  return (
    <RouterProvider router={finalRouter} />
  )
}
