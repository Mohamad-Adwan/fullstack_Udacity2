import pool from '../db';

export interface Order {
  id?: number;
  user_id: number;
  status?: string; // pending | paid | shipped | completed | cancelled
  total?: number;
  total_price?: string;
  address_id?: number;
}

export class OrderModel {
  async create(o: Order) {
    const res = await pool.query(
  `INSERT INTO orders (user_id, total, status${o.address_id ? ', address_id' : ''})
   VALUES ($1, $2, $3${o.address_id ? ', $4' : ''})
   RETURNING *`,
  o.address_id ? [o.user_id, o.total!, o.status || 'pending', o.address_id] : [o.user_id, o.total!, o.status || 'pending']
);
    return res.rows[0];
  }

  async findById(id: number) {
    const res = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return res.rows[0];
  }

  async list() {
    const res = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    return res.rows;
  }

  async update(id: number, fields: Partial<Order>) {
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
    const sql = `UPDATE orders SET ${sets.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
    const res = await pool.query(sql, vals);
    return res.rows[0];
  }

  async delete(id: number) {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    return true;
  }
}
