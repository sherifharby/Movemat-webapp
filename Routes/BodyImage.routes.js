import express from "express";
import {upload ,uploadPhoto} from "../controller/BodyImage.controller.js";
import errorHandler from "../Middlewares/errorMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single('file'), uploadPhoto);
router.use(errorHandler);

export default router;
