"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartItem_model_1 = require("../models/cartItem.model");
const router = express_1.default.Router();
const model = new cartItem_model_1.CartItemModel();
// Get all items for a specific cart
router.get('/cart/:cart_id', async (req, res) => {
    const cartId = Number(req.params.cart_id);
    if (isNaN(cartId))
        return res.status(400).json({ error: 'Invalid cart_id' });
    const items = await model.list(cartId);
    res.json(items);
});
// Get a single cart item by id
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid id' });
    const item = await model.findById(id);
    if (!item)
        return res.status(404).json({ error: 'Cart item not found' });
    res.json(item);
});
// Update a cart item
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid id' });
    const fields = req.body;
    if (!fields || Object.keys(fields).length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }
    const updated = await model.update(id, fields);
    if (!updated)
        return res.status(404).json({ error: 'Cart item not found' });
    res.json(updated);
});
// Create a new cart item
router.post('/', async (req, res) => {
    const { cart_id, product_id, quantity, unit_price } = req.body;
    if (!cart_id || isNaN(Number(cart_id))) {
        return res.status(400).json({ error: 'cart_id is required and must be a number' });
    }
    const created = await model.create({
        cart_id: Number(cart_id),
        product_id,
        quantity,
        unit_price
    });
    res.status(201).json(created);
});
// Update a cart item
// Delete a cart item
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid id' });
    await model.delete(id);
    res.status(204).send();
});
exports.default = router;
