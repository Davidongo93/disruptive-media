import connectDB from './models';
import app from './app';
import router from './routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;


const startServer = async () => {
  try {
    await connectDB();
app.use('/',router)
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
