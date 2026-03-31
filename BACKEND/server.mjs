import express from "express";
import { getProducts } from "./handlers/Product-list-handler.js";
import { productCreate } from "./handlers/CreateProduct-handler.js";
import bodyParser from "body-parser";
import { deleteProduct } from "./handlers/DeleteProduct-handler.js";
import { updateProduct } from "./handlers/UpdateProduct-handler.js";
import { searchProductsByName } from "./handlers/SearchProduct-handler.js";
import { getActiveUsers, login, logout } from "./handlers/Userlist-handler.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.get("/api/products", getProducts);

app.post("/api/products", productCreate);

app.delete("/api/products/:id", deleteProduct);

app.put("/api/products/:id", updateProduct);

app.get("/api/products/searchByName", searchProductsByName);

app.post("/api/login", login);

app.get("/api/getActiveUsers", getActiveUsers);

app.post("/api/logout", logout);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
