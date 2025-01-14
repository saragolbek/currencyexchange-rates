import React, { Component } from 'react';
import { fetchCurrencies } from './utils';
import ChartComponent from './ChartComponent';

class Exchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      baseCurrency: 'USD',
      rates: {},
      error: null,
    };
  }

  async componentDidMount() {
    try {
      await this.loadCurrenciesAndRates(); // Await the Promise to handle it explicitly
    } catch (error) {
      console.error('Error during initial load:', error);
    }
  }

  loadCurrenciesAndRates = async () => {
    const cacheKey = `rates_${this.state.baseCurrency}`;
    try {
      const [currencies, cachedRates] = await Promise.all([
        fetchCurrencies(),
        localStorage.getItem(cacheKey) ? JSON.parse(localStorage.getItem(cacheKey)) : null,
      ]);

      let rates = cachedRates;
      if (!rates) {
        const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${this.state.baseCurrency}`);
        const data = await response.json();
        rates = data.rates;
        localStorage.setItem(cacheKey, JSON.stringify(rates));
      }

      this.setState({ currencies, rates, error: null });
    } catch (error) {
      this.setState({ error: error.message });
      throw error; // Re-throw to handle it in componentDidMount if necessary
    }
  };

  debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  handleCurrencyChange = this.debounce(async (event) => {
    const newCurrency = event.target.value;
    const cacheKey = `rates_${newCurrency}`;
    try {
      let rates = localStorage.getItem(cacheKey);

      if (!rates) {
        const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${newCurrency}`);
        const data = await response.json();
        rates = data.rates;
        localStorage.setItem(cacheKey, JSON.stringify(rates));
      } else {
        rates = JSON.parse(rates);
      }

      this.setState({ baseCurrency: newCurrency, rates });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }, 300); // Debounce with 300ms delay

  render() {
    const { currencies, baseCurrency, rates, error } = this.state;

    return (
        <div className="container shadow mt-5 pb-5">
          <div className="row justify-content-center">
            <div className="col-10">
              <h1 className="text-primary text-center mt-4 mb-4">Exchange Rates</h1>
              <div className="mb-3">
                <select
                    className="form-select"
                    value={baseCurrency}
                    onChange={this.handleCurrencyChange}
                >
                  {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                  ))}
                </select>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                  <th>Currency</th>
                  <th>Exchange Rate (1 {baseCurrency})</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(rates).map(([currency, rate]) => (
                    <tr key={currency}>
                      <td>{currency}</td>
                      <td>{rate}</td>
                    </tr>
                ))}
                </tbody>
              </table>
              <ChartComponent
                  labels={Object.keys(rates)}
                  datasetLabel={`Exchange Rates for ${baseCurrency}`}
                  data={Object.values(rates)}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default Exchange;
