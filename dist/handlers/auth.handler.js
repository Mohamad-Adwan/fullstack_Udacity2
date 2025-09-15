"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
const userModel = new user_model_1.UserModel();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
// Register
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    const hashed = await bcrypt_1.default.hash(password, 10);
    const user = await userModel.create({ email, password_hash: hashed, name });
    res.status(201).json(user);
});
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt_1.default.compare(password, user.password_hash);
    if (!valid)
        return res.status(401).json({ error: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});
// Middleware to protect routes
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
router.get('/me', authMiddleware, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    });
});
exports.default = router;
