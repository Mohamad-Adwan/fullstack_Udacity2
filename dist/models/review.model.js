"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const db_1 = __importDefault(require("../db"));
class ReviewModel {
    async create(r) {
        const res = await db_1.default.query(`INSERT INTO reviews (user_id, product_id, rating, comment)
       VALUES ($1, $2, $3, $4) RETURNING *`, [r.user_id, r.product_id, r.rating, r.comment || null]);
        return res.rows[0];
    }
    async findById(id) {
        const res = await db_1.default.query('SELECT * FROM reviews WHERE id = $1', [id]);
        return res.rows[0];
    }
    async listByProduct(product_id) {
        const res = await db_1.default.query('SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC', [product_id]);
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
        const sql = `UPDATE reviews SET ${sets.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
        const res = await db_1.default.query(sql, vals);
        return res.rows[0];
    }
    async delete(id) {
        await db_1.default.query('DELETE FROM reviews WHERE id = $1', [id]);
        return true;
    }
}
exports.ReviewModel = ReviewModel;
