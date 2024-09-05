import { Request, Response } from 'express';
import { createUserService } from '../services/userService';

const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, roles } = req.body;
    const newUser = await createUserService({ userName, email, roles });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error.errorResponse.errmsg);
    res.status(500).json({message: error.errorResponse.errmsg.slice(7,37)});
  }
};

export { createUser };
