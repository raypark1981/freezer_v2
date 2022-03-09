import React, { MouseEventHandler, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { AuthServiceContext, DataServiceContext } from '../../App';
import { connect } from 'react-redux';
import uiActionCreator from '../../actions/uiAction';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { clearSession, setSession } from '../../services/session';

const Login = ({ onOffSpiner }) => {
    const navigate = useNavigate();
    const serviceContext = useContext(AuthServiceContext);
    const dataContext = useContext(DataServiceContext);
    const [cookies, setCookies] = useCookies();

    const handleClick = (e) => {
        onOffSpiner();
        const type = e.currentTarget.id;
        const promise = serviceContext.signIn(type);
        
        promise.then(function (data) {
            goToFreezer(data.user);
        }).finally(() => { 
            setTimeout(() => { onOffSpiner() } , 2000)
        })
    }

    const goToFreezer = ({ accessToken, email, photoURL, displayName, uid }) => { 
        const addhour = moment(new Date()).add(1, 'days');
        setCookies('atok', accessToken, { expires: addhour._d });
        
        const exist = (data) => { 
            
            if (data.email !== email || data.photoURL !== photoURL || data.name !== displayName) {
                dataContext.setUserInfo(uid, {
                    ...data
                    , email: email
                    , photoURL: photoURL
                    , name: displayName
                    , lastLogin: moment(new Date()).format('yyyy-MM-DD hh:mm:ss')
                })
            } else { 
                dataContext.setUserInfo(uid, {
                    ...data,
                    lastLogin: moment(new Date()).format('yyyy-MM-DD hh:mm:ss')
                })
            }
            
            setSession('uid', uid);
            navigate("./freezer", { replace: true });
        }

        const notExist = () => { 
            dataContext.setUserInfo(uid, {
                userId: uid
                , email: email
                , photoURL: photoURL
                , name: displayName
                , lastLogin: moment(new Date()).format('yyyy-MM-DD hh:mm:ss')
            })    

            const freezerKey = "fz" + Date.now();
            // 기본 냉장고 
            dataContext.setFreezer(uid, {
                "key" : freezerKey , "name": "울집냉장고" ,"mainYN": "Y"
            })
            const sectionKey = "sc" + Date.now();
             // 기본 Section 
            dataContext.setSections(uid, freezerKey,  [{
                "key" : sectionKey , "name": "신선칸" , "order" : 1
            }])
            const basketKey = "ba" + Date.now();
            dataContext.setBasket(uid,basketKey,  {
                "name": "냉장고에서 장바구니를 추가해보세요!"
            })

            setSession('uid', uid);
            navigate("./freezer", { replace: true });
        }

        // db에서 사용자 정보 있나 확인
        dataContext.getUserInfo(uid, exist, notExist );
    }

    useEffect(() => { 
        clearSession();
    } , [])

    return(
        <section className={styles.login}>
            <div className={styles.logo}>
                <i></i>
            </div>
            <div className={styles.buttons}>
                <button id="facebook"
                    className={`${styles.button} ${styles.facebook}`}
                    onClick={handleClick}>Facebook 시작하기</button>
                <button id="google"
                    className={`${styles.button} ${styles.google}`}
                    onClick={handleClick}>Google 시작하기</button>          
            </div>
        </section>)
    
}
const mapDispatchToProps = (dispatch, ownProps) => { 
    return {
        onOffSpiner: () => dispatch(uiActionCreator.onOffSpiner())
    }   
}

export default connect(null, mapDispatchToProps)(Login);