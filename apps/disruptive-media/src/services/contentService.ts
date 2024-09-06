import mongoose from 'mongoose';
import Content from '../models/content';
import ContentTopic from '../models/contentTopic';
import User from '../models/user';
import contentCategory from '../models/contentCategory';

export const createPost = async ({ title, topicId, categoryId, url, userId }: { title: string, topicId: string, categoryId: string, url: string, userId: string }) => {
  // Verifica si el tema existe
  const topic = await ContentTopic.findById(topicId);
  if (!topic) {
    throw new Error('El tema proporcionado no es válido.');
  }
const category = await contentCategory.findById(categoryId);

  // Verifica si el usuario existe
  const user = await User.findById(userId);
  
  if (!user.role) {
    throw new Error('El usuario no es válido.');
  }
  console.log(user.role,category,categoryId);
  

  const newContent = new Content({
    title,
    topic: topicId,
    category: category,
    url,
    credits: userId
  });

  await newContent.save();
  return newContent;
};
