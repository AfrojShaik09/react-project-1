import productData from "../db.json" with { type: "json" };
import fs from "fs";

const products = productData.products;

export function updateProduct(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  const productIndex = products.findIndex(
    (product) => product.id === Number(id),
  );

  if (productIndex !== -1) {
    const updatedProduct = {
      ...products[productIndex],
      ...updatedData,
    };
    products[productIndex] = updatedProduct;

    try {
      fs.writeFileSync(
        "./db.json",
        JSON.stringify({ ...productData, products }, null, 2),
      );

      res.status(200).send({
        message: "Product updated successfully.",
        updatedProduct,
      });
    } catch (err) {
      res.status(500).send({
        message: "Error updating the product data.",
        error: err.message,
      });
    }
  } else {
    res.status(404).send({ message: "Product not found." });
  }
}
