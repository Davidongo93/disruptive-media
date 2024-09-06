import contentCategory from "../models/contentCategory";

export const createContentCategoryService = async ({ name, coverImage }: {name: string, coverImage: string}) => {

  const newCategory = new contentCategory({ name, coverImage });
  await newCategory.save();

  return newCategory;
};
export const getContentCategoriesService = async () => {

 const getCategories = await contentCategory.find({});
  return getCategories;
};
