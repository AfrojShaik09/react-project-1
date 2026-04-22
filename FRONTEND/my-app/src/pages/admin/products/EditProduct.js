import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../../components/ProductForm";
import { fetchProducts } from "../../../services/getProducts-service";
import { updateProduct } from "../../../services/updateProduct-service";
import "./EditProduct.css";

export default function EditProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts();

        if (!products) {
          throw new Error("Failed to fetch products");
        }

        const productToEdit = products.find(
          (product) => product.id === Number(params.id),
        );

        if (!productToEdit) {
          throw new Error("Product not found");
        }

        setProduct(productToEdit);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductById();
  }, [params.id]);

  const validateForm = (data) => {
    const formErrors = {};

    if (!data.name || data.name.trim().length < 3) {
      formErrors.name = "Name must be at least 3 characters";
    }

    if (!data.brand || data.brand.trim().length < 3) {
      formErrors.brand = "Brand must be at least 3 characters";
    }

    if (!data.price || isNaN(data.price) || parseFloat(data.price) <= 0) {
      formErrors.price = "Price must be greater than 0";
    }

    if (!data.description || data.description.trim().length < 10) {
      formErrors.description = "Description must be at least 10 characters";
    }

    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setError(null);

    const formData = new FormData(event.target);
    const updatedProductData = Object.fromEntries(formData.entries());

    const updatedData = {
      name: updatedProductData.name.trim(),
      brand: updatedProductData.brand.trim(),
      category: updatedProductData.category,
      price: parseFloat(updatedProductData.price),
      description: updatedProductData.description.trim(),
      createdAt: product.createdAt,
    };

    const validationErrors = validateForm(updatedData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);

    try {
      await updateProduct(params.id, updatedData);
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="edit-product-page">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-product-page">
        <div className="error-container">
          <div className="error-box">
            <i className="bi bi-exclamation-triangle"></i>
            <h2>Unable to Load Product</h2>
            <p>{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/products")}
            >
              <i className="bi bi-arrow-left"></i> Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-product-page">
      <ProductForm
        product={product}
        handleSubmit={handleSubmit}
        isEditMode={true}
        errors={errors}
        isLoading={isSaving}
      />
    </div>
  );
}
