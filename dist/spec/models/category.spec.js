"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = require("../../models/category.model");
const db_1 = __importDefault(require("../../db"));
describe('CategoryModel', () => {
    const model = new category_model_1.CategoryModel();
    let created;
    beforeAll(async () => {
        await db_1.default.query('DELETE FROM categories WHERE name = $1', ['Electronics']);
        await db_1.default.query('DELETE FROM categories WHERE name = $1', ['Books']);
        created = await model.create({ name: 'Electronics', description: 'Gadgets', slug: "electronics" });
        expect(created.name).toBe('Electronics');
        const found = await model.findById(created.id);
        expect(found.name).toBe('Electronics');
    });
    it('updates category', async () => {
        const updated = await model.update(created.id, { description: 'Electronic devices' });
        expect(updated.description).toBe('Electronic devices');
    });
    afterAll(async () => {
        const result = await model.delete(created.id);
        expect(result).toBeTruthy();
    });
});
