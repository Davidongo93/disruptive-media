import { Request, Response } from 'express';
import { createUserService, getUsersService } from '../services/userService';

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, roles } = req.body;
    const newUser = await createUserService({ username, email, roles });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
   const message = error.message? error.message:`cannot create new user`
   res.status(400).json({message})
  }
};
const getUsers = async (req: Request, res: Response) => {
  try {
  
    const users = await getUsersService();
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
   const message = error.message? error.message:`cannot get users list`
   res.status(400).json({message})
  }
};

export { createUser,getUsers };
