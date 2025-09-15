import express from 'express';
import { ReviewModel } from '../models/review.model';

const router = express.Router();
const model = new ReviewModel();

router.get('/product/:product_id', async (req, res) => {
  const reviews = await model.listByProduct(Number(req.params.product_id));
  res.json(reviews);
});

router.get('/:id', async (req, res) => {
  const review = await model.findById(Number(req.params.id));
  if (!review) return res.status(404).json({ error: 'Not found' });
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

export default router;
