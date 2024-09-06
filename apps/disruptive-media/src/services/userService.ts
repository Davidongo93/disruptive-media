import user from '../models/user';

export const createUserService = async ({ username, email, roles }: { username: string, email: string, roles: string[] }) => {

    const newUser = new user({
      username,
      email,
      roles,
    });
    await newUser.save();
    return newUser;
};
export const getUsersService = async () =>{
  const usersList = await user.find({});
  
 return usersList;
}
