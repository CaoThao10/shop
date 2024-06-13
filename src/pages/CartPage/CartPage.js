import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../components/CartContext";
// import { CartContext } from "../CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="mx-[200px] mt-[100px]">
      <h1 className="text-3xl font-semibold mb-5">Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl mb-3">Giỏ hàng của bạn đang trống</h2>
          <Link to="/all" className="text-blue-500">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 mb-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border border-gray-200 rounded-md"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">Kích thước: {item.size}</p>
                  <p className="text-gray-500">Số lượng: {item.quantity}</p>
                  <p className="text-gray-500">
                    Giá: {item.price.toLocaleString()}đ
                  </p>
                  <button
                    className="mt-2 text-red-500"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Xóa
                  </button>
                </div>
                <div className="text-lg font-semibold">
                  {(item.price * item.quantity).toLocaleString()}đ
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-4">
            <h2 className="text-2xl font-semibold">
              Tổng cộng: {getTotalPrice().toLocaleString()}đ
            </h2>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={clearCart}
            >
              Xóa tất cả
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
