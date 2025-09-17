import { UserModel } from '../../models/user.model';
export interface User { id: number; email: string; password_hash: string; name?: string; role?: string }

describe('UserModel', () => {
  const model = new UserModel();
  let created: User;
beforeAll(async () => {
   created = await model.create({ email: 'test@example.com', password_hash: 'hashed' } as any);
  } );
  // it('creates a user', async () => {
  //   created = await model.create({ email: 'test@example.com', password_hash: 'hashed' } as any);
  //   expect(created.email).toBe('test@example.com');
  // });

  it('finds a user by id', async () => {
    const found = await model.findById(created.id!);
    expect(found.email).toBe('test@example.com');
  });

  it('updates user', async () => {
    const updated = await model.update(created.id!, { name: 'John Doe' });
    expect(updated.name).toBe('John Doe');
  });

  // it('deletes user', async () => {
  //   const result = await model.delete(created.id!);
  //   expect(result).toBeTruthy();
  // });
});