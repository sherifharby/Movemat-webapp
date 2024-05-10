import mongoose from "mongoose";
import bcrypt from "bcrypt";


const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    durationInMinutes: {
        type: Number,
        required: true,
    },
    exercises: [
        {
            name: {
                type: String,
                required: false,
            },
            description: {
                type: String, 
                required: false,
            },
            sets: {
                type: Number,
                required: false,
            },
            reps: {
                type: Number,
                required: false,
            },
            imageURL: {
                type: String,
                required: false,
            },
        }
    ],
    imageURL: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
})


const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;