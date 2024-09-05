import { Request, Response } from 'express';
import { createContentCategoryService } from '../services/contentCategoryService'

const createContentCategory = async (req: Request, res: Response) => {
  try {
    const { name, coverImage } = req.body;
    
    const newCategory = await createContentCategoryService({ name, coverImage });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error.errorResponse.errmsg);
    res.status(500).json({message: error.errorResponse.errmsg.slice(7,37)});
  }
};
export {createContentCategory};
