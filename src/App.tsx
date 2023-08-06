import { Button } from "antd";
import React from "react";
import Home from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
