import axios from 'axios';
import CacheService from './cache.service';

const CURRENCY_RATES_SOURCE = 'https://openexchangerates.org/api';

class CurrencyService {
  constructor() {
    this.openExchangeHeader = {
      headers: {
        Authorization: `Token ${process.env.OPEN_EXCHANGE_TOKEN}`
      }
    }
    this.cacheService = new CacheService();
  }

  getCurrencyRatesFromSource() {
    return axios.get(CURRENCY_RATES_SOURCE + '/latest.json', this.openExchangeHeader);
  }

  async getCurrencyRates() {
    let rates = await this.cacheService.getCurrencyRatesFromCache();
    if (!rates) {
      const rawData = await this.getCurrencyRatesFromSource();
      rates = rawData.data.rates;
      this.cacheService.storeCurrencyRatesToCache(rates);
    } else {
      rates = JSON.parse(rates);
    }
    return rates;
  }

  async convertRates(base, target) {
    try {
      const rates = await this.getCurrencyRates();
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
