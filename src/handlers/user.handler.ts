import express from 'express';
import { UserModel } from '../models/user.model';

const router = express.Router();
const model = new UserModel();

router.get('/', async (req, res) => {
  const users = await model.list();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await model.findById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
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