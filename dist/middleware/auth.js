"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header)
            return res.status(401).json({ error: 'missing auth header' });
        const token = header.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        req.userId = payload.userId;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'invalid token' });
    }
};
exports.requireAuth = requireAuth;
