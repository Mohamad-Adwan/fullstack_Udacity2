import express from 'express';
import { OrderModel } from '../models/order.model';
import { authMiddleware } from './auth.handler'; 

const router = express.Router();
const model = new OrderModel();

router.get('/', async (req, res) => {
  const orders = await model.list();
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await model.findById(Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
});

router.post('/',authMiddleware, async (req, res) => {
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
