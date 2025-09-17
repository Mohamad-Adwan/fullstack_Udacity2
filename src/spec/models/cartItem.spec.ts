import { CartItemModel, CartItem } from '../../models/cartItem.model';
import pool from '../../db';
import { Cart } from '../../models/cart.model';

describe('CartItemModel', () => {
  const model = new CartItemModel();
  let createdCart: Cart;
  let createdItem: CartItem;


beforeEach(async () => {
  const productRes = await pool.query(
    `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`,
    ['Test Product', '9.99']
  );
  const product = productRes.rows[0];

  createdCart = (await pool.query(
    `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`,
    [1]
  )).rows[0];

  createdItem = await model.create({
    cart_id: createdCart.id,
    product_id: product.id,
    quantity: 2,
    unit_price: '9.99'
  });
});
afterEach(async () => {
  if (createdItem?.id) await model.delete(createdItem.id);
});

  it('creates a cart item', async () => {
    expect(createdItem).toBeDefined();
    expect(createdItem.id).toBeGreaterThan(0);
  });

  it('finds by id', async () => {
    const found = await model.findById(createdItem.id!);
    expect(found.quantity).toBe(2);
  });

  it('updates cart item', async () => {
    const updated = await model.update(createdItem.id!, { quantity: 5 });
    expect(updated.quantity).toBe(5);
  });

  it('lists cart items for cart', async () => {
    const items = await model.list(createdCart.id);
    expect(items.length).toBeGreaterThan(0);
  });

  // it('deletes cart item', async () => {
  //   const result = await model.delete(createdItem.id!);
  //   expect(result).toBeTruthy();
  // });
});
