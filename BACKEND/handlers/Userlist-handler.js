import userData from "../Userdata.json" assert { type: "json" };
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const users = userData.users;

const activeUsers = [];
const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Username does not exist" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  if (
    !activeUsers.find((u) => u.username === username) &&
    user.role !== "admin"
  ) {
    activeUsers.push({ id: user.id, username: user.username, role: user.role });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1m" }
  );

  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
};

export const getActiveUsers = (req, res) => {
  const nonAdminUsers = activeUsers.filter((user) => user.role !== "admin");
  return res.status(200).json(nonAdminUsers);
};

export const logout = (req, res) => {
  const { username } = req.body;

  const index = activeUsers.findIndex((user) => user.username === username);

  if (index !== -1) {
    activeUsers.splice(index, 1);
  }

  return res
    .status(200)
    .json({ message: "Logged out successfully", activeUsers });
};
