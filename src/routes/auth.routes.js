import { Router } from "express";
import { getProfile, getVerifyToken, postLogin, postLogout, postRegister } from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.post("/register", postRegister)
router.post("/login", postLogin)
router.post("/logout", postLogout)
// For test only
router.get("/profile", validateToken, getProfile)
router.get("/verify-token", getVerifyToken)
//
export default router;