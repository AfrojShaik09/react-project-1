import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../components/ProductForm";
import { handleAddProduct } from "../../../services/createProduct-service";
import "./CreateProduct.css";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
  });

  const validateForm = (product) => {
    let formErrors = {};

    if (!product.name || product.name.trim().length < 3) {
      formErrors.name = "Name must be at least 3 characters";
    }

    if (!product.brand || product.brand.trim().length < 3) {
      formErrors.brand = "Brand must be at least 3 characters";
    }

    if (isNaN(product.price) || parseFloat(product.price) <= 0) {
      formErrors.price = "Price must be greater than 0";
    }

    if (!product.description || product.description.trim().length < 10) {
      formErrors.description = "Description must be at least 10 characters";
    }

    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    const validationErrors = validateForm(product);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    const newProduct = {
      name: product.name.trim(),
      brand: product.brand.trim(),
      category: product.category,
      price: parseFloat(product.price),
      description: product.description.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await handleAddProduct(newProduct);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      setErrors({
        ...errors,
        general: "Failed to create product. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-product-page">
      <ProductForm
        product={{}}
        handleSubmit={handleSubmit}
        errors={errors}
        isEditMode={false}
        isLoading={isLoading}
      />
    </div>
  );
}
