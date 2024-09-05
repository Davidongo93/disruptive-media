import User from '../models/User';

export const createUserService = async ({ userName, email, roles }: { userName: string, email: string, roles: string[] }) => {
  try {
    const newUser = new User({
      userName,
      email,
      roles,
    });
    await newUser.save();
    return newUser;
    
  } catch (error) {
    
    throw error;
  }
};
