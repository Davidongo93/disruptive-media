import contentCategory from "../models/contentCategory";
import contentTopic from "../models/contentTopic";

export const createContentTopicService = async ({ name, categoriesAllowed }: { name: string, categoriesAllowed: string[] }) => {
  name = name.toLowerCase();

  const existingTopic = await contentTopic.findOne({ name });
  if (existingTopic) {
    throw new Error('Topic already exists.');
  }
  const categories = await contentCategory.find({});
  
  const validCategoryNames = categories.map(cat => cat.name);

  const invalidCategories = categoriesAllowed.filter(c => !validCategoryNames.includes(c));
  if (invalidCategories.length > 0) {
    throw new Error(`these categories are not valid: ${invalidCategories.join(', ')}`);
  }

  const newTopic = new contentTopic({ name, categoriesAllowed });
  await newTopic.save();

  return newTopic;
};
