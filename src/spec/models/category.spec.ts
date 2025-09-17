import { CategoryModel } from '../../models/category.model';
import db from "../../db";
export interface Category {
  id: number;
  name: string;
  description?: string;
  slug:string;
}

describe('CategoryModel', () => {
  const model = new CategoryModel();
  let created: Category;

beforeAll(async () => {
   await db.query('DELETE FROM categories WHERE name = $1', ['Electronics']);
   await db.query('DELETE FROM categories WHERE name = $1', ['Books']);
   created = await model.create({ name: 'Electronics', description: 'Gadgets',slug:"electronics" });
    
  }
);



  it('updates category', async () => {
    const updated = await model.update(created.id!, { description: 'Electronic devices' });
    expect(updated.description).toBe('Electronic devices');
  });
afterAll(async () => {
    const result = await model.delete(created.id!);
    expect(result).toBeTruthy();
  }
);
  
});
