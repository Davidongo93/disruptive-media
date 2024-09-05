import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI ?? 'mongodb://localhost:32768/disruptdb';
  
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado a MongoDB correctamente');
    mongoose.connection.on('connected', () => console.log('connected'));

  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
