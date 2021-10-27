import { Router } from "express";
import injections from "../../injections/Injections";
require('express-async-errors');

const router: Router = Router();

router.post("/login", injections.handlers.auth.login)
router.post("/refresh", injections.handlers.auth.refresh)
router.post("/register", injections.handlers.auth.register)

export default router;
