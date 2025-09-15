// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const supertest_1 = __importDefault(require("supertest"));
// const server_1 = __importDefault(require("../../src/server"));
// describe('Order API', () => {
//     it('GET /api/v1/orders should return 200', async () => {
//         const res = await (0, supertest_1.default)(server_1.default).get('/api/v1/orders');
//         expect(res.status).toBe(200);
//     });
//     it('POST /api/v1/orders should create order', async () => {
//         const res = await (0, supertest_1.default)(server_1.default)
//             .post('/api/v1/orders')
//             .send({ user_id: 1, total_price: '50.00' });
//         expect(res.status).toBe(201);
//         expect(res.body.total_price).toBe('50.00');
//     });
// });
