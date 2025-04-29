"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    // Expect header: Authorization: Bearer <token>
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json('No token provided');
        return;
    }
    try {
        const jwtKey = process.env.JWT_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, jwtKey);
        // Attach user ID to the request
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json('Invalid or expired token');
        return;
    }
}
