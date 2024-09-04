import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI ?? 'mongodb://localhost:32768/disruptdb';
  
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1); // Detiene la aplicación si no se puede conectar a la base de datos
  }
};

export default connectDB;
