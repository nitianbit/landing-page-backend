import User from "../models/UserModal.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyJWT(token);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.toJSON()); // Exclude password from response
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
