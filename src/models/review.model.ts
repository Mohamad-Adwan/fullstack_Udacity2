import pool from '../db';

export interface Review {
  id?: number;
  user_id: number;
  product_id: number;
  rating: number; // e.g., 1–5
  comment?: string;
}

export class ReviewModel {
  async create(r: Review) {
    const res = await pool.query(
      `INSERT INTO reviews (user_id, product_id, rating, comment)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [r.user_id, r.product_id, r.rating, r.comment || null]
    );
    return res.rows[0];
  }

  async findById(id: number) {
    const res = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
    return res.rows[0];
  }

  async listByProduct(product_id: number) {
    const res = await pool.query('SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC', [product_id]);
    return res.rows;
  }

  async update(id: number, fields: Partial<Review>) {
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
    const sql = `UPDATE reviews SET ${sets.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
    const res = await pool.query(sql, vals);
    return res.rows[0];
  }

  async delete(id: number) {
    await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
    return true;
  }
}
