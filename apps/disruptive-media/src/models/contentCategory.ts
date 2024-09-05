import mongoose from 'mongoose';

const contentCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  coverImage: {
    type: String,
    required : true
}});

export default mongoose.model('ContentCategory', contentCategorySchema);
