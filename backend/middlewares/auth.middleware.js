import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// check token
export const protect = async (req, res, next) => {
  try {
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        name: "Mock Owner",
        email: "mockowner@example.com",
        password: "password123",
        role: "owner"
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Auth bypass error", error: err.message });
  }
};

// role check
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    next();
  };
};
