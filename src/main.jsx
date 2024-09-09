import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'swiper/css';
import 'swiper/css/bundle';
import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <ToastContainer theme='colored' />
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>
);
