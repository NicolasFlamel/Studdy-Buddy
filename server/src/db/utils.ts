import bcrypt from 'bcrypt';

export const checkPassword = (loginPw: string, dbPassword: string) =>
  bcrypt.compare(loginPw, dbPassword);
