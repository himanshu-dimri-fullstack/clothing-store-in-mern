import express from "express"
import { signupUser, loginUser, logoutUser, dashboard, getUsers, verifyEmailForSignUp, verifySignupOTP } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/admin", auth, isAdmin, dashboard)
router.get("/users", auth, isAdmin, getUsers)
router.get("/check-user", auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});
router.post("/signup-verify-email", verifyEmailForSignUp)
router.post("/signup-verify-otp", verifySignupOTP)

export default router