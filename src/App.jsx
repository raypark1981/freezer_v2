import React, { useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddFood from './components/addfood/addFood';
import AddDetail from './components/addfood/addDetail';
import AddMemo from './components/addfood/addMemo';
import Freezer from './components/freezer/freezer';
import Login from './components/login/login';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const AuthServiceContext = React.createContext(null);
export const FoodServiceContext = React.createContext(null);

const App = ({ authService, foodService }) => {
  const location = useLocation();
  const nodeRef = useRef(null);
  return (
    <div className="app">
    <FoodServiceContext.Provider value={foodService}>
      <AuthServiceContext.Provider value={authService}>
        <TransitionGroup component={null}>
            <CSSTransition nodeRef={nodeRef} key={location.key} classNames="fade" timeout={300} >
                <div ref={nodeRef}>
                  <Routes location={location}>
                    <Route path="/" element={<Login/>} />
                    <Route path="/freezer" element={<Freezer />} />
                    <Route path="/addFood" element={<AddFood />} />
                    <Route path="/addDetail" element={<AddDetail />} />
                    <Route path="/addMemo" element={<AddMemo />} />
                </Routes>    
                </div>
            </CSSTransition>    
        </TransitionGroup>
        </AuthServiceContext.Provider>
      </FoodServiceContext.Provider>
    </div>
  );
}

export default App;
