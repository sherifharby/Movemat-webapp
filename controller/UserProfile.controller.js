import User from "../Models/UserSchema.js";

function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}

export const quiz = async (req, res, next) => {
    // console.log(req.body);
    try {
        const userId = req.userId;
        let user = await User.findById({_id : userId});
        if (!user) {
            return res.status(400).json(createResponse(false, 'Invalid credentials'));
        }
        const { gender, dob, goal, activityLevel} = req.body;
        user = await User.findOneAndUpdate({
                gender,
                dob,
                goal,
                activityLevel
            });
            // 22222222222222222222222222222222222222
            // user.gender = gender;
            // user.dob = dob;
            // user.goal = goal;
            // user.activityLevel = activityLevel;
            // 222222222222222222222222222222222222222
        await user.save();

        res.status(201).json(createResponse(true, 'data saved successfully', {user}));
       
    }
    catch (err) {
        next(err);
    }
};
