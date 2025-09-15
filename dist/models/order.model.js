"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const db_1 = __importDefault(require("../db"));
class OrderModel {
    async create(o) {
        const res = await db_1.default.query(`INSERT INTO orders (user_id, total, status${o.address_id ? ', address_id' : ''})
   VALUES ($1, $2, $3${o.address_id ? ', $4' : ''})
   RETURNING *`, o.address_id ? [o.user_id, o.total, o.status || 'pending', o.address_id] : [o.user_id, o.total, o.status || 'pending']);
        return res.rows[0];
    }
    async findById(id) {
        const res = await db_1.default.query('SELECT * FROM orders WHERE id = $1', [id]);
        return res.rows[0];
    }
    async list() {
        const res = await db_1.default.query('SELECT * FROM orders ORDER BY created_at DESC');
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
        const sql = `UPDATE orders SET ${sets.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
        const res = await db_1.default.query(sql, vals);
        return res.rows[0];
    }
    async delete(id) {
        await db_1.default.query('DELETE FROM orders WHERE id = $1', [id]);
        return true;
    }
}
exports.OrderModel = OrderModel;
