import request from 'supertest';
import app from '../../server'; 
import db from "../../db";

import { UserModel } from '../../models/user.model';

describe('User API', () => {
  const userModel = new UserModel();
  let testUserId: number;
  let token: string;
  const testUser = {
    email: 'testuser@example.com',
    password: 'password123',
    name: 'Test User'
  };

  beforeAll(async () => {
    await db.query('DELETE FROM users WHERE email = $1', ['testuser@example.com']);

   
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(testUser.email);
    testUserId = res.body.id;

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.token).toBeDefined();
    token = loginRes.body.token;
  });

  afterAll(async () => {
    if (testUserId) {
      await userModel.delete(testUserId);
    }
  });

  it('Protected route should work with valid token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(testUser.email);
  });

  it('Protected route should fail without token', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
  });
});
