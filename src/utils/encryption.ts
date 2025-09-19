import bcrypt from "bcrypt";

export const hashPassword = async (
  password: string,
  saltrounds: number = 10
) => {
  const salt = await bcrypt.genSalt(saltrounds);

  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const comparedHash = async (password: string, password_hash: string) => {
  return await bcrypt.compare(password, password_hash);
};
