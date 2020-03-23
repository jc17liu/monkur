import dotenv from 'dotenv';
import express from 'express';
import linebot from 'linebot';

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

dotenv.config();

const app = express();

const linebotParser = bot.parser();

app.get('/', (req, res) => { res.send('Welcome to Monkur'); });
app.post('/line-messages', linebotParser);

bot.on('message', (event) => {
  event.reply(event.message.text).then((data) => {
    console.log('Success', data);
  }).catch((error) => {
    console.log('Error', error);
  });
});

export default app;
