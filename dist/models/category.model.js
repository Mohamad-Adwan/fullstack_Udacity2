"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const db_1 = __importDefault(require("../db"));
class CategoryModel {
    async create(c) {
        const res = await db_1.default.query(`INSERT INTO categories (name, description,slug) VALUES ($1, $2,$3) RETURNING *`, [c.name, c.description || null, c.slug]);
        return res.rows[0];
    }
    async findById(id) {
        const res = await db_1.default.query('SELECT * FROM categories WHERE id = $1', [id]);
        return res.rows[0];
    }
    async list() {
        const res = await db_1.default.query('SELECT * FROM categories ORDER BY created_at DESC');
        return res.rows;
    }
    async update(id, fields) {
        const sets = [];
        const vals = [];
        let idx = 1;
        for (const key of Object.keys(fields)) {
            sets.push(`${key} = $${idx}`);
            // @ts-ignore
            vals.push(fields[key]);
            idx++;
        }
        if (sets.length === 0)
            return this.findById(id);
        vals.push(id);
        const sql = `UPDATE categories SET ${sets.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
        const res = await db_1.default.query(sql, vals);
        return res.rows[0];
    }
    async delete(id) {
        await db_1.default.query('DELETE FROM categories WHERE id = $1', [id]);
        return true;
    }
}
exports.CategoryModel = CategoryModel;
