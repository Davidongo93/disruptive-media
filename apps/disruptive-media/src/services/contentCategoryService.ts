import ContentCategory from "../models/contentCategory";

export const createContentCategoryService = async ({ name, coverImage }: {name: string, coverImage: string}) => {
name = name.toLowerCase()
    const newCategory = new ContentCategory({ name, coverImage });
    await newCategory.save();
    return newCategory;
};
