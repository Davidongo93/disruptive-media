import { Request, Response } from 'express';
import { createContentCategoryService, getContentCategoriesService } from '../services/contentCategoryService'

const createContentCategory = async (req: Request, res: Response) => {
  const { name, coverImage } = req.body;
  try {
    
    const newCategory = await createContentCategoryService({ name, coverImage });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
   const message = error.message? error.message:`cannot create new category: ${name}`
    res.status(500).json({message});
  }
};
const getContentCategories = async (req: Request, res: Response) => {
  try {
    
    const getCategories = await getContentCategoriesService();
    res.status(201).json(getCategories);
  } catch (error) {
    console.error(error);
   const message = error.message? error.message:`cannot create new category: ${name}`
    res.status(500).json({message});
  }
};
export {createContentCategory, getContentCategories};
