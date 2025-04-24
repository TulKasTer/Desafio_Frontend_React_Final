import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import ErrorPage from "../pages/ErrorPage";

import ProductPage from "../pages/ProductPage";

import CategoriesPage from "../pages/CategoriesPage";

import SuppliersPage from "../pages/SuppliersPage";

const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    errorElement: <ErrorPage />,
  },
  
  {
    path: "/products",

    element: <ProductPage />,

    errorElement: <ErrorPage />
  },

  {
    path: "/categories",

    element: <CategoriesPage />,

    errorElement: <ErrorPage />
  },

  {
    path: "suppliers",

    element: <SuppliersPage />,

    errorElement: <ErrorPage />
  }
]);

export default router;