import mongoose from 'mongoose';
import Content from '../models/content';
import ContentTopic from '../models/contentTopic';
import User from '../models/user';
import contentCategory from '../models/contentCategory';

export const createPost = async ({ title, topicId, categoryId, url, userId }: { title: string, topicId: string, categoryId: string, url: string, userId: string }) => {
  const topic = await ContentTopic.findById(topicId);
  if (!topic) {
    throw new Error('Invalid Topic');
  }
  const category = await contentCategory.findById(categoryId);
  const user = await User.findById(userId);
  
  if (!user.role) {
    throw new Error('Invalid User');
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
interface GetContentsParams {
  topic?: string;
  title?: string;
  page: number;
  limit: number;
  sort: string;
  order: string;
}

export const getContents = async ({ topic, title, page, limit, sort, order }: GetContentsParams) => {
  const query: any = {};

  if (topic) {
    query.topic = new mongoose.Types.ObjectId(topic);
  }
  
  if (title) {
    query.title = { $regex: title, $options: 'i' }; // 'i' para case insensitive
  }

  const skip = (page - 1) * limit;

  const contents = await Content.find(query)
    .sort({ [sort]: order === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(limit)
    .populate('topic', 'name')
    .populate('credits', 'username')
    .populate('category', 'name');

  const totalContents = await Content.countDocuments(query);

  const categoryCounts = await Content.aggregate([
    { $match: query }, 
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'contentcategories',
        localField: '_id',
        foreignField: '_id',
        as: 'categoryDetails'
      }
    },
    {
      $unwind: '$categoryDetails'
    },
    {
      $project: {
        _id: 0,
        category: '$categoryDetails.name',
        count: 1
      }
    }
  ]);

  return {
    contents,
    total: totalContents,
    categoriesSummary: categoryCounts
  };
};
