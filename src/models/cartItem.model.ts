import pool from '../db';

export interface CartItem {
  id?: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  unit_price: string;
}

export class CartItemModel {
  async create(item: CartItem) {
    const res = await pool.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity, unit_price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [item.cart_id, item.product_id, item.quantity, item.unit_price]
    );
    return res.rows[0];
  }

  async findById(id: number) {
    const res = await pool.query(`SELECT * FROM cart_items WHERE id = $1`, [id]);
    return res.rows[0];
  }

  async list(cart_id: number) {
    const res = await pool.query(
      `SELECT * FROM cart_items WHERE cart_id = $1 ORDER BY created_at DESC`,
      [cart_id]
    );
    return res.rows;
  }

  async update(id: number, fields: Partial<CartItem>) {
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
    const sql = `UPDATE cart_items SET ${sets.join(', ')}, updated_at = now()
                 WHERE id = $${idx} RETURNING *`;
    const res = await pool.query(sql, vals);
    return res.rows[0];
  }

  async delete(id: number) {
    await pool.query(`DELETE FROM cart_items WHERE id = $1`, [id]);
    return true;
  }
}
