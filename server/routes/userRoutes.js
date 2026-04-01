import express from "express"
import { signupUser, loginUser, dashboard } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.post("/signup", signupUser)
router.post("/login", loginUser)
router.get("/admin", auth, isAdmin, dashboard)
router.get("/user", auth, isAdmin, dashboard)

export default router