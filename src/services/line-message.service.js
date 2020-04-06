import {
  MESSAGES,
  MESSAGE_TYPE
} from '../constants';
import CurrencyService from './currency.service';
import { messageBuilder } from '../utils';
import linebot from 'linebot';

class LineMessageService {
  constructor() {
    this.currencyService = new CurrencyService();
    this.bot = linebot({
      channelId: process.env.CHANNEL_ID,
      channelSecret: process.env.CHANNEL_SECRET,
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
    });
    this.parser = this.bot.parser();
    this.setup();
  }

  get linebotParser() {
    return this.parser;
  }

  setup() {
    this.bot.on('message', (event) => {
      this.processEvent(event);
    });
  }

  async processEvent(event) {
    const incomingMessage = event.message.text.replace(/\s/g, '');
    const base = incomingMessage.substr(incomingMessage.search('=') - 3, 3);
    const target = incomingMessage.substr(incomingMessage.search('=') + 1, 3);

    // Get the number in the message
    const num = Number(incomingMessage.replace(/[^0-9\.]+/g, '')) || 1;

    try {
      const convertedRate = await this.currencyService.convertRates(base, target);
      const result = (num * convertedRate);
      const returnMessage = messageBuilder(MESSAGES["message.converted.rate"], {
        base,
        target,
        before: num.toString(),
        after: result.toString()
      });
      await event.reply(this.createMessage(returnMessage));
    } catch(e) {
      await event.reply(this.createMessage(MESSAGES["message.system.error"]));
    }
  }

  createMessage(text) {
    return {
      type: MESSAGE_TYPE.TEXT,
      text
    };
  }

  createStickerMessage(packageId, stickerId) {
    return {
      type: MESSAGE_TYPE.STICKER,
      packageId,
      stickerId
    };
  }
}

export default LineMessageService;
