import request from 'supertest';
import app from '../../server';

describe('Cart API', () => {
  it('GET /api/v1/cart should return 200', async () => {
    const res = await request(app).get('/api/v1/cart');
    expect(res.status).toBe(200);
  });

  it('POST /api/v1/cart should create cart', async () => {
    const res = await request(app)
      .post('/api/v1/cart')
      .send({ user_id: 1 });
    expect(res.status).toBe(201);
    expect(res.body.user_id).toBe(1);
    expect(res.body.checked_out).toBe('active'); // ⚠️ هنا عدلنا القيمة
  });
});
