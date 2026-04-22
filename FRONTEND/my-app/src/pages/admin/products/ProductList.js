import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchByName from "../../../components/searchByName";
import { useAuth } from "../../../components/AuthContext";
import Button from "../../../components/common/Button";
import ProductTable from "../../../components/ProductTable";
import Pagination from "../../../components/Pagination";
import ProductModal from "../../../components/ProductModal";
import CartModal from "../../../components/CartModal";
import { fetchProducts } from "../../../services/getProducts-service";
import { deleteProduct } from "../../../services/deleteProduct-service";
import "./ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortAscending, setSortAscending] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const { role } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const productList = await fetchProducts();
      if (productList) {
        setProducts(productList);
        setSearchResults(null);
        setCurrentPage(1);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      const response = await deleteProduct(id);
      if (response?.updatedProducts) {
        setProducts(response.updatedProducts);
      }
    }
  };

  const renderProducts = searchResults || products;
  const currentProducts = renderProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(renderProducts.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);

  const handleSortByDate = () => {
    const sorted = [...products].sort((a, b) =>
      sortAscending
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt),
    );
    setProducts(sorted);
    setSortAscending(!sortAscending);
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Products</h1>
        <p>Manage your product inventory</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          {role === "admin" && (
            <Link to="/admin/products/create" className="btn-link">
              <Button variant="primary" size="md" icon="plus">
                Add Product
              </Button>
            </Link>
          )}
          <Button
            variant="secondary"
            size="md"
            onClick={loadProducts}
            disabled={loading}
            loading={loading}
            icon="arrow-repeat"
          >
            {loading ? "Loading" : "Refresh"}
          </Button>
        </div>

        <div className="toolbar-right">
          <SearchByName setSearchResults={setSearchResults} />
          <div className="cart-icon" onClick={() => setShowCartModal(true)}>
            <i className="bi bi-bag"></i>
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </div>
        </div>
      </div>

      <div className="content">
        {loading ? (
          <div className="loader"></div>
        ) : currentProducts.length > 0 ? (
          <>
            <ProductTable
              products={currentProducts}
              role={role}
              onRowClick={handleRowClick}
              onDelete={handleDelete}
              onSort={handleSortByDate}
              sortAscending={sortAscending}
            />
            <Pagination
              pageNumbers={pageNumbers}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="empty-state">
            <p>No products found</p>
          </div>
        )}
      </div>

      {showModal && (
        <ProductModal
          product={selectedProduct}
          cart={cart}
          setCart={setCart}
          onClose={() => setShowModal(false)}
        />
      )}

      {showCartModal && (
        <CartModal
          cart={cart}
          setCart={setCart}
          onClose={() => setShowCartModal(false)}
        />
      )}
    </div>
  );
}
