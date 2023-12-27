import React from 'react';
import { Link } from "react-router-dom";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
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
    this.chartRef = React.createRef();
  }

  currencyChange(event) {
    event.preventDefault();
    fetch(`https://api.frankfurter.app/latest?from=${drop1.value}&to=USD,EUR,JPY`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }

        if (data.amount && data.rates) {
          const uData = data.rates.USD || 1;
          const eData = data.rates.EUR || 1;
          const jData = data.rates.JPY || 1;
          const chartLabels = ["USD", "EUR", "JPY"];
          const chartData = [uData, eData, jData];
          const chartLabel = `Exchange Rates`;
          document.getElementById("uRate").innerHTML = uData;
          document.getElementById("eRate").innerHTML = eData;
          document.getElementById("jRate").innerHTML = jData;
          console.log(chartData);
          this.buildChart(chartLabels, chartData, chartLabel);
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }
  
  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
  }
 
  render() {
    const { results, error } = this.state;
    return (
      <div className="container shadow mt-5 pb-5">
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>USD</td>
                <td id="uRate"></td>
              </tr>
              <tr>
                <td>EUR</td>
                <td id="eRate"></td>
              </tr>
              <tr>
                <td>JPY</td>
                <td id="jRate"></td>
              </tr>
            </tbody>
          </table>
          <canvas ref={this.chartRef} />
        </div>
      </div>
    </div>
    )
  }
}

export default Exchange;