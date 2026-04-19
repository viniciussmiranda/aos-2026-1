import { Router } from "express";
import * as tarefaController from "../controllers/tarefaController.js";

const router = Router();

router.get("/", tarefaController.getAll);
router.get("/:objectId", tarefaController.getOne);
router.post("/", tarefaController.create);
router.put("/:objectId", tarefaController.update);
router.delete("/:objectId", tarefaController.remove);

export default router;