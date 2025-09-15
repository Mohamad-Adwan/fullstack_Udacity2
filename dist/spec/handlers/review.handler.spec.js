"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe('Review API', () => {
    it('GET /api/v1/reviews/product/1 should return 200', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/v1/review/product/1');
        expect(res.status).toBe(200);
    });
    it('POST /api/v1/reviews should create review', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/v1/review')
            .send({ user_id: 1, product_id: 1, rating: 4, comment: 'Nice product' });
        expect(res.status).toBe(201);
        expect(res.body.rating).toBe(4);
    });
});
