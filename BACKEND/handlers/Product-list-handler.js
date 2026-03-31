import productData from "../db.json" assert { type: "json" };

const products = productData.products;

export function getProducts(req, res) {
  const productList = products;
  res.send(productList);
}
