// src/Admin.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css"; // Import CSS vào đây

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, price };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        newProduct
      );
      setProducts([
        ...products,
        { ...newProduct, id: response.data.productId },
      ]);
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      alert("Lỗi khi thêm sản phẩm");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const updatedProduct = { name, description, price };

    try {
      await axios.put(
        `http://localhost:5000/api/products/${editingProduct.id}`,
        updatedProduct
      );
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? { ...product, ...updatedProduct }
          : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      alert("Đã sửa sản phẩm");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      alert("Đã xóa sản phẩm");
    }
  };

  return (
    <div className="admin">
      <h2>Trang Admin</h2>

      <form onSubmit={editingProduct ? handleSaveEdit : handleAddProduct}>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Giá:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {editingProduct ? "Lưu sửa" : "Thêm sản phẩm"}
        </button>
      </form>

      <h3>Danh sách sản phẩm</h3>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Sửa</button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
