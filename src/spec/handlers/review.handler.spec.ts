import request from 'supertest';
import app from '../../server';

describe('Review API', () => {
  it('GET /api/v1/reviews/product/1 should return 200', async () => {
    const res = await request(app).get('/api/v1/review/product/1');
    expect(res.status).toBe(200);
  });

  it('POST /api/v1/reviews should create review', async () => {
    const res = await request(app)
      .post('/api/v1/review')
      .send({ user_id: 1, product_id: 1, rating: 4, comment: 'Nice product' });
    expect(res.status).toBe(201);
    expect(res.body.rating).toBe(4);
  });
});
