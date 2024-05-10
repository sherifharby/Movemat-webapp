import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import db from './db.js';
import authRoutes from "./Routes/auth.routes.js";
import UserProfile from "./Routes/UserProfile.routes.js";
import adminRoutes from "./Routes/admin.routes.js";
import UploadeFoodImagetoApi from "./Routes/FoodImage.routes.js";
import UploadeBodyImagetoApi from "./Routes/BodyImage.routes.js";
// import imageUploadRoutes from "./Routes/imageUploadRoutes.js";
import workoutRoutes from "./Routes/WorkoutPlans.routes.js";

dotenv.config();
db();

const app = express();
const PORT = 8000;



app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000'];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);
app.use(cookieParser());


app.use('/auth', authRoutes);
app.use('/user-profile', UserProfile);
app.use('/admin', adminRoutes);
app.use('/upload-foodimage-api', UploadeFoodImagetoApi);
app.use('/upload-bodyimage-api', UploadeBodyImagetoApi);
// app.use('/image-upload', imageUploadRoutes);
app.use('/workoutplans', workoutRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'The API is working' });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

