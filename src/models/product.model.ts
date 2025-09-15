import pool from '../db';


export interface Product { id?: number; sku?: string; name: string; description?: string; price: string; stock?: number; category_id?: number }


export class ProductModel {
    
async create(p: Product) {
    
const res = await pool.query(
  `INSERT INTO products (sku, name, description, price, stock, category_id)
   VALUES ($1, $2, $3, $4, $5, $6)
   RETURNING *`,
  [p.sku, p.name, p.description, p.price, p.stock || 0, p.category_id]
);
return res.rows[0];
}


async findById(id: number) {
const res = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
return res.rows[0];
}


async list({limit = 20, offset = 0, q, category}: any) {
const params: any[] = [];
let where = '';
if (q) { params.push(`%${q}%`); where += ` AND name ILIKE $${params.length}`; }
if (category) { params.push(category); where += ` AND category_id = $${params.length}`; }
const sql = `SELECT * FROM products WHERE 1=1 ${where} ORDER BY created_at DESC LIMIT $${params.length+1} OFFSET $${params.length+2}`;
params.push(limit, offset);
const r = await pool.query(sql, params);
return r.rows;
}


async update(id: number, fields: Partial<Product>) {
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

  const sql = `UPDATE products SET ${sets.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
  const res = await pool.query(sql, vals);
  return res.rows[0];
}



async delete(id: number) {
await pool.query('DELETE FROM products WHERE id = $1', [id]);
return true;
}
}