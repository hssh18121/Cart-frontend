import React, { useEffect, useState } from "react";

import Table from "./components/Table/Table";
import CheckoutContainer from "./components/CheckoutContainer/CheckoutContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route exact path="/cart" element={<Cart />} />

      <Route exact path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
