import express from "express";
import authController from "../../controllers/auth-controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = express.Router();

router.post("/register", authController.signup);

router.post("/login", authController.signin);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch("/", authenticate, authController.updateStatusUser);

export default router;
