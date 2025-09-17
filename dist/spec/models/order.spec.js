"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../../models/order.model");
describe('OrderModel', () => {
    const model = new order_model_1.OrderModel();
    let created;
    beforeAll(async () => {
        created = await model.create({ user_id: 1, total: 100.00 });
    });
    //   it('creates an order', async () => {
    //   });
    it('finds order by id', async () => {
        const found = await model.findById(created.id);
        expect(found.id).toBe(created.id);
    });
    it('updates order', async () => {
        const updated = await model.update(created.id, { status: 'paid' });
        expect(updated.status).toBe('paid');
    });
    afterAll(async () => {
        const result = await model.delete(created.id);
        expect(result).toBeTruthy();
    });
    //   it('deletes order', async () => {
    //   });
});
