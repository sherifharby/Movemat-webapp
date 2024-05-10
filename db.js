import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const db = async () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName: process.env.DB_NAME
    }).then(
        () => {
            console.log('Connected to database');
        }
    ).catch((err) => {
        console.log('Error connecting to database ' + err);
    })
}
export default db;