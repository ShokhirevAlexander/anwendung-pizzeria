import "./scss/app.scss";

import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout"
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import Autorization from "./pages/Autorization/Autorization";
import { NotFoundBlock } from "./pages/NotFound";

function App() {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route path="" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<FullPizza />}/>
          <Route path="/register" element={<LoginRegister />}/>
          <Route path="/login" element={<Autorization />}/>
          <Route path="*" element={<NotFoundBlock />} />
        </Route>
    </Routes>
  );
}

export default App;
