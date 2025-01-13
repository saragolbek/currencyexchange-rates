import React from 'react';
import ChartComponent from './ChartComponent';

class CurrencyConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [], // List of all currencies
            baseCurrency: 'USD',
            targetCurrency: 'EUR',
            amount: 1,
            convertedAmount: null,
            historicalRates: {},
            error: null,
        };
    }

    componentDidMount() {
        this.fetchCurrencies();
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

    handleConversion = () => {
        const { baseCurrency, targetCurrency} = this.state;
        fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ convertedAmount: data.rates[targetCurrency], error: null });
                this.fetchHistoricalRates(baseCurrency, targetCurrency);
            })
            .catch((error) => {
                this.setState({ error: error.message });
            });
    };

    fetchHistoricalRates = (base, target) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${target}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ historicalRates: data.rates, error: null });
            })
            .catch((error) => {
                this.setState({ error: error.message });
            });
    };

    render() {
        const { currencies, baseCurrency, targetCurrency, amount, convertedAmount, historicalRates, error } = this.state;

        const labels = Object.keys(historicalRates);
        const data = Object.values(historicalRates).map((rate) => rate[targetCurrency]);

        return (
            <div className="container shadow mt-5">
                <h1 className="text-primary text-center mt-4 mb-4">Currency Converter</h1>
                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => this.setState({ amount: e.target.value })}
                    />
                    <select
                        className="form-select"
                        value={baseCurrency}
                        onChange={(e) => this.setState({ baseCurrency: e.target.value })}
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-secondary" onClick={this.handleConversion}>
                        Convert
                    </button>
                    <select
                        className="form-select"
                        value={targetCurrency}
                        onChange={(e) => this.setState({ targetCurrency: e.target.value })}
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {convertedAmount && (
                    <p className="text-success">
                        {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
                    </p>
                )}
                <ChartComponent
                    labels={labels}
                    datasetLabel={`Historical Rates (${baseCurrency} to ${targetCurrency})`}
                    data={data}
                    borderColor="green"
                />
            </div>
        );
    }
}

export default CurrencyConverter;
