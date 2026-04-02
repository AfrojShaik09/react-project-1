import express from "express";
import { getProducts } from "./handlers/Product-list-handler.js";
import { productCreate } from "./handlers/CreateProduct-handler.js";
import bodyParser from "body-parser";
import { deleteProduct } from "./handlers/DeleteProduct-handler.js";
import { updateProduct } from "./handlers/UpdateProduct-handler.js";
import { searchProductsByName } from "./handlers/SearchProduct-handler.js";
import { getActiveUsers, login, logout } from "./handlers/Userlist-handler.js";
import cors from "cors";

//import dotenv from "dotenv";
//import mongoose from "mongoose"; // ✅ FIXED require → import

//dotenv.config();

const app = express();

// ✅ MongoDB Connection (ESM compatible)
//mongoose
//.connect(process.env.MONGO_URI)
//.then(() => {
//console.log("MongoDB Connected ✅");
//})
//.catch((err) => {
//console.log("Error connecting DB ❌", err);
// });

const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.get("/api/products", getProducts);
app.post("/api/products", productCreate);
app.delete("/api/products/:id", deleteProduct);
app.put("/api/products/:id", updateProduct);
app.get("/api/products/searchByName", searchProductsByName);

app.post("/api/login", login);
app.get("/api/getActiveUsers", getActiveUsers);
app.post("/api/logout", logout);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
