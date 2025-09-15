import request from 'supertest';
import app from '../../server';

describe('Category API', () => {
  it('GET /api/v1/categorie should return 200', async () => {
    const res = await request(app).get('/api/v1/categorie');
    expect(res.status).toBe(200);
  });

  it('POST /api/v1/categorie should create category', async () => {
    const res = await request(app)
      .post('/api/v1/categorie')
      .send({ name: 'Books', description: 'Reading stuff',slug:"books" });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Books');
  });
});
