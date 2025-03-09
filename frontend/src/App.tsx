import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProducts";
import EditProduct from "./pages/EditProduct";
import "./styles/app.css";
import "./styles/global.css";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove todas as classes previamente aplicadas ao body
    document.body.className = "";

    // Adiciona a classe ao body com base na rota atual
    if (location.pathname === "/") {
      document.body.classList.add("login-page");
    } else if (location.pathname === "/register") {
      document.body.classList.add("register-page");
    } else if (location.pathname === "/products") {
      document.body.classList.add("products-page");
    } else if (location.pathname.startsWith("/add-product")) {
      document.body.classList.add("add-product-page");
    } else if (location.pathname.startsWith("/edit-product")) {
      document.body.classList.add("edit-page");
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default App;
