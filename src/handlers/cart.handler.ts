import express from 'express';
import { CartModel } from '../models/cart.model';

const router = express.Router();
const model = new CartModel();

router.get('/', async (req, res) => {
  const carts = await model.list();
  res.json(carts);
});

router.get('/:id', async (req, res) => {
  const cart = await model.findById(Number(req.params.id));
  if (!cart) return res.status(404).json({ error: 'Not found' });
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

export default router;
