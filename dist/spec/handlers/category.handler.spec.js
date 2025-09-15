"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe('Category API', () => {
    it('GET /api/v1/categorie should return 200', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/v1/categorie');
        expect(res.status).toBe(200);
    });
    it('POST /api/v1/categorie should create category', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/v1/categorie')
            .send({ name: 'Books', description: 'Reading stuff', slug: "books" });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Books');
    });
});
