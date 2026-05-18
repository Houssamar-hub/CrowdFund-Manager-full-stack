import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import investmentRoutes from "./routes/investment.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();
const app = express();
app.use(express.json());

const test = (req, res, next) => {
  // res.json({ message: "hello houssam" });
  req.name = "houssam";
  next();
};

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;
