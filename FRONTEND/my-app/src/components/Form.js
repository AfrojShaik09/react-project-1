import React from "react";
import { Link } from "react-router-dom";

export default function ProductForm({
  product,
  handleSubmit,
  errors,
  isEditMode,
}) {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">
            {isEditMode ? "Edit Product" : "Create Product"}
          </h2>

          <form onSubmit={handleSubmit}>
            {isEditMode && (
              <div className="row mb-3">
                <label className="col-12 col-sm-4 col-form-label">ID</label>
                <div className="col-12 col-sm-8">
                  <input
                    readOnly
                    className="form-control-plaintext"
                    defaultValue={product.id}
                  />
                </div>
              </div>
            )}

            <div className="row mb-3">
              <label className="col-12 col-sm-4 col-form-label">Name</label>
              <div className="col-12 col-sm-8">
                <input
                  className="form-control"
                  name="name"
                  defaultValue={product.name || ""}
                />
                {errors.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-12 col-sm-4 col-form-label">Brand</label>
              <div className="col-12 col-sm-8">
                <input
                  className="form-control"
                  name="brand"
                  defaultValue={product.brand || ""}
                />
                {errors.brand && (
                  <span className="text-danger">{errors.brand}</span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-12 col-sm-4 col-form-label">Category</label>
              <div className="col-12 col-sm-8">
                <select
                  className="form-select"
                  name="category"
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
            </div>

            <div className="row mb-3">
              <label className="col-12 col-sm-4 col-form-label">Price</label>
              <div className="col-12 col-sm-8">
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  step="0.01"
                  min="1"
                  defaultValue={product.price || ""}
                />
                {errors.price && (
                  <span className="text-danger">{errors.price}</span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-12 col-sm-4 col-form-label">
                Description
              </label>
              <div className="col-12 col-sm-8">
                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  defaultValue={product.description || ""}
                />
                {errors.description && (
                  <span className="text-danger">{errors.description}</span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-12 col-sm-4 col-form-label">Image</label>
              <div className="col-12 col-sm-8">
                {isEditMode && product.imageFilename && (
                  <div className="mb-3">
                    <img
                      src={`/images/${product.imageFilename}`}
                      alt={product.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <input className="form-control" type="file" name="image" />
                {errors.image && (
                  <span className="text-danger">{errors.image}</span>
                )}
              </div>
            </div>

            {isEditMode && (
              <div className="row mb-3">
                <label className="col-12 col-sm-4 col-form-label">
                  Created At
                </label>
                <div className="col-12 col-sm-8">
                  <input
                    readOnly
                    className="form-control-plaintext"
                    defaultValue={product.createdAt?.slice(0, 10)}
                  />
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 offset-md-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  {isEditMode ? "Update" : "Submit"}
                </button>
              </div>
              <div className="col-12 col-sm-6 col-md-4 d-grid mt-2 mt-sm-0">
                <Link className="btn btn-secondary" to="/admin/products">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
