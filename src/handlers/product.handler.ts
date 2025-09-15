import express from 'express';
import { ProductModel } from '../models/product.model';


const router = express.Router();
const model = new ProductModel();


router.get('/', async (req, res) => {
const products = await model.list(req.query);
res.json(products);
});


router.get('/:id', async (req, res) => {
const product = await model.findById(Number(req.params.id));
if (!product) return res.status(404).json({ error: 'Not found' });
res.json(product);
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


export default router;