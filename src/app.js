import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { LineMessageService } from './services';
import { TestController } from './controllers';

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch((error) => {
  console.log('Failed to connect to MongoDB, error: ', error.message);
  process.exit(1);
});

const lineMessageService = new LineMessageService();
const testController = new TestController();

app.get('/', (req, res) => { res.send('Welcome to Monkur'); });
app.post('/line-messages', lineMessageService.linebotParser);
// Must go after lineMessageService.linebotParser
app.use(express.json());
app.use('/tests', testController);

export default app;
