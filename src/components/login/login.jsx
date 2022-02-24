import React, { MouseEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { AuthServiceContext, DataServiceContext } from '../../App';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const serviceContext = useContext(AuthServiceContext);
    const dataContext = useContext(DataServiceContext);
    const [photoURL, setPhotoURL] = useState();

    const handleClick = (e) => {
        const type = e.currentTarget.id;
        const promise = serviceContext.signIn(type);
        
        promise.then(function (data) {
            goToFreezer(data);
        })
    }

    const goToFreezer = (user) => { 
        const exist = (data) => { 
            if (data.email !== user.user.email || data.photoURL !== user.user.photoURL || data.name !== user.user.displayName) { 
                dataContext.setUserInfo(user.user.uid , {
                    email: user.user.email
                    , photoURL: user.user.photoURL
                    , name: user.user.displayName
                })
            }
            navigate("./freezer", { state: { user: { userId: user.user.uid, ...data } }, replace: true });
        }

        const notExist = () => { 
            dataContext.setUserInfo(user.user.uid, {
                userId: user.user.uid
                , email: user.user.email
                , photoURL: user.user.photoURL
                , name: user.user.displayName
            })    

            const freezerKey = "fz" + Date.now();
            // 기본 냉장고 
            dataContext.setFreezers(user.user.uid, {
                "key" : freezerKey , "name": "울집냉장고" ,"mainYN": "Y"
            })
            const sectionKey = "sc" + Date.now();
             // 기본 Section 
             dataContext.setSections(user.user.uid, freezerKey,  [{
                "key" : sectionKey , "name": "신선칸" , "order" : 1
            }])


            navigate("./freezer", {
                state: {
                    user: {
                        userId: user.user.uid
                        , email: user.user.email
                        , photoURL: user.user.photoURL
                        , name: user.user.displayName
                    }
                }, replace: true
            });
        }

        // db에서 사용자 정보 있나 확인
        dataContext.getUserInfo(user.user.uid, exist, notExist );
        // navigate("./freezer", { state: { userId: user.user.uid }, replace: true });
        
    }

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

export default Login;