import errorMiddleware from "../../interface/middlewares/error.middleware";
const express = require("express");
require('express-async-errors');

import taskRouter from "./task.router";
import authRouter from "./auth.router";

const router = express.Router();

router.use("/task", taskRouter);
router.use("/auth", authRouter);

router.use(errorMiddleware)

export default router;
