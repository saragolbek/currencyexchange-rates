import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from './Home';
import Exchange from './Exchange';
import './App.css';

const NotFound = () => {
    return <h2>404 Not Found</h2>;
};

const Footer = React.memo(() => (
    <footer className="mt-auto">
        <div className="container-fluid pt-3 pb-2 bg-light mt-5">
            <p className="navbar-text me-auto">
                Created by: <a href="https://saragolbekportfolio.netlify.app/" className="text-decoration-none">Sara Golbek</a>
            </p>
        </div>
    </footer>
));

const App = () => {
    const navLinks = [
        { path: "/", label: "Currency Converter" },
        { path: "/Exchange/1", label: "Exchange Rates" }
    ];

    return (
        <Router>
            <nav className="navbar sticky-top navbar-dark bg-primary">
                <div className="container-fluid justify-content-end">
                    <span className="navbar-text me-auto">Smart Exchange</span>
                    {navLinks.map(({ path, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) => `nav-link p-1 rounded hover link-light me-4 ${isActive ? 'active' : ''}`}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Exchange/:id" element={<Exchange />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
