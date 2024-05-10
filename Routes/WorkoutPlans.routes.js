import express from 'express';
import {addworkouts, workouts, workoutsById} from "../../controller/WorkoutPlans.controller.js";
import errorHandler from "../Middlewares/errorMiddleware.js";

const router = express.Router();

router.post("/addworkouts", addworkouts);// add workout name, description, durationInMinutes, exercises, imageUR
router.get("/workouts", workouts);// find all workouts
router.get("/workouts/:id", workoutsById);// find any workout by its id
router.use(errorHandler)

export default router;
