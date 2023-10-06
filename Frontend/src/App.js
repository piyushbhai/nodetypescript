import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductList from "./pages/product/ProductList"
import ProductCreate from "./pages/product/ProductCreate"
import ProductEdit from "./pages/product/ProductEdit"
import ProductShow from "./pages/product/ProductShow"

import CategoryList from "./pages/category/CategoryList"
import CategoryCreate from "./pages/category/CategoryCreate"
import CategoryEdit from "./pages/category/CategoryEdit"
import Profile from "./pages/Profile"

import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Dashboard from "./pages/Dashboard"
import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/createProduct" element={<ProductCreate />} />
        <Route path="/editProduct/:id" element={<ProductEdit />} />
        <Route path="/viewProduct/:id" element={<ProductShow />} />

        <Route path="/category" element={<CategoryList />} />
        <Route path="/createCategory" element={<CategoryCreate />} />
        <Route path="/editCategory/:id" element={<CategoryEdit />} />

        <Route path="/profile" element={<Profile />} />


        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;