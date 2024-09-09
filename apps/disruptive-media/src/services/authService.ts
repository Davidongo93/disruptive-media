import user from '../models/user';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_JWT as string;

const loginUser = async (username: string, email: string): Promise<string | null> => {
  try {
    const loggedUser = await user.findOne({ email: email, username: username});

    if (!loggedUser) {
      return null;
    }

    const token = jwt.sign({ userId: loggedUser._id }, secretKey);

    return token;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export default loginUser;
