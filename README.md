# Currency Exchange App

<div style="display: flex; justify-content: center; align-items: center;">
  <img width="49%" alt="Screenshot 2025-01-07 at 7 08 40 PM" src="https://github.com/user-attachments/assets/fb356580-486a-4a93-bead-06137d5a55b5" />
  <img width="49%" alt="Screenshot 2025-01-07 at 7 08 56 PM" src="https://github.com/user-attachments/assets/7f23b8a1-1a1b-444a-b4ab-a409d70770ca" />
</div>

## Website
https://currencyexchange-rates.netlify.app/ 

## Overview
The Currency Exchange App is a dynamic two-page web application that provides real-time currency conversion and historical exchange rate trends. Users can select currencies to view current exchange rates, compare them in a table, and analyze historical data through interactive graphs.

## Features
The Currency Exchange App offers the following features:
### Real-Time Currency Exchange
- Fetches live exchange rates using the Frankfurter API.
- Supports conversion for a wide range of global currencies.
### Historical Data Visualization
- Displays exchange rate trends over time with interactive charts powered by Chart.js.
- Compare historical rates between two currencies for selected time periods.
### Dynamic Dropdowns
- Easily select base and target currencies from a dynamically generated list.
- The currency list is cached for faster loading.
### Optimized API Calls
- Uses caching with localStorage to reduce redundant API requests.
- Batched requests minimize network latency.
### Responsive Design
- Fully responsive interface, ensuring a seamless experience across desktop, tablet, and mobile devices.
### Scalable Architecture
- Modular components and utility functions ensure the app can be extended easily.
- Includes reusable methods for data fetching and error handling.
### Intuitive User Interface
- A clean and user-friendly layout.
- Instant feedback for currency conversions.

## Technologies Used
### Frontend
- React: A JavaScript library for building user interfaces, ensuring fast and efficient rendering with a component-based architecture.
- Chart.js: A powerful charting library used to display historical exchange rate trends.
- Bootstrap: For responsive design and consistent styling across devices.
### Backend (API)
- Frankfurter API: Provides real-time and historical currency exchange rate data.
### State Management
- React State: Used for local state handling and managing component-level state.
### Caching
- localStorage: Enables caching of frequently used data, such as currency lists and exchange rates, to reduce API calls and improve performance.
### Development Tools
- Node.js: JavaScript runtime used for building and running the app locally.
- Yarn: Dependency management for installing and managing libraries.
- Webstorm: Recommended code editor for development.
### Version Control
- Git: Version control for tracking changes.
- GitHub: Hosting repository for collaboration and deployment.
### Deployment
- Netlify: (Optional) A platform for deploying and hosting the app with ease.

## Installation
To set up the Currency Exchange App locally, follow these steps:

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- yarn package manager

### Steps to Install
1. Clone the Repository:
```
git clone https://github.com/your-username/currency-exchange-app.git
cd currency-exchange-app
```
2. Install Dependencies:
```
yarn install
```
3. Start the Development Server:
```
yarn build
yarn start
```
4. Open your browser and navigate to:
http://localhost:3000
