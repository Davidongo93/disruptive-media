import user from '../models/user';

export const createUserService = async ({ username, email, role }: { username: string, email: string, role: string[] }) => {
console.log('service role:', role);

    const newUser = new user({
      username,
      email,
      role,
    });
    await newUser.save();
    return newUser;
};
export const getUsersService = async () =>{
  const usersList = await user.find({});
  
 return usersList;
};
