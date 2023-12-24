import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import Exchange from './Exchange';
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <nav className="navbar sticky-top navbar-dark bg-primary">
        <div class="container-fluid justify-content-end">
          <span class="navbar-text me-auto">Smart Exchange</span>
          <a class="nav-link p-1 rounded hover link-light me-4" href="/">Currency Converter</a>
          <a class="nav-link p-1 rounded hover link-light me-4" href="/Exchange/:id">Exchange Rates</a>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Exchange/:id" component={Exchange} />
        <Route component={NotFound} />
      </Switch>
      <div className="container py-3">
      </div>
      <footer className="mt-5">
      <div class="container-fluid p-3 bg-light mt-5">
          <p class="navbar-text me-auto">Created by: <a href="https://saragolbekportfolio.netlify.app/">Sara Golbek</a></p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
