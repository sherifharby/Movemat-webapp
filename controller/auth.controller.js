import User from "../Models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shekoharby23@gmail.com',
        pass: 'SHE343##@HARBY323_..._2002'
    }
})

// router.get('/test', async (req, res) => {
//     res.json({
//         message: "Auth api is working"
//     })
// })

function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}

export const register = async (req, res, next) => {
    console.log(req.body);
    try {
        const { name, email, password} = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json(createResponse(false, 'Email already exists'));
        }
        const newUser = new User({
            name,
            password,
            email
        });
        await newUser.save();

        res.status(201).json(createResponse(true, 'User registered successfully'));

    }
    catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(createResponse(false, 'Invalid credentials'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(createResponse(false, 'Invalid credentials'));
        }

        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '50m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '100m' });

        res.cookie('authToken', authToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.status(200).json(createResponse(true, 'Login successful', {
            authToken,
            refreshToken
        }));
    }
    catch (err) {
        next(err);
    }
};

export const getuserById = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(400).json(createResponse(false, 'Invalid credentials'));
        }
        else{
           return res.status(200).json(createResponse(true, 'userdata', {user}));
        }
    }
    catch (err) {
        next(err);
    }
};

export const sendotp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);

        const mailOptions = {
            from: 'shekoharby23@gmail.com',
            to: email,
            subject: 'OTP for verification',
            text: `Your OTP is ${otp}`
        }

       const info = await transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).json(createResponse(false, err.message));
            } else {
                res.json(createResponse(true, 'OTP sent successfully', { otp }));
                console.log(info);
            }
        });
    }
    catch (err) {
        next(err);
    }
};

// router.post('/checklogin', authTokenHandler, async (req, res, next) => {
//     res.json({
//         ok: true,
//         message: 'User authenticated successfully'
//     })
// })
// router.use(errorHandler)

// module.exports = router;
