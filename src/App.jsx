import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddFood from './components/addfood/addfood';
import Freezer from './components/freezer/freezer';
import Login from './components/login/login';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const AuthServiceContext = React.createContext(null);
export const FoodServiceContext = React.createContext(null);

const App = ({ authService, foodService }) => {
  const location = useLocation();
  return (
    <div className="app">
    <FoodServiceContext.Provider value={foodService}>
      <AuthServiceContext.Provider value={authService}>
        <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="fade" timeout={300} >
            <Routes location={location}>
              <Route path="/" element={<Login/>} />
              <Route path="/freezer" element={<Freezer />} />
              <Route path="/addFood" element={<AddFood />} />
            </Routes>    
            </CSSTransition>    
        </TransitionGroup>
        </AuthServiceContext.Provider>
      </FoodServiceContext.Provider>
    </div>
  );
}

export default App;
