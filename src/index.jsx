import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AuthService from './services/auth_service';
import FoodService from './services/food_service';
import { BrowserRouter } from 'react-router-dom';

const authService = new AuthService();
const foodService = new FoodService();

ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
      <App authService={authService} foodService={foodService}/>
      </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

