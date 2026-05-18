import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  console.log(req.name);
  const { name, email, password, role } = req.body;
  // if (!name || !email || !password)
  //   return res.status(400).json({ message: "All fields required" });

  // const existingUser = await User.findOne({ email });
  // if (existingUser)
  //   return res.status(400).json({ message: "User already exists" });

  let userRole = "investor";
  if (role === "admin" && req.body.adminSecret === "1234") userRole = "admin";
  if (role === "owner") userRole = "owner";

  const user = await User.create({ name, email, password, role: userRole });
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  res.json({ token, role: user.role });
};
