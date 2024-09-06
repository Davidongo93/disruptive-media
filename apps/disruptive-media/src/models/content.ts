import mongoose from 'mongoose';
import contentTopic from './contentTopic';
import contentCategory from './contentCategory';

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ContentTopic',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ContentCategory',
    required: true,
    validate: {
      validator: async function(value: mongoose.Types.ObjectId) {
        const topic = await contentTopic.findById(this.topic);
        if (!topic) {
          throw new Error('El tema no es válido.');
        }
        const allowedCategories = topic.categoriesAllowed.map(catId => catId.toString());
        const category = await contentCategory.findById(value);
        return allowedCategories.includes(category.name);
      },
      
      message: "Category not allowed by topic."
    }
  },
  url: {
    type: String,
    required: true
  },
  credits: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Content', contentSchema);
