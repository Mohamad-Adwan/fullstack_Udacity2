import pool from '../db';

export interface User { id?: number; email: string; password_hash: string; name?: string; role?: string }

export class UserModel {
  async create(u: User) {
    const res = await pool.query(
      `INSERT INTO users (email,password_hash,name,role) VALUES ($1,$2,$3,$4) RETURNING *`,
      [u.email, u.password_hash, u.name, u.role || 'customer']
    );
    return res.rows[0];
  }
async findByEmail(email: string) {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
}
  async findById(id: number) {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  }

  async list() {
    const res = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return res.rows;
  }

  async update(id: number, fields: Partial<User>) {
    const sets: string[] = [];
    const vals: any[] = [];
    let idx = 1;
    for (const key of Object.keys(fields)) {
      sets.push(`${key} = $${idx}`);
      // @ts-ignore
      vals.push((fields as any)[key]);
      idx++;
    }
    if (sets.length === 0) return this.findById(id);
    vals.push(id);
    const sql = `UPDATE users SET ${sets.join(',')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
    const res = await pool.query(sql, vals);
    return res.rows[0];
  }

  async delete(id: number) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return true;
  }
}