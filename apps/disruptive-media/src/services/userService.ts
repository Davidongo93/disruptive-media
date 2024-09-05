import User from '../models/user';

export const createUserService = async ({ username, email, roles }: { username: string, email: string, roles: string[] }) => {

    const newUser = new User({
      username,
      email,
      roles,
    });
    await newUser.save();
    return newUser;
};
