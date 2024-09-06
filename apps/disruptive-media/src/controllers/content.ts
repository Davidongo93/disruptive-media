import { Request, Response } from 'express';
import { createPost } from '../services/contentService';

export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, url, topicId, categoryId } = req.body;
    const userId = req.user?._id;

    const newPost = await createPost({ title, url, topicId, categoryId, userId });
    console.log(newPost);
    

    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
