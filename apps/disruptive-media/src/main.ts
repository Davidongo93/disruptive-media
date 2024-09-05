import connectDB from './models'; // Cambia a la ruta correcta de tu archivo de conexión
import router from './routes'; // Asegúrate de que tu archivo de rutas esté correctamente exportado
import app from './app';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;



// Inicializar base de datos y servidor
const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();
app.use('/',router)
    // Iniciar servidor
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
