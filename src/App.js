import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
                <div className="container-fluid justify-content-end">
                    <span className="navbar-text me-auto">Smart Exchange</span>
                    <Link to="/" className="nav-link p-1 rounded hover link-light me-4">
                        Currency Converter
                    </Link>
                    <Link to="/Exchange/1" className="nav-link p-1 rounded hover link-light me-4">
                        Exchange Rates
                    </Link>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Exchange/:id" element={<Exchange />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <footer className="mt-auto">
                <div className="container-fluid pt-3 pb-2 bg-light mt-5">
                    <p className="navbar-text me-auto">
                        Created by: <a href="https://saragolbekportfolio.netlify.app/" className="text-decoration-none">Sara Golbek</a>
                    </p>
                </div>
            </footer>
        </Router>
    );
}

export default App;
