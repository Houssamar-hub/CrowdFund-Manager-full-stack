import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
import {authValidationSingeup , emailValidation} from "../middlewares/authValidation.middleware.js"

const router = Router();
router.post("/signup", authValidationSingeup , emailValidation , signup);
router.post("/login", login);

export default router;
