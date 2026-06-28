import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { Button } from "../src/components/ui/button";
import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/react";
import Header from "./components/custom/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/custom/Footer";

function App() {
  const [count, setCount] = useState(0);
  const { user, isLoaded, isSignedIn } = useUser();
  const isPublicRoute = location.pathname === "/";

  if (!isSignedIn && isLoaded && !isPublicRoute) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
    </>
  );
}

export default App;
