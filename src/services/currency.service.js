import axios from 'axios';

const CURRENCY_RATES_SOURCE = 'https://openexchangerates.org/api';

class CurrencyService {
  constructor() {
    this.openExchangeHeader = {
      headers: {
        Authorization: `Token ${process.env.OPEN_EXCHANGE_TOKEN}`
      }
    }
  }

  getAllCurrencyRates() {
    return axios.get(CURRENCY_RATES_SOURCE + '/latest.json', this.openExchangeHeader);
  }

  async convertRates(base, target) {
    try {
      const response  = await this.getAllCurrencyRates();
      const rates = response.data.rates;
      if (rates[base] && rates[target]) {
        return rates[target] / rates[base];
      }
    } catch (e) {
      console.log(e);
    }

    return 1;
  }
}

export default CurrencyService;
