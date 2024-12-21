import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price} VND</p>
      <button onClick={() => addToCart(product)}>Thêm vào giỏ</button>
    </div>
  );
};

export default ProductCard;
