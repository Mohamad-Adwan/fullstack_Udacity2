import pool from '../db';

export interface Category {
  id?: number;
  name: string;
  description?: string;
  slug:string;
}

export class CategoryModel {
  async create(c: Category) {
  
    const res = await pool.query(
      `INSERT INTO categories (name, description,slug) VALUES ($1, $2,$3) RETURNING *`,
      [c.name, c.description || null,c.slug]
    );
    return res.rows[0];
  }

  async findById(id: number) {
    const res = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return res.rows[0];
  }

  async list() {
    const res = await pool.query('SELECT * FROM categories ORDER BY created_at DESC');
    return res.rows;
  }

  async update(id: number, fields: Partial<Category>) {
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
    const sql = `UPDATE categories SET ${sets.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
    const res = await pool.query(sql, vals);
    return res.rows[0];
  }

  async delete(id: number) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    return true;
  }
}
