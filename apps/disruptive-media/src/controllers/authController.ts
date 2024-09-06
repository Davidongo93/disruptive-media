import { Request, Response } from "express";
import loginUser from "../services/authService";

const loginUserController = async (req: Request, res: Response) => {
  const { username, email } = req.body;

  const token = await loginUser(username, email);

  if (token) {
    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

export default loginUserController;
