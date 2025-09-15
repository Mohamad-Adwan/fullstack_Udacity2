"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_model_1 = require("../models/cart.model");
const router = express_1.default.Router();
const model = new cart_model_1.CartModel();
router.get('/', async (req, res) => {
    const carts = await model.list();
    res.json(carts);
});
router.get('/:id', async (req, res) => {
    const cart = await model.findById(Number(req.params.id));
    if (!cart)
        return res.status(404).json({ error: 'Not found' });
    res.json(cart);
});
router.post('/', async (req, res) => {
    const created = await model.create(req.body.user_id);
    res.status(201).json(created);
});
router.put('/:id', async (req, res) => {
    const updated = await model.update(Number(req.params.id), {
        checked_out: req.body.checked_out
    });
    res.json(updated);
});
router.delete('/:id', async (req, res) => {
    await model.delete(Number(req.params.id));
    res.status(204).send();
});
exports.default = router;
