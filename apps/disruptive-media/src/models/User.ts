import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  roles: {
    type: String,
    enum: ['admin', 'reader', 'content_creator'], 
    default:'reader'
  }
});

export = mongoose.model('User', userSchema);
