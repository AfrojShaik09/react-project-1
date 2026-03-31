import productData from "../db.json" assert { type: "json" };

const products = productData.products;

export function searchProductsByName(req, res) {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .send({ message: "Name query parameter is required." });
  }

  
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );

  if (filteredProducts.length > 0) {
    res.status(200).send(filteredProducts);
  } else {
    res.status(404).send({ message: "No products found matching the name." });
  }
}
