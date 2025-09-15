import request from 'supertest';
import app from '../../server';

describe('Products API', () => {
  it('GET /api/v1/products should return 200', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.status).toBe(200);
  });

  it('POST /api/v1/products should create product', async () => {
    const res = await request(app).post('/api/v1/products').send({ name: 'API Test', price: '5.00' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('API Test');
  });
});