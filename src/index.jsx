import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AuthService from './services/auth_service';
import FoodService from './services/food_service';
import { BrowserRouter } from 'react-router-dom';
import DataService from './services/data_service';

const authService = new AuthService();
const foodService = new FoodService();
const dataService = new DataService();

ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
      <App authService={authService} foodService={foodService} dataService={dataService}/>
      </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

