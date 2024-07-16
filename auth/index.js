import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'
import { CONFIG } from '../utils/config.js';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


export const createToken = (data) => jwt.sign(data, CONFIG.JWT_SECRET, { expiresIn: CONFIG.JWT_EXPIRY });

export const decodeToken = (token) => {
    try {
        const decodedData = jwt.verify(token, CONFIG.JWT_SECRET);
        return { success: true, status: 200, data: decodedData };
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return { success: false, message: 'JWT Malformed', status: 401 };
        } else if (error.name === 'TokenExpiredError') {
            return { success: false, message: 'JWT Expired', status: 401 };
        }
        return { success: false, message: 'JWT Verification Failed', status: 401 };
    }
}


export const encryptPassword = (password) => bcrypt.hashSync(password, salt);
export const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);



