import React, { useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddFood from './components/addfood/addFood';
import AddDetail from './components/addfood/addDetail';
import AddMemo from './components/addfood/addMemo';
import Freezer from './components/freezer/freezer';
import Login from './components/login/login';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './app.module.css'
import MyInfo from './components/myInfo/myInfo';

export const AuthServiceContext = React.createContext(null);
export const FoodServiceContext = React.createContext(null);
export const DataServiceContext = React.createContext(null);

const App = ({ authService, foodService, dataService }) => {
  const location = useLocation();
  const nodeRef = useRef(null);
  return (
    <div className={styles.app}>
      <DataServiceContext.Provider value={dataService}>
      <FoodServiceContext.Provider value={foodService}>
      <AuthServiceContext.Provider value={authService}>
        <TransitionGroup component={null}>
          <CSSTransition nodeRef={nodeRef} key={location.key} classNames="fade" timeout={300} >
            <div className={styles.app_body}>
              <div className={styles.main} ref={nodeRef}>
              <Routes location={location}>
                  <Route path="/" element={<Login/>} />
                  <Route path="/freezer" element={<Freezer />} />
                  <Route path="/addFood" element={<AddFood />} >
                    <Route path=":key" element={<AddFood />} />
                  </Route>
                  <Route path="/addDetail" element={<AddDetail />} />
                  <Route path="/addMemo" element={<AddMemo />} />
              </Routes>    
              </div>
              <div className={styles.aside}>
                <MyInfo/>
              </div>
            </div>
          </CSSTransition>    
        </TransitionGroup>
      </AuthServiceContext.Provider>
      </FoodServiceContext.Provider>
      </DataServiceContext.Provider>
    </div>
  );
}

export default App;
