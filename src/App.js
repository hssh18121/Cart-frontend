import React from "react";

import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Cart from "./components/Cart/Cart";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route exact path="/Cart-frontend/:id" element={<Cart />} />
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/Cart-frontend/admin-cart" element={<Admin />} />
    </Routes>
  );
}

export default App;
