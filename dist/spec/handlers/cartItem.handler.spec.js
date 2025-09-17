"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe('Cart Items API', () => {
    let cartId;
    let itemId;
    beforeAll(async () => {
        const cartRes = await (0, supertest_1.default)(server_1.default)
            .post('/api/v1/cart')
            .send({ user_id: 1 });
        cartId = cartRes.body.id;
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/v1/cartItem')
            .send({
            cart_id: cartId,
            product_id: 1,
            quantity: 3,
            unit_price: '10.00'
        });
        itemId = res.body.id;
    });
    it('GET /api/v1/cartItem/cart/:cart_id should return 200', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(`/api/v1/cartItem/cart/${cartId}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    // it('POST /api/v1/cartItem should create a cart item', async () => {
    //   expect(res.status).toBe(201);
    //   expect(res.body.quantity).toBe(3);
    //   expect(res.body.unit_price).toBe('10.00');
    // });
    it('GET /api/v1/cartItem/:id should get the created item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(`/api/v1/cartItem/${itemId}`);
        console.log('Created item:', res.body);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(itemId);
    });
    it('PUT /api/v1/cartItem/:id should update the cart item', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .put(`/api/v1/cartItem/${itemId}`)
            .send({ quantity: 5 });
        expect(res.status).toBe(200);
        expect(res.body.quantity).toBe(5);
    });
    afterAll(async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/v1/cartItem/${itemId}`);
        expect(res.status).toBe(204);
    });
});
