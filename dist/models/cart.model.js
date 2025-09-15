"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const db_1 = __importDefault(require("../db"));
class CartModel {
    async create(user_id) {
        const res = await db_1.default.query(`INSERT INTO carts (user_id) 
       VALUES ($1) 
       RETURNING *`, [user_id]);
        return res.rows[0];
    }
    async findById(id) {
        const res = await db_1.default.query('SELECT * FROM carts WHERE id = $1', [id]);
        return res.rows[0];
    }
    async list() {
        const res = await db_1.default.query('SELECT * FROM carts ORDER BY created_at DESC');
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
        const sql = `
      UPDATE carts 
      SET ${sets.join(', ')}, updated_at = now() 
      WHERE id = $${idx} 
      RETURNING *`;
        const res = await db_1.default.query(sql, vals);
        return res.rows[0];
    }
    async delete(id) {
        await db_1.default.query('DELETE FROM carts WHERE id = $1', [id]);
        return true;
    }
}
exports.CartModel = CartModel;
