import { CartModel, Cart } from '../../models/cart.model';

describe('CartModel', () => {
  const model = new CartModel();
  let created: Cart;
beforeAll(async () => {
    // Any setup before tests run, if necessary
    created = await model.create(1); // user_id = 1
    
  });
 

  it('finds cart by id', async () => {
    const found = await model.findById(created.id!);
    expect(found.id).toBe(created.id);
    expect(found.user_id).toBe(1);
  });

  it('lists carts', async () => {
    const carts = await model.list();
    expect(carts.length).toBeGreaterThan(0);
  });

  it('updates cart', async () => {
    const updated = await model.update(created.id!, { checked_out: "checked_out" });
    expect(updated?.checked_out).toEqual("checked_out");
  });
afterAll(async () => {
      const result = await model.delete(created.id!);
    expect(result).toBeTrue();
  });
 
});
