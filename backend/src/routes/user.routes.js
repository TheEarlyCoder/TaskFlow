import {getCurrentUser, loginUser, logoutUser, registerUser} from "../controllers/user.controller.js"
import { Router } from "express"
import authorizeUser from "../middleware/auth.middleware.js";

const router = Router()

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", authorizeUser ,getCurrentUser);
router.post("/logout", authorizeUser, logoutUser);

export default router;