import { Router } from "express";
import * as tarefaController from "../controllers/tarefaController.js";

const router = Router();

router.get("/", tarefaController.getAll);
router.get("/:tarefaId", tarefaController.getOne);
router.post("/", tarefaController.create);
router.put("/:tarefaId", tarefaController.update);
router.delete("/:tarefaId", tarefaController.remove);

export default router;