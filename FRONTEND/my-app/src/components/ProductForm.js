import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductForm.css";

export default function ProductForm({
  product,
  handleSubmit,
  errors,
  isEditMode,
}) {
  const [previewImage, setPreviewImage] = useState(
    product.imageFilename || null,
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>{isEditMode ? "Edit Product" : "Create Product"}</h1>
          <p>
            {isEditMode
              ? "Update product details"
              : "Add a new product to inventory"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {isEditMode && (
            <div className="form-group">
              <label>ID</label>
              <input
                type="text"
                readOnly
                value={product.id}
                className="form-input readonly"
              />
            </div>
          )}

          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              className="form-input"
              defaultValue={product.name || ""}
              placeholder="Enter product name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Brand *</label>
            <input
              type="text"
              name="brand"
              className="form-input"
              defaultValue={product.brand || ""}
              placeholder="Enter brand name"
            />
            {errors.brand && <span className="error">{errors.brand}</span>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-input"
              defaultValue={product.category || "Other"}
            >
              <option value="Other">Other</option>
              <option value="Phones">Phones</option>
              <option value="Computers">Computers</option>
              <option value="Accessories">Accessories</option>
              <option value="Printers">Printers</option>
              <option value="Cameras">Cameras</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price *</label>
            <div className="price-input-wrapper">
              <span className="currency">$</span>
              <input
                type="number"
                name="price"
                step="0.01"
                min="1"
                className="form-input price-input"
                defaultValue={product.price || ""}
                placeholder="0.00"
              />
            </div>
            {errors.price && <span className="error">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              className="form-input"
              defaultValue={product.description || ""}
              placeholder="Describe your product..."
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <div className="image-upload">
              {(previewImage || (isEditMode && product.imageFilename)) && (
                <div className="image-preview">
                  <img
                    src={
                      previewImage
                        ? previewImage
                        : `/images/${product.imageFilename}`
                    }
                    alt="Preview"
                  />
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                className="file-input"
                onChange={handleImageChange}
              />
              {errors.image && <span className="error">{errors.image}</span>}
            </div>
          </div>

          {isEditMode && (
            <div className="form-group">
              <label>Created Date</label>
              <input
                type="text"
                readOnly
                value={product.createdAt?.slice(0, 10)}
                className="form-input readonly"
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-check-circle"></i>
              {isEditMode ? "Update Product" : "Create Product"}
            </button>
            <Link to="/admin/products" className="btn btn-secondary">
              <i className="bi bi-x-circle"></i>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
