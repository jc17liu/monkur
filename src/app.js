import dotenv from 'dotenv';
import express from 'express';
import linebot from 'linebot';
import { LineMessageService } from './services';
import { TestController } from './controllers';

const app = express();
dotenv.config();

const lineMessageService = new LineMessageService();
const testController = new TestController();

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const linebotParser = bot.parser();

app.get('/', (req, res) => { res.send('Welcome to Monkur'); });
app.post('/line-messages', linebotParser);
app.use(express.json());
app.use('/tests', testController);

bot.on('message', (event) => {
  lineMessageService.processEvent(event);
});

export default app;
