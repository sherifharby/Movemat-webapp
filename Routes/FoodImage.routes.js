import express from "express";
import {upload ,uploadPhoto} from "../../controller/FoodImage.contoller.js";
import errorHandler from "../Middlewares/errorMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single('file'), uploadPhoto);
router.use(errorHandler);

export default router;
