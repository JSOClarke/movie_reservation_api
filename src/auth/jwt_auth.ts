import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const createToken = ({ user_id, username }) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT Present");
  }

  const token = jwt.sign(
    { user_id: user_id, username: username },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );
  return token;
};

export const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT Present");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};
