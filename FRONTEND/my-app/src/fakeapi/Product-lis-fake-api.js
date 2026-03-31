import productData from "../Data/db.json";

let products = productData.products;

export function getProducts() {
  return products;
}

export function addProduct(newProduct) {
  products.push(newProduct);
  return products;
}

export function updateProduct(updatedProduct) {
  const index = products.findIndex((p) => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
  }
  return products;
}

export function deleteProduct(productId) {
  const index = products.findIndex((p) => p.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
  }
  return products;
}
