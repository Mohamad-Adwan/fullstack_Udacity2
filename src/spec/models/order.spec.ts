import { OrderModel } from '../../models/order.model';

describe('OrderModel', () => {
  const model = new OrderModel();
  let created: any;
beforeAll(async () => {
     created = await model.create({ user_id: 1, total: '100.00' } as any);
   
  });
//   it('creates an order', async () => {
  
//   });

  it('finds order by id', async () => {
    const found = await model.findById(created.id);
    expect(found.id).toBe(created.id);
  });

  it('updates order', async () => {
    const updated = await model.update(created.id, { status: 'paid' });
    expect(updated.status).toBe('paid');
  });
afterAll(async () => {
     const result = await model.delete(created.id);
    expect(result).toBeTruthy();
  });
//   it('deletes order', async () => {
  
//   });
});
