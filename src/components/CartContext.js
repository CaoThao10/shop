// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find(
//         (item) => item.id === product.id && item.size === product.size
//       );
//       if (existingProduct) {
//         return prevCart.map((item) =>
//           item.id === product.id && item.size === product.size
//             ? { ...item, quantity: item.quantity + product.quantity }
//             : item
//         );
//       } else {
//         return [...prevCart, product];
//       }
//     });
//   };

//   const removeFromCart = (id, size) => {
//     setCart((prevCart) =>
//       prevCart.filter((item) => !(item.id === id && item.size === size))
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
