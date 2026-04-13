import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getAll);
router.get("/:userId", userController.getOne);
router.post("/", userController.create);
router.put("/:userId", userController.update);
router.delete("/:userId", userController.remove);

export default router;