import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Detail from "./Detail";

export default function App() {
  const { cart, setCart } = useState([]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((item) => item.sku === sku);
      if (itemInCart) {
        items.map((item) => {
          if (item === itemInCart) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;

          //alternate
          //
          /* items.map((item) =>
            item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
          ); */
        });
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return items.map((item) =>
        item.sku === sku ? { ...item, quantity } : item
      );
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
