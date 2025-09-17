import pool from '../db';

export interface Cart {
  id: number;
  user_id: number;
  checked_out?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class CartModel {
  async create(user_id: number) {
    const res = await pool.query(
      `INSERT INTO carts (user_id) 
       VALUES ($1) 
       RETURNING *`,
      [user_id]
    );
    return res.rows[0] as Cart;
  }

  async findById(id: number) {
    const res = await pool.query(
      'SELECT * FROM carts WHERE id = $1',
      [id]
    );
    return res.rows[0] ;
  }

  async list() {
    const res = await pool.query(
      'SELECT * FROM carts ORDER BY created_at DESC'
    );
    return res.rows as Cart[];
  }

  async update(id: number, fields: Partial<Cart>) {
    const sets: string[] = [];
    const vals: (string | number | Date | undefined)[] = [];
    let idx = 1;

    for (const key of Object.keys(fields)) {
      sets.push(`${key} = $${idx}`);
      // @ts-ignore
      vals.push(fields[key]);
      idx++;
    }

    if (sets.length === 0) return this.findById(id);

    vals.push(id);
    const sql = `
      UPDATE carts 
      SET ${sets.join(', ')}, updated_at = now() 
      WHERE id = $${idx} 
      RETURNING *`;
    const res = await pool.query(sql, vals);
    return res.rows[0] as Cart;
  }

  async delete(id: number) {
    await pool.query('DELETE FROM carts WHERE id = $1', [id]);
    return true;
  }
}
