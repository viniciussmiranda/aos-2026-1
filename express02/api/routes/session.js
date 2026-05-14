import { Router } from "express";
import { sessionController } from "../controllers";
import { authenticate } from "../middleware";

const router = Router();

router.get("/", authenticate, sessionController.getSession);
router.post("/login", sessionController.login);
router.post("/logout", sessionController.logout);
router.post("/refresh", sessionController.refresh);

export default router;
