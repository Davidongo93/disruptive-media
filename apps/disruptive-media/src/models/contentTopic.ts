import mongoose from 'mongoose';

const contentTopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  categoriesAllowed: {
      type: [String],
      required: true
    }
  });

export default mongoose.model('ContentTopic', contentTopicSchema);
