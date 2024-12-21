// src/Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    navigate("/cart"); // Chuyển đến trang giỏ hàng
  };

  return (
    <div className="home-container">
      <h2>Danh sách sản phẩm</h2>

      {products.length === 0 ? (
        <p className="no-products">Không có sản phẩm nào.</p>
      ) : (
        <div className="products">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.imageUrl || "/default-image.jpg"}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">{product.price} VND</p>
              <button onClick={() => handleAddToCart(product)}>
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
