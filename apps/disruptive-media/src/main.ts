import express from 'express';
import connectDB from './models';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
