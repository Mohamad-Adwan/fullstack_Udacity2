"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../../models/user.model");
let token;
let userId;
describe('Order API', () => {
    it('GET /api/v1/order should return 200', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/v1/order');
        expect(res.status).toBe(200);
    });
    it('POST /api/v1/order should create order', async () => {
        const user = await new user_model_1.UserModel().create({ name: 'Test', email: 'test@example2.com', password_hash: 'hashed' });
        userId = user.id;
        token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/v1/order')
            .set('Authorization', `Bearer ${token}`)
            .send({ user_id: 1, total: '50.00' });
        expect(res.status).toBe(201);
        expect(res.body.total).toBe('50.00');
    });
});
