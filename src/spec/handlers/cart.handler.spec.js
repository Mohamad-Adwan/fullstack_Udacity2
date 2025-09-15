"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/server"));
describe('Cart API', () => {
    it('GET /api/v1/carts should return 200', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/v1/carts');
        expect(res.status).toBe(200);
    });
    it('POST /api/v1/carts should create cart', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/v1/carts')
            .send({ user_id: 1, product_id: 1, quantity: 3 });
        expect(res.status).toBe(201);
        expect(res.body.quantity).toBe(3);
    });
});
