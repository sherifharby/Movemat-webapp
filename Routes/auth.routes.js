import express from "express";
import {register, login, getuserById, sendotp} from "../../controller/auth.controller.js";
import authTokenHandler from "../Middlewares/checkAuthToken.js";
import errorHandler from "../Middlewares/errorMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/getuserById",authTokenHandler , getuserById);
router.post("/sendotp",sendotp);
router.use(errorHandler)



export default router;
