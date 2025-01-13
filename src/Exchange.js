import React from 'react';
import ChartComponent from './ChartComponent';

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      baseCurrency: 'USD',
      rates: {},
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
    this.fetchExchangeRates(this.state.baseCurrency);
  }

  fetchCurrencies = () => {
    fetch('https://api.frankfurter.app/currencies')
        .then((response) => response.json())
        .then((data) => {
          const currencies = Object.keys(data);
          this.setState({ currencies, error: null });
        })
        .catch((error) => {
          this.setState({ error: error.message });
        });
  };

  fetchExchangeRates = (currency) => {
    fetch(`https://api.frankfurter.app/latest?from=${currency}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ rates: data.rates, error: null });
        })
        .catch((error) => {
          this.setState({ error: error.message });
        });
  };

  handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    this.setState({ baseCurrency: newCurrency });
    this.fetchExchangeRates(newCurrency);
  };

  render() {
    const { currencies, baseCurrency, rates, error } = this.state;

    const labels = Object.keys(rates);
    const data = Object.values(rates);

    return (
        <div className="container shadow mt-5 pb-5">
          <div className="row justify-content-center">
            <div className="col-10">
              <h1 className="text-primary text-center mt-4 mb-4">Exchange Rates</h1>
              <select
                  className="form-select mb-3"
                  value={baseCurrency}
                  onChange={this.handleCurrencyChange}
              >
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                ))}
              </select>
              {error && <p className="text-danger">{error}</p>}
              <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                  <th>Currency</th>
                  <th>Rate</th>
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
                  labels={labels}
                  datasetLabel={`Exchange Rates for ${baseCurrency}`}
                  data={data}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default Exchange;
