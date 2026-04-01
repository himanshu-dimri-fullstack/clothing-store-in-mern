import express from "express"
import { signupUser, loginUser, adminDashboard } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.post("/signup", signupUser)
router.post("/login", loginUser)
router.get("/admin", auth, isAdmin, adminDashboard)

export default router