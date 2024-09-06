import { Request, Response } from 'express';
import { createUserService, getUsersService } from '../services/userService';

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email} = req.body;
    let {role} = req.body
    // While implement JWT
    const adminEmail = process.env.EMAIL_ADMIN;
    if (adminEmail) {
      email === adminEmail? role = "admin":role;  
    } 
    console.log(role, req.body,adminEmail)
    const newUser = await createUserService({ username, email, role });
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
