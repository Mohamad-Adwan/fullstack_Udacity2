"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const user_model_1 = require("../../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let token;
let userId;
describe('Products API', () => {
    it('GET /api/v1/products should return 200', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/v1/products');
        expect(res.status).toBe(200);
    });
    it('POST /api/v1/products should create product', async () => {
        const user = await new user_model_1.UserModel().create({ name: 'Test', email: 'test@example2.com', password_hash: 'hashed' });
        userId = user.id;
        token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        const res = await (0, supertest_1.default)(server_1.default).post('/api/v1/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'API Test', price: '5.00' });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('API Test');
    });
});
