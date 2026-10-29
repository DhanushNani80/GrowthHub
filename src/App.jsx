// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-semibold text-primary">
              AI Project Sprint — Growth Hub
            </Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/register" className="hover:text-primary transition-colors">Register</Link>
              <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="bg-white text-center py-4 shadow-inner">
          <p className="text-sm">© 2026 Growth Hub – All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
