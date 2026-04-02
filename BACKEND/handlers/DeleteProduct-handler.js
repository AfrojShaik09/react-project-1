import productData from "../db.json" with { type: "json" };
import fs from "fs";

export function deleteProduct(req, res) {
  const { id } = req.params;
  let products = productData.products;

  const productIndex = products.findIndex(
    (product) => product.id === Number(id),
  );

  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1)[0];

    const updatedProducts = products.map((product, index) => ({
      ...product,
      id: index + 1,
    }));

    try {
      fs.writeFileSync(
        "./db.json",
        JSON.stringify({ ...productData, products: updatedProducts }, null, 2),
      );

      res.status(200).send({
        message: "Product deleted successfully.",
        deletedProduct,
        updatedProducts,
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
