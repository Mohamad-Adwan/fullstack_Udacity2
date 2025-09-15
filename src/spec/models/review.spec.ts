import { ReviewModel } from '../../models/review.model';

describe('ReviewModel', () => {
  const model = new ReviewModel();
  let created: any;
beforeAll(async () => {
   created = await model.create({ user_id: 1, product_id: 1, rating: 5, comment: 'Great!' });
    expect(created).toBeDefined();
    expect(created.rating).toBe(5);
     const found = await model.findById(created.id);
    expect(found.id).toBe(created.id);
  });



  it('lists reviews by product', async () => {
    const list = await model.listByProduct(1);
    expect(list.length).toBeGreaterThan(0);
  });

  it('updates review', async () => {
    const updated = await model.update(created.id, { comment: 'Updated comment' });
    expect(updated.comment).toBe('Updated comment');
  });

  it('deletes review', async () => {
    const result = await model.delete(created.id);
    expect(result).toBeTruthy();
  });
});
