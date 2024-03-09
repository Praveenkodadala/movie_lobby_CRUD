import express from 'express';
import config from 'config';
import morgan from 'morgan';
import { connectToDatabase } from './databases';
import { errorMiddleware } from './middlewares/error.middleware';
import indexRoutes from './routes/index.route'



const PORT = config.get<number>('PORT')||3000;
const app = express();

console.log('NODE_ENV =', config.get<string>('NODE_ENV').toString());


app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))



app.get('/', function (req, res) {
  res.send('Server is working fine.');
});

app.use('/api', indexRoutes);




app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send("Sorry, can't find request!");
});

app.use(errorMiddleware);


const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

export default startServer;
