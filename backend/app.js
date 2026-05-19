import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import investmentRoutes from "./routes/investment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

const test = (req, res, next) => {
  // res.json({ message: "hello houssam" });
  req.name = "houssam";
  next();
};

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/investments", investmentRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;
