import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { searchTerm } = this.state;
    searchTerm = searchTerm.trim();
    if (!searchTerm) {
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=b7da8d63`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }

        if (data.Response === 'True' && data.Search) {
          console.log(data);
          this.setState({ results: data.Search, error: '' });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  render() {
    const { searchTerm, results, error } = this.state;

    return (
      <div className="container shadow mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-primary text-center mt-4  mb-4">Currency Converter</h1>
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
            <div class="input-group mb-3">
              <span class="input-group-text">$</span>
              <input type="number" className="form-control mr-sm-2" placeholder="1.00" value={searchTerm} onChange={this.handleChange}/>
              <span class="input-group-text">.00</span>
              <select class="form-select">
                <option value="USD">USD US Dollar</option>
                <option value="EUR">EUR Euro</option>
              </select>
              <button class="btn btn-outline-secondary" type="button">&#8646;</button>
              <select class="form-select">
                <option value="EUR">EUR Euro</option>
                <option value="USD">USD US Dollar</option>
               </select>
              </div>
            </form>
            {(() => {
              if (error) {
                return error;
              }
              return results.map((movie) => {
                return <Movie key={movie.imdbID} movie={movie} />;
              })
            })()}
          </div>
        </div>
      </div>
    )
  }
}

export default CurrencyConverter;