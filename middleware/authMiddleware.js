import { decodeToken } from "../auth/index.js";
import { USER_TYPE } from "../models/UserModal.js";
import { sendResponse } from "../utils/helper.js";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return sendResponse(res, 401, "UnAuthorized.");
        const decodedData = decodeToken(token);
        if (!decodedData.success) return sendResponse(res, 401, "UnAuthorized.");
        req.user = { ...decodedData.data, isAdmin: decodedData.data.userType === USER_TYPE.ADMIN };
        next();
    } catch (error) {
        console.log(error)
        return sendResponse(res, 500, "Internal Server Error", error);
    }
}

export const isValidAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if (!user.isAdmin) return sendResponse(res, 401, "You are not allowded to perform this action.");
        next();
    } catch (error) {
        console.log(error)
        return sendResponse(res, 500, "Internal Server Error", error);
    }
}