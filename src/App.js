import React from "react";

import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Cart from "./components/Cart/Cart";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/Cart-frontend/:id" element={<Cart />} />
      <Route exact path="/home" element={<HomePage />} />
      <Route path="/Cart-frontend/admin-cart" element={<Admin />} />
    </Routes>
  );
}

export default App;
