import request from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/user.model';
import pool from '../../db';

 let token: string;
  let userId: number;
describe('Order API', () => {
  it('GET /api/v1/order should return 200', async () => {
    const res = await request(app).get('/api/v1/order');
    expect(res.status).toBe(200);
  });

  it('POST /api/v1/order should create order', async () => {
        await pool.query('DELETE FROM users WHERE email = $1', ['test@example2.com']);

    const user = await new UserModel().create({ name: 'Test', email: 'test@example2.com', password_hash: 'hashed' });
        userId = user.id;
        token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    const res = await request(app)
      .post('/api/v1/order')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: 1, total: '50.00' });
    expect(res.status).toBe(201);
    expect(res.body.total).toBe('50.00');
  });
});
