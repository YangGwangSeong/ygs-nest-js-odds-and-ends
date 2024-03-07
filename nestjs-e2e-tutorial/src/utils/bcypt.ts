import * as bcrypt from 'bcrypt';

export const encodePassword = async (rawPassword: string) => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
};

export const comparePasswords = async (rawPassword: string, hash: string) => {
  return bcrypt.compareSync(rawPassword, hash);
};
