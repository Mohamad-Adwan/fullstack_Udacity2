import bcrypt from 'bcrypt';
export const hash = (plain: string) => bcrypt.hash(plain, 10);
export const compare = (plain: string, hashVal: string) => bcrypt.compare(plain, hashVal);