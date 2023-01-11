import React from "react";

import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/Cart-frontend/:id" element={<Cart />} />
      <Route exact path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
