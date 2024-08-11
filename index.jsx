import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CountryDetail from "./components/CountryDetail";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Contact from "./components/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:country",
        element: <CountryDetail countryName={"India"} />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

const root = createRoot(document.querySelector("#root"));
root.render(<RouterProvider router={router} />);
