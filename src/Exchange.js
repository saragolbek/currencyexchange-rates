import React from 'react';

class Exchange extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container shadow mt-5">
      <div className="row justify-content-center">
        <div className="col-10">
          <h1 className="text-primary text-center mt-4  mb-4">Exchange Rates</h1>
          <select className="bg-primary text-white rounded p-1 mb-2">
            <option value="USD">USD US Dollar</option>
            <option value="EUR">EUR Euro</option>
          </select>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Amount</th>
                <th>Change</th>
                <th>Chart</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>USD</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>EUR</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
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