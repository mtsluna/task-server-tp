import { Router } from "express";
import injections from "../../injections/Injections";
require('express-async-errors');

const router: Router = Router();

router.get("", injections.middlewares.auth, injections.handlers.task.get)
router.get("/:id", injections.handlers.task.getOne)
router.get("/search/struct", injections.handlers.task.getSearchStruct)
router.post("", injections.handlers.task.post)
router.put("/:id", injections.handlers.task.put)
router.delete("/:id", injections.handlers.task.delete)

export default router;
