import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../components/Form";
import { handleAddProduct } from "../../../services/createProduct-service";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
  });

  const validateForm = (product) => {
    let formErrors = {};

    if (product.name.length < 3) {
      formErrors.name = "Name should be at least 3 characters long.";
    }

    if (product.brand.length < 3) {
      formErrors.brand = "Brand should be at least 3 characters long.";
    }

    if (isNaN(product.price) || product.price <= 0) {
      formErrors.price = "Price should be a valid number greater than 0.";
    }

    if (product.description.length < 10) {
      formErrors.description =
        "Description should be at least 10 characters long.";
    }

    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    const validationErrors = validateForm(product);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newProduct = {
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: parseFloat(product.price),
      description: product.description,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await handleAddProduct(newProduct);

      console.log("Product created:", response);

      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      setErrors({
        ...errors,
        general: "Failed to create product. Please try again.",
      });
    }
  };

  return (
    <ProductForm
      product={{}}
      handleSubmit={handleSubmit}
      errors={errors}
      isEditMode={false}
    />
  );
}
