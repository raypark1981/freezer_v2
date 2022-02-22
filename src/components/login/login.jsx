import React, { MouseEventHandler, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { AuthServiceContext } from '../../App';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const serviceContext = useContext(AuthServiceContext);
    const handleClick = (e) => {
        const type = e.currentTarget.id;
        const promise = serviceContext.signIn(type);
        
        promise.then(function (data) {
            goToFreezer(data);
        })
    }

    const goToFreezer = (user) => { 
        // getUserId(user.user.uid);
        navigate("./freezer", { state: { userId: user.user.uid }, replace: true });
        // navigate("./freezer", { state: {userId: user.user.uid}});
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