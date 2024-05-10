import express from 'express';
import {quiz} from "../../controller/UserProfile.controller.js";
import authTokenHandler from "../Middlewares/checkAuthToken.js";
import errorHandler from "../Middlewares/errorMiddleware.js";

const router = express.Router();

router.put("/quiz", authTokenHandler, quiz);
router.use(errorHandler)

export default router;
