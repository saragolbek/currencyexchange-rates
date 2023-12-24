import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

var result;
class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      error: '',
    };
    this.currencyChange = this.currencyChange.bind(this);
  }

  currencyChange(event) {
    event.preventDefault();
    fetch(`https://api.frankfurter.app/latest?from=${drop1.value}&to=USD,EUR,JPY`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }

        if (data.amount && data.rates) {
          document.getElementById("uRate").innerHTML = data.rates.USD || 1;
          document.getElementById("eRate").innerHTML = data.rates.EUR || 1;
          document.getElementById("jRate").innerHTML = data.rates.JPY || 1;
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  render() {
    const { results, error } = this.state;
    return (
      <div className="container shadow mt-5">
      <div className="row justify-content-center">
        <div className="col-10">
          <h1 className="text-primary text-center mt-4  mb-4">Exchange Rates</h1>
          <select className="bg-secondary text-white rounded p-1 mb-2" id="drop1" onInput={this.currencyChange}>
            <option value="USD">USD US Dollar</option>
            <option value="EUR">EUR Euro</option>
            <option value="JPY">JPY Japanese Yen</option>
          </select>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Rate</th>
                <th>Chart</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>USD</td>
                <td id="uRate"></td>
                <td></td>
              </tr>
              <tr>
                <td>EUR</td>
                <td id="eRate"></td>
                <td></td>
              </tr>
              <tr>
                <td>JPY</td>
                <td id="jRate"></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
  }
}


export default Exchange;