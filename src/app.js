import dotenv from 'dotenv';
import express from 'express';
import { LineMessageService } from './services';
import { TestController } from './controllers';

const app = express();
dotenv.config();

const lineMessageService = new LineMessageService();
const testController = new TestController();

app.get('/', (req, res) => { res.send('Welcome to Monkur'); });
app.post('/line-messages', lineMessageService.linebotParser);
// Must go after lineMessageService.linebotParser
app.use(express.json());
app.use('/tests', testController);

export default app;
