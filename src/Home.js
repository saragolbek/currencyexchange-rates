import React, { Component } from 'react';
import { fetchCurrencies } from './utils';
import ChartComponent from './ChartComponent';

class CurrencyConverter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            baseCurrency: 'USD',
            targetCurrency: 'EUR',
            amount: 1,
            convertedAmount: null,
            historicalRates: {},
            error: null,
        };
    }

    componentDidMount() {
        fetchCurrencies()
            .then((currencies) => this.setState({ currencies }))
            .catch((error) => this.setState({ error: error.message }));
    }

    handleConversion = async () => {
        const { baseCurrency, targetCurrency, amount } = this.state;
        try {
            const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${baseCurrency}&symbols=${targetCurrency}`);
            const data = await response.json();
            this.setState({
                convertedAmount: data.rates[targetCurrency] * amount,
                error: null,
            });

            await this.fetchHistoricalRates(baseCurrency, targetCurrency);
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    fetchHistoricalRates = async (base, target) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        try {
            const response = await fetch(`https://api.frankfurter.dev/v1/${startDate}..${endDate}?base=${base}&symbols=${target}`);
            const data = await response.json();
            this.setState({ historicalRates: data.rates, error: null });
        } catch (error) {
            this.setState({ error: error.message });
        }
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
                        {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
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
