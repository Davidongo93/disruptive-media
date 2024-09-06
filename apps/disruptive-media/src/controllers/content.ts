import { Request, Response } from 'express';
import { createPost, getContents } from '../services/contentService';


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

export const getContentsController = async (req: Request, res: Response) => {
  try {
    const { topic, title, page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = req.query;
    const contents = await getContents({
      topic: topic as string,
      title: title as string,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: sort as string,
      order: order as string,
    });

    return res.json({
      success: true,
      data: contents
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
