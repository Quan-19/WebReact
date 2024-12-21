// src/Cart.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  // Giả sử bạn sử dụng localStorage để lưu trữ giỏ hàng (có thể thay thế bằng context hoặc Redux nếu cần)
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const handleCheckout = () => {
    alert("Thanh toán thành công!");
    // Xóa giỏ hàng sau khi thanh toán
    localStorage.removeItem("cart");
    navigate("/"); // Quay lại trang chủ
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn trống.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span> - {item.quantity} x {item.price} VND
              </li>
            ))}
          </ul>
          <div className="total">
            <h4>
              Tổng cộng:{" "}
              {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}{" "}
              VND
            </h4>
          </div>
          <button onClick={handleCheckout}>Thanh toán</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
