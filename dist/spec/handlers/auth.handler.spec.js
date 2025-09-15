"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const db_1 = __importDefault(require("../../db"));
const user_model_1 = require("../../models/user.model");
describe('User API', () => {
    const userModel = new user_model_1.UserModel();
    let testUserId;
    let token;
    const testUser = {
        email: 'testuser@example.com',
        password: 'password123',
        name: 'Test User'
    };
    beforeAll(async () => {
        await db_1.default.query('DELETE FROM users WHERE email = $1', ['testuser@example.com']);
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send(testUser);
        expect(res.status).toBe(201);
        expect(res.body.email).toBe(testUser.email);
        testUserId = res.body.id;
        const loginRes = await (0, supertest_1.default)(server_1.default)
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
        const res = await (0, supertest_1.default)(server_1.default)
            .get('/api/v1/auth/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.email).toBe(testUser.email);
    });
    it('Protected route should fail without token', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/v1/auth/me');
        expect(res.status).toBe(401);
    });
});
