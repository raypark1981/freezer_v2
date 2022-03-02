import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AuthService from './services/auth_service';
import FoodService from './services/food_service';
import { BrowserRouter } from 'react-router-dom';
import DataService from './services/data_service';

/** redux*/
import { Provider } from 'react-redux';
import store from './store'

const authService = new AuthService();
const foodService = new FoodService();
const dataService = new DataService();

store.subscribe(() => { 
  // console.log(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <React.StrictMode>
      <App authService={authService} foodService={foodService} dataService={dataService}/>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
    ,
  document.getElementById('root')
);

