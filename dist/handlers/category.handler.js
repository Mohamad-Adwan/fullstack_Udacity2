"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_model_1 = require("../models/category.model");
const router = express_1.default.Router();
const model = new category_model_1.CategoryModel();
router.get('/', async (req, res) => {
    const categories = await model.list();
    res.json(categories);
});
router.get('/:id', async (req, res) => {
    const category = await model.findById(Number(req.params.id));
    if (!category)
        return res.status(404).json({ error: 'Not found' });
    res.json(category);
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
