import { createToken } from '../auth/index.js';
import { checkorCreateCompany } from '../dao/company.js';
import User from '../models/UserModal.js'
import { sendResponse } from '../utils/helper.js';
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {

    try {
        const { companyName, websiteURL, name, email, password } = req.body;

        if (!companyName || !websiteURL || !email || !password || !name) {
            return sendResponse(res, 400, "Invalid Request. Please send all the details.");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return sendResponse(res, 400, "User already exists");
        }

        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;

        const companyId = await checkorCreateCompany(websiteURL, companyName)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            adminOf: companyId,
        });

        const user = await newUser.save();
        sendResponse(res, 201, "User registered successfully");
    } catch (error) {
        console.error(error);
        sendResponse(res, 500, "Internal server erro");
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, "Invalid Request. Please send all the details.");
        }
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return sendResponse(res, 400, "User not found");
        }
        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            return sendResponse(res, 401, "Invalid credentials");
        }
        const token = createToken(user)
        return sendResponse(res, 200, "Login successful", { token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCurrentProfile = async (req, res) => {
    try {
        const user = req.user
        return sendResponse(res, 200, "", user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
