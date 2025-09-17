import request from 'supertest';
import pool from '../../db';
import jwt from 'jsonwebtoken';
import app from '../../server';



const SECRET = process.env.JWT_SECRET || 'secretkey';
const testToken = jwt.sign({ id: 1, email: 'test@example.com', role: 'admin' }, SECRET, { expiresIn: '1h' });

describe('User API with Auth Middleware', () => {
  let userId: number;

  beforeAll(async () => {
  
    await pool.query('DELETE FROM users WHERE email = $1', ['test500@example.com']);
    const res = await request(app)
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${testToken}`) 
      .send({ email: 'test500@example.com', password_hash: 'hashedpassword', name: 'Test User', role: 'admin' });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe('test@example.com');
    userId = res.body.id;
  });

//   it('POST /api/users should create a user', async () => {
    
//   });

  it('GET /api/users should list users', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${testToken}`); 
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
  });

  it('GET /api/users/:id should get user by id', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${testToken}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  it('PUT /api/users/:id should update user', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send({ name: 'Updated Name' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Name');
  });

//   it('DELETE /api/users/:id should delete user', async () => {
//     const res = await request(app)
//       .delete(`/api/v1/users/${userId}`);
//     expect(res.status).toBe(204);
//   });

  it('GET /api/users without token should return 401', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.status).toBe(401);
  });
});
