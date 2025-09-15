"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const db_1 = __importDefault(require("../db"));
class UserModel {
    async create(u) {
        const res = await db_1.default.query(`INSERT INTO users (email,password_hash,name,role) VALUES ($1,$2,$3,$4) RETURNING *`, [u.email, u.password_hash, u.name, u.role || 'customer']);
        return res.rows[0];
    }
    async findByEmail(email) {
        const res = await db_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0];
    }
    async findById(id) {
        const res = await db_1.default.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    }
    async list() {
        const res = await db_1.default.query('SELECT * FROM users ORDER BY created_at DESC');
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
        const sql = `UPDATE users SET ${sets.join(',')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
        const res = await db_1.default.query(sql, vals);
        return res.rows[0];
    }
    async delete(id) {
        await db_1.default.query('DELETE FROM users WHERE id = $1', [id]);
        return true;
    }
}
exports.UserModel = UserModel;
