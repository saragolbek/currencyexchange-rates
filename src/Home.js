import React from 'react';
import { Link } from "react-router-dom";
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import { json, checkStatus } from './utils';



var result;
class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      error: '',
    };
    this.currencyChange = this.currencyChange.bind(this);
    this.switchValues = this.switchValues.bind(this);
    this.chartRef = React.createRef();
  }
  
  switchValues(event) {
    var second=document.getElementById("drop2");
    var first=document.getElementById("drop1");
    var temp;
    temp=second.value;
    second.value=first.value;
    first.value=temp;
    this.currencyChange(event);
  };

  currencyChange(event) {
    event.preventDefault();
    fetch(`https://api.frankfurter.app/latest?from=${drop1.value}&to=${drop2.value}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }

        if (data.amount && data.rates) {
          const data1 = drop1.value;
          const data2 = drop2.value;
          result = data.rates[drop2.value] * amount.value;
          document.getElementById("present").innerHTML = '<h3><span id="one"></span> &rarr; <span id="two"></span></h3><p>&#61; <span id="converted"></span></P>';
          document.getElementById("one").innerHTML =  drop1.value;
          document.getElementById("two").innerHTML =  drop2.value;
          document.getElementById("converted").innerHTML =  result;
          this.getHistoricalRates(data1, data2);
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }
  
  getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${drop1.value}&to=${drop2.value}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
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
            label: label,
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
  //...

  render() {
    const { results, error } = this.state;

    return (
      <div className="container shadow mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-primary text-center mt-4  mb-4">Currency Converter</h1>
            <form className="form-inline my-4">
            <div class="input-group mb-3">
              <span class="input-group-text">$</span>
              <input type="number" className="form-control mr-sm-2" placeholder="0" id="amount" onInput={this.currencyChange}/>
              <span class="input-group-text">.00</span>
              <select class="form-select" id="drop1" onInput={this.currencyChange}>
                <option value="USD">USD US Dollar</option>
                <option value="EUR">EUR Euro</option>
                <option value="JPY">JPY Japanese Yen</option>
              </select>
              <button class="btn btn-outline-secondary" type="button" onClick={this.switchValues}>&#8646;</button>
              <select class="form-select" id="drop2" onInput={this.currencyChange}>
                <option value="EUR">EUR Euro</option>
                <option value="USD">USD US Dollar</option>
                <option value="JPY">JPY Japanese Yen</option>
               </select>
               <button class="btn btn-outline-secondary" type="button" onClick={this.currencyChange}>Submit</button>
              </div>
              <div id="present" class="text-primary">
              </div>
            </form>
            <canvas ref={this.chartRef} />
          </div>
        </div>
      </div>
    )
  }
}



export default CurrencyConverter;