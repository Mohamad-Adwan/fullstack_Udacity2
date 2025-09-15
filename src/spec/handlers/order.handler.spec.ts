import request from 'supertest';
import app from '../../server';

describe('Order API', () => {
  it('GET /api/v1/order should return 200', async () => {
    const res = await request(app).get('/api/v1/order');
    expect(res.status).toBe(200);
  });

  it('POST /api/v1/order should create order', async () => {
    const res = await request(app)
      .post('/api/v1/order')
      .send({ user_id: 1, total: '50.00' });
    expect(res.status).toBe(201);
    expect(res.body.total).toBe('50.00');
  });
});
