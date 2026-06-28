import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import SignInPage from "./auth/sign-in/index.jsx";
import Home from "./home/index.jsx";
import Dashboard from "./dashboard/index.jsx";
import { ClerkProvider } from "@clerk/react";
import EditResume from "./dashboard/resume/resumeId/edit/index.jsx";
import ViewResume from "./my-resume/resumeId/View/index.jsx";
import AnalyseResume from "./resumeAnalyse/AnalyseResume.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
      { path: "my-resume/:resumeId/view", element: <ViewResume /> },
      { path: "/resume-analyse", element: <AnalyseResume /> },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  { path: "/auth/sign-in", element: <SignInPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
);
