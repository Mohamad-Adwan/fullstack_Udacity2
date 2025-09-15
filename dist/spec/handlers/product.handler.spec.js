"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe('Products API', () => {
    it('GET /api/v1/products should return 200', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/v1/products');
        expect(res.status).toBe(200);
    });
    it('POST /api/v1/products should create product', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/v1/products').send({ name: 'API Test', price: '5.00' });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('API Test');
    });
});
