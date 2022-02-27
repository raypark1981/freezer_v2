import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './myInfo.module.css'
const MyInfo = ({}) => { 
    const location = useLocation();
    const [state, setState] = useState(location.state);
    
    return (<section className={styles.section}>
    <header className={styles.header}>
        {!!state && <div className={styles.me_pic}>
            <img src={state && state.user.photoURL} alt="me" />
        </div>}
        <div className={styles.email}>{state ? state.user.email : "needs Login.."}</div>
    </header>
    <div className={styles.sub_actions}>
        <div className={`${styles.sub_action} ${styles.warning}`}>
            <i></i>
        {state && <p className={styles.count}>1</p>}
        </div>
        <div className={`${styles.sub_action} ${styles.recipe}`}>
            <i></i>
            { state && <p className={styles.count}>1</p>}
        </div>
        <div className={`${styles.sub_action} ${styles.basket}`}>
            <i></i>
            { state && <p className={styles.count}>1</p>}
        </div>
        </div>
        
    {state && <div className={styles.actions}>
        <div className={`${styles.action} ${styles.my_edit} ${styles.line_right}`}>
            <i></i>
            <button>정보수정</button>
        </div>
        <div className={`${styles.action} ${styles.my_ref} ${styles.line_right}`}>
            <i></i>
            <button>내 냉장고</button>
        </div>
        <div className={`${styles.action} ${styles.my_basket}`}>
            <i></i>
            <button>장바구니</button>
        </div>
        <div className={`${styles.action} ${styles.my_recipe}  ${styles.line_top} ${styles.line_right}`}>
            <i></i>
            <button>추천레시피</button>
        </div>
        <div className={`${styles.action} ${styles.my_notice} ${styles.line_top} ${styles.line_right}`}>
            <i></i>
            <button>공지사항</button>
        </div>
        <div className={`${styles.action} ${styles.my_ask} ${styles.line_top}`}>
            <i></i>
            <button>1:1문의</button>
        </div>
    </div>}
</section>)
}

export default MyInfo;
