import express from 'express';
import {register, login} from "../controller/admin.controller.js";
import errorHandler from "../Middlewares/errorMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.use(errorHandler)

export default router;
