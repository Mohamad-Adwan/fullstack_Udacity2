import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './handlers/auth.handler';
import productRouter from './handlers/product.handler';
import cartRouter from './handlers/cart.handler';
import cartItemRouter from './handlers/cartItem.handler';
import categoryRouter from './handlers/category.handler';
import orderRouter from './handlers/order.handler';
import reviewRouter from './handlers/review.handler';
import userRouter from './handlers/user.handler';

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/cartItem', cartItemRouter);
app.use('/api/v1/categorie', categoryRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') app.listen(port, () => console.log(`Server listening on ${port}`));

export default app;