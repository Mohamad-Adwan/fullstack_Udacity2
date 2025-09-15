"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
const model = new user_model_1.UserModel();
router.get('/', async (req, res) => {
    const users = await model.list();
    res.json(users);
});
router.get('/:id', async (req, res) => {
    const user = await model.findById(Number(req.params.id));
    if (!user)
        return res.status(404).json({ error: 'Not found' });
    res.json(user);
});
router.post('/', async (req, res) => {
    const created = await model.create(req.body);
    res.status(201).json(created);
});
router.put('/:id', async (req, res) => {
    const updated = await model.update(Number(req.params.id), req.body);
    res.json(updated);
});
router.delete('/:id', async (req, res) => {
    await model.delete(Number(req.params.id));
    res.status(204).send();
});
exports.default = router;
