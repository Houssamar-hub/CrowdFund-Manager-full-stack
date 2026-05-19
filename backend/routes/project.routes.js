import { Router } from "express";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
  createProject,
  getMyProjects,
  getOpenProjects,
  getProjectById,
  updateProject,
  deleteProject,
  closeProject,
} from "../controllers/project.controller.js";

const router = Router();

router.post("/", protect, authorizeRoles("owner"), createProject);
router.get("/mine", protect, authorizeRoles("owner"), getMyProjects);
router.get("/open", protect, authorizeRoles("investor"), getOpenProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, authorizeRoles("owner"), updateProject);
router.delete("/:id", protect, authorizeRoles("owner"), deleteProject);
router.patch("/:id/close", protect, authorizeRoles("owner"), closeProject);

export default router;
