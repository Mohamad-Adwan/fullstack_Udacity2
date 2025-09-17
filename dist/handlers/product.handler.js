"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_model_1 = require("../models/product.model");
const auth_handler_1 = require("./auth.handler");
const router = express_1.default.Router();
const model = new product_model_1.ProductModel();
router.get('/', async (req, res) => {
    const products = await model.list(req.query);
    res.json(products);
});
router.get('/:id', async (req, res) => {
    const product = await model.findById(Number(req.params.id));
    if (!product)
        return res.status(404).json({ error: 'Not found' });
    res.json(product);
});
router.post('/', auth_handler_1.authMiddleware, async (req, res) => {
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
