import React from "react";
import ReactDOM from "react-dom/client";
import { Footer, Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import NoPageFound from "./pages/NoPageFound";
import ProductList from "./pages/admin/products/ProductList";
import CreateProduct from "./pages/admin/products/CreateProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NoPageFound />} />

          <Route
            path="/admin/products"
            element={
              <PrivateRoute allowedRoles={["user", "admin"]}>
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/products/create"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <CreateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <EditProduct />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Analytics />
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
