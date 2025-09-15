import express from 'express';
import { CategoryModel } from '../models/category.model';

const router = express.Router();
const model = new CategoryModel();

router.get('/', async (req, res) => {
  const categories = await model.list();
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  const category = await model.findById(Number(req.params.id));
  if (!category) return res.status(404).json({ error: 'Not found' });
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

export default router;
