import productData from "../db.json" with { type: "json" };
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

const saveProductsToDatabase = () => {
  fs.writeFileSync(dbPath, JSON.stringify(productData, null, 2), "utf-8");
};

export const createProduct = (newProduct) => {
  const { name, brand, category, price, description, imageFilename } =
    newProduct;

  if (!name || !brand || !category || !price || !description) {
    throw new Error("All fields are required");
  }

  const product = {
    id: productData.products.length + 1,
    name,
    brand,
    category,
    price,
    description,
    createdAt: new Date().toISOString(),
  };

  productData.products.push(product);

  saveProductsToDatabase();

  return product;
};

export const productCreate = (req, res) => {
  try {
    const newProduct = req.body;
    const createdProduct = createProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
