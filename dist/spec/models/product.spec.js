"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../../models/product.model");
describe('ProductModel', () => {
    const model = new product_model_1.ProductModel();
    let created;
    beforeAll(async () => {
        created = await model.create({ name: 'Test Product', price: '10.00' });
        const found = await model.findById(created.id);
        expect(found.name).toBe('Test Product');
    });
    it('creates a product', () => {
        expect(created).toBeDefined();
        expect(created.id).toBeGreaterThan(0);
    });
    // it('updates product', async () => {
    //   const updated = await model.update(created.id, { name: 'Updated' });
    //        console.log(updated);
    //   expect(updated.name).toBe('Updated');
    // });
    it('updates product', async () => {
        const updated = await model.update(created.id, { name: 'Updated' });
        expect(updated?.name).toBe('Updated');
    });
    afterAll(async () => {
        const result = await model.delete(created.id);
        expect(result).toBeTruthy();
    });
    // it('deletes product', async () => {
    // });
});
