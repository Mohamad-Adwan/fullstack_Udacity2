"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModel = void 0;
const db_1 = __importDefault(require("../db"));
class CartItemModel {
    async create(item) {
        const res = await db_1.default.query(`INSERT INTO cart_items (cart_id, product_id, quantity, unit_price)
       VALUES ($1, $2, $3, $4) RETURNING *`, [item.cart_id, item.product_id, item.quantity, item.unit_price]);
        return res.rows[0];
    }
    async findById(id) {
        const res = await db_1.default.query(`SELECT * FROM cart_items WHERE id = $1`, [id]);
        return res.rows[0];
    }
    async list(cart_id) {
        const res = await db_1.default.query(`SELECT * FROM cart_items WHERE cart_id = $1 ORDER BY created_at DESC`, [cart_id]);
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
        const sql = `UPDATE cart_items SET ${sets.join(', ')}, updated_at = now()
                 WHERE id = $${idx} RETURNING *`;
        const res = await db_1.default.query(sql, vals);
        return res.rows[0];
    }
    async delete(id) {
        await db_1.default.query(`DELETE FROM cart_items WHERE id = $1`, [id]);
        return true;
    }
}
exports.CartItemModel = CartItemModel;
