import { Router } from "express";
import * as messageController from "../controllers/messageController.js";

const router = Router();

router.get("/", messageController.getAll);
router.get("/:messageId", messageController.getOne);
router.post("/", messageController.create);
router.put("/:messageId", messageController.update);
router.delete("/:messageId", messageController.remove);

export default router;