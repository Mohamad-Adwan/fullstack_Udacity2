"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_model_1 = require("../models/review.model");
const router = express_1.default.Router();
const model = new review_model_1.ReviewModel();
router.get('/product/:product_id', async (req, res) => {
    const reviews = await model.listByProduct(Number(req.params.product_id));
    res.json(reviews);
});
router.get('/:id', async (req, res) => {
    const review = await model.findById(Number(req.params.id));
    if (!review)
        return res.status(404).json({ error: 'Not found' });
    res.json(review);
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
