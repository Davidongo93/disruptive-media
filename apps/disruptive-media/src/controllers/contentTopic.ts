import { Request, Response } from 'express';
import { createContentTopicService, getContentTopicService } from '../services/contentTopicService'

const createContentTopic = async (req: Request, res: Response) => {
  const { name, categoriesAllowed } = req.body;
  try {
    const newTopic = await createContentTopicService({ name, categoriesAllowed });
    res.status(201).json(newTopic);
  } catch (error) {
    console.error(error);
   const message = error.message? error.message:`cannot create new topic: ${name}`
    res.status(500).json({message});
  }
};
const getContentTopics = async (req: Request, res: Response) => {
  try {
    const getTopics = await getContentTopicService();
    res.status(201).json(getTopics);
  } catch (error) {
    console.error(error);
   const message = error.message? error.message:`cannot create new topic: ${name}`
    res.status(500).json({message});
  }
};

export {createContentTopic, getContentTopics};
