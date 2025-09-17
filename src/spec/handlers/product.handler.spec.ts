import request from 'supertest';
import app from '../../server';
import { UserModel } from '../../models/user.model';
import jwt from 'jsonwebtoken';
 let token: string;
  let userId: number;
describe('Products API', () => {
  it('GET /api/v1/products should return 200', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.status).toBe(200);
  });

  it('POST /api/v1/products should create product', async () => {
     const user = await new UserModel().create({ name: 'Test', email: 'test@example2.com', password_hash: 'hashed' });
    userId = user.id;
    token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    const res = await request(app).post('/api/v1/products')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'API Test', price: '5.00' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('API Test');
  });
});