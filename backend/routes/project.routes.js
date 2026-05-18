import { Router } from "express";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
  createProject,
  getMyProjects,
  getOpenProjects,
} from "../controllers/project.controller.js";

const router = Router();

router.post("/", protect, authorizeRoles("owner"), createProject);
router.get("/mine", protect, authorizeRoles("owner"), getMyProjects);
router.get("/open", protect, authorizeRoles("investor"), getOpenProjects);

export default router;
