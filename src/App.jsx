/** react */
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

/** components */
import AddFood from './components/addfood/addFood';
import AddDetail from './components/addfood/addDetail';
import AddMemo from './components/addfood/addMemo';
import Freezer from './components/freezer/freezer';
import Login from './components/login/login';
import MyInfo from './components/myInfo/myInfo';

/** styles */
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './app.module.css'

import uiActionCreator, { TOGGLE_RIGHT_MYINFO } from './actions/uiAction';
import { connect } from 'react-redux';
import MyEdit from './components/myEdit/myEdit';

/** context */
export const AuthServiceContext = React.createContext(null);
export const DataServiceContext = React.createContext(null);

const App = ({ authService, foodService, dataService , opened, toggle , spinerOnOff }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const nodeRef = useRef(null);
  

  useEffect((e, t) => { 
    if (location.pathname !== "/") { 
      authService.checkUserState((user) => { 
        try {
          if (user) {
            if (location.state['uid'] !== user.uid) {
              navigate('/', { replace: true })
            }
          }
        } catch (e) { 
          alert('접근 에러..')
          navigate('/', { replace: true });
        }
        
      })
    }
  }, [location])

  return (
    <div className={styles.app}>
      <DataServiceContext.Provider value={dataService}>
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
                  <Route path="/myEdit" element={<MyEdit />} />
              </Routes>    
              </div>
              <div className={`${styles.blinder} ${opened ? styles.active : ''}`} onClick={toggle}> </div>    
              <div className={`${styles.spiner} ${spinerOnOff ? styles.active : ''}`}><i></i></div>    
              <div className={`${styles.aside} ${opened ? styles.active : ''}`}>
                <MyInfo/>
              </div>
            </div>
          </CSSTransition>    
        </TransitionGroup>
      </AuthServiceContext.Provider>
      </DataServiceContext.Provider>
      </div>
  );
}

const mapStateToProp = (state) => { 
  return {
    opened: state.right_myinfo_opened,
    spinerOnOff: state.spiner_on_off
  }
}

const mapDispathToProp = (dispatch, ownProps) => { 
  return { toggle: () => dispatch(uiActionCreator.toggleRightMyInfo()) }
}

export default connect(mapStateToProp , mapDispathToProp)(App);
