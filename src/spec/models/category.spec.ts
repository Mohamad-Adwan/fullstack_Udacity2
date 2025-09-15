import { CategoryModel } from '../../models/category.model';
import db from "../../db";
describe('CategoryModel', () => {
  const model = new CategoryModel();
  let created: any;

beforeAll(async () => {
   await db.query('DELETE FROM categories WHERE name = $1', ['Electronics']);
   await db.query('DELETE FROM categories WHERE name = $1', ['Books']);
   created = await model.create({ name: 'Electronics', description: 'Gadgets',slug:"electronics" });
    expect(created.name).toBe('Electronics');
    const found = await model.findById(created.id);
    expect(found.name).toBe('Electronics');
  }
);



  it('updates category', async () => {
    const updated = await model.update(created.id, { description: 'Electronic devices' });
    expect(updated.description).toBe('Electronic devices');
  });
afterAll(async () => {
    const result = await model.delete(created.id);
    expect(result).toBeTruthy();
  }
);
  
});
