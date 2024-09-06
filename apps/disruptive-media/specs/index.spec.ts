import mongoose from 'mongoose';
import connectDB from '../src/models/index';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('Database Connection', () => {
  it('must fail if MONGO_URI isnt defined', async () => {
    const originalEnv = process.env.MONGO_URI;
    delete process.env.MONGO_URI;

    try {
      await connectDB();
    } catch (error) {
      expect(error.message).toBeTruthy();
    } finally {
      process.env.MONGO_URI = originalEnv;
    }
  });

  it('must call mongoose.connect with correct URI', async () => {
    process.env.MONGO_URI = 'mongodb://localhost:27017/testdb';

    await connectDB();
    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost:27017/testdb');
  });
});
