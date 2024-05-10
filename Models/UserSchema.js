import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    goal: {
        type: String,
        required: true,
    },
    activityLevel: {
        type: String,
        requered: true,
    },
    calorieIntake: [
        {
            item: {
                type: String,
                required: false,
            },
            date: {
                type: Date,
                required: false,
            },
            quantity: {
                type: Number,
                required: false,
            },
            quantitytype: {
                type: String,
                required: false,
            },
            calorieIntake: {
                type: Number,
                required: false,
            },

        }
    ],
    workouts: [
        {
            date: {
                type: Date,
                required: false,
            },
            exercise: {
                type: String,
                required: false,
            },
            durationInMinutes: {
                type: Number,
                required: false,
            },
        },
    ]
}, 
{ timestamps: true });


userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});


const User = mongoose.model("User", userSchema);

export default User;