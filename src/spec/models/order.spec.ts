import { OrderModel } from '../../models/order.model';
export interface Order {
  id: number;
  user_id: number;
  status?: string; // pending | paid | shipped | completed | cancelled
  total?: number;
  address_id?: number;
}
describe('OrderModel', () => {
  const model = new OrderModel();
  let created: Order;
beforeAll(async () => {
     created = await model.create({ user_id: 1, total: 100.00 } );
   
  });
//   it('creates an order', async () => {
  
//   });

  it('finds order by id', async () => {
    const found = await model.findById(created.id!);
    expect(found.id).toBe(created.id);
  });

  it('updates order', async () => {
    const updated = await model.update(created.id!, { status: 'paid' });
    expect(updated.status).toBe('paid');
  });
afterAll(async () => {
     const result = await model.delete(created.id!);
    expect(result).toBeTruthy();
  });
//   it('deletes order', async () => {
  
//   });
});
