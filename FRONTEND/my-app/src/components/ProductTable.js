import React from "react";
import { Link } from "react-router-dom";
import Button from "./common/Button";
import "./ProductTable.css";

export default function ProductTable({
  products,
  role,
  onRowClick,
  onDelete,
  onSort,
  sortAscending,
}) {
  return (
    <div className="products-container">
      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => onRowClick(product)}
          >
            <div className="product-image">
              <img
                src={`/images/${product.imageFilename}`}
                alt={product.name}
              />
              <span className="product-id">#{product.id}</span>
            </div>

            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>

              <div className="product-meta">
                <span className="meta-label">Brand:</span>
                <span className="meta-value">{product.brand}</span>
              </div>

              <div className="product-meta">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>

              <div className="product-meta">
                <span className="meta-label">Added:</span>
                <span className="meta-value">
                  {product.createdAt?.slice(0, 10)}
                </span>
              </div>

              <div className="product-price">${product.price}</div>
            </div>

            {role === "admin" && (
              <div
                className="product-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <Link to={`/admin/products/edit/${product.id}`}>
                  <Button variant="outline" size="sm" icon="pencil" />
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  icon="trash"
                  onClick={() => onDelete(product.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sort-bar">
        <button className="sort-btn" onClick={onSort}>
          Sort by Date {sortAscending ? "↑" : "↓"}
        </button>
      </div>
    </div>
  );
}
