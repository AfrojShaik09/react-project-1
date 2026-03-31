import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../../components/Form";
import { fetchProducts } from "../../../services/getProducts-service";
import { updateProduct } from "../../../services/updateProduct-service";

export default function EditProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const products = await fetchProducts();
        if (!products) {
          throw new Error("Failed to fetch products");
        }
        const productToEdit = products.find(
          (product) => product.id === Number(params.id)
        );
        if (!productToEdit) {
          throw new Error("Product not found");
        }
        setProduct(productToEdit);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductById();
  }, [params.id]);

  const validateForm = (data) => {
    const errors = {};

    if (!data.name || data.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    if (!data.brand || data.brand.length < 3) {
      errors.brand = "Brand must be at least 3 characters long";
    }

    if (!data.price || isNaN(data.price) || parseFloat(data.price) <= 0) {
      errors.price = "Price must be a valid number and greater than 0";
    }

    if (!data.description || data.description.length < 10) {
      errors.description = "Description must be at least 10 characters long";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedProductData = Object.fromEntries(formData.entries());

    const updatedData = {
      name: updatedProductData.name,
      brand: updatedProductData.brand,
      category: updatedProductData.category,
      price: parseFloat(updatedProductData.price),
      description: updatedProductData.description,
      createdAt: product.createdAt,
    };

    const validationErrors = validateForm(updatedData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await updateProduct(params.id, updatedData);
      console.log("Product updated successfully:", updatedData);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductForm
      product={product}
      handleSubmit={handleSubmit}
      isEditMode={true}
      errors={errors}
    />
  );
}
