import { createToken } from '../auth/index.js';
import User from '../models/UserModal.js'
import { sendResponse } from '../utils/helper.js';
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({
                data: {},
                message: "please fill all required fields",
                status: 400
            })
        }

        const isFirstAccount = (await User.countDocuments()) == 0;
        req.body.role = isFirstAccount ? "admin" : "user";

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                data: {},
                message: 'User already exists',
                status: 400
            });
        }

        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        res.status(201).json({
            data: user,
            message: 'User registered successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, "Invalid Request. Please send all the details.");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(res, 400, "User not found");
        }
        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            return sendResponse(res, 401, "Invalid credentials");
        }
        const token = createToken({ userId: user._id, role: user.role, name: user.name })
        return sendResponse(res, 200, "Login successful", { token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
