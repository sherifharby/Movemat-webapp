import Workout from "../Models/WorkoutSchema.js";


function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}

// add workout name, description, durationInMinutes, exercises, imageUR
export const addworkouts = async (req, res) => {
    try {

        const { name, description, durationInMinutes, exercises, imageURL } = req.body;
        const workout = new Workout({ name, description, durationInMinutes, exercises, imageURL, });
        await workout.save();
        res.json(createResponse(true, 'Workout created successfully', workout));
    } catch (err) {
        res.json(createResponse(false, err.message));
    }
};

// find all workouts
export const workouts = async (req, res) => {
    try {
        const workouts = await Workout.find({});  
        res.json(createResponse(true, 'Workouts fetched successfully', workouts));
    } catch (err) {
        res.json(createResponse(false, err.message));
    }
};

// find any workout by its id
export const workoutsById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        res.json(createResponse(true, 'Workout fetched successfully', workout));
    } catch (err) {
        res.json(createResponse(false, err.message));
    }
};
