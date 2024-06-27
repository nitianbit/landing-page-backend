import User from '../models/UserModal.js'
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
        const { email, password, type = "user" } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                data: {},
                message: 'Invalid credentials',
                status: 400
            });
        }

        // const type = req?.headers?.["x-api-key"];

        if (type === "web" && user?.role != "admin") {
            return res.status(401).json({
                data: {},
                message: 'Unauthorized User',
                status: 401
            });
        }
        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            return res.json({
                data: {},
                message: 'Invalid credentials',
                status: 400
            });
        }

        const token = createJWT({ userId: user._id, role: user.role, name: user.name });

        res.json({
            data: {
                token,
                user
            },
            message: "login successfully",
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
