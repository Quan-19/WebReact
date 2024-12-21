import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Admin from "./Admin"; // Import trang Admin
import Home from "./Home"; // Import trang chủ (hoặc trang bạn đang làm việc)
import Cart from "./Cart";

function App() {
  return (
    <Router>
      <div>
        {/* Nút để vào trang Admin */}
        <nav>
          <Link to="/admin">
            <button>Vào trang Admin</button>
          </Link>
        </nav>
        {/* Nút về trang Home */}
        <nav>
          <Link to="/">
            <button>Về trang chủ</button>
          </Link>
        </nav>
        {/* Định nghĩa các Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
