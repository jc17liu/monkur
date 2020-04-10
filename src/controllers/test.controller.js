import express from 'express';
import { CurrencyService } from '../services';
import {
  HTTP_CODES,
  MESSAGES,
  RESERVED_MESSAGES_CODES
} from '../constants';
import { messageBuilder } from '../utils';

class TestController extends express.Router {
  constructor() {
    super();
    this.currencyService = new CurrencyService();

    this.get('/rates', async(req, res) => {
      try {
        const rates = await this.currencyService.getAllCurrencyRates();
        res.status(HTTP_CODES.OK).send(rates.data.rates);
      } catch(e) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(e);
      }
    });

    this.get('/converted-rates', async(req, res) => {
      const base = req.query.base;
      const target = req.query.target;
      try {
        const convertedRate = await this.currencyService.convertRates(base, target);
        res.status(HTTP_CODES.OK).send(convertedRate.toString());
      } catch(e) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(e);
      }
    });

    this.post('/messages', async(req, res) => {
      const incomingMessage = req.body.message.replace(/\s/g, '');
      const base = incomingMessage.substr(incomingMessage.search('=') - 3, 3);
      const target = incomingMessage.substr(incomingMessage.search('=') + 1, 3);

      if (RESERVED_MESSAGES_CODES.includes(incomingMessage)) {
        res.status(HTTP_CODES.OK).send('');
        return;
      }

      const validMessageFormat = /^\d{0,13}.?\d{0,4}[A-Za-z]{3}=[A-Za-z]{3}$/;
      if (!validMessageFormat.test(incomingMessage)) {
        res.status(HTTP_CODES.FORBIDDEN).send(MESSAGES["message.system.invalid.input"]);
        return;
      }

      // Get the number in the message
      const num = Number(incomingMessage.replace(/[^0-9\.]+/g, '')) || 1;

      try {
        const convertedRate = await this.currencyService.convertRates(base, target);
        const result = (num * convertedRate).toFixed(4);
        const returnMessage = messageBuilder(MESSAGES["message.converted.rate"], {
          base,
          target,
          before: num.toString(),
          after: result.toString()
        });
        res.status(HTTP_CODES.OK).send(returnMessage);
      } catch(e) {
        console.log(e);
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(MESSAGES["message.system.error"]);
      }
    });
  }
}

export default TestController;
