import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './myInfo.module.css'
const MyInfo = () => { 
    const location = useLocation();
    const [state, setState] = useState(location.state);
    
    return (<section className={styles.section}>
    <header className={styles.header}>
        <div className={styles.me_pic}>
            <img src={state.user.photoURL} alt="me" />
        </div>
        <div className={styles.email}>{state.user.email}</div>
    </header>
    <div className={styles.sub_actions}>
        <div className={`${styles.sub_action} ${styles.warning}`}>
            <i></i>
            <p className={styles.count}>1</p>
        </div>
        <div className={`${styles.sub_action} ${styles.recipe}`}>
            <i></i>
            <p className={styles.count}>1</p>
        </div>
        <div className={`${styles.sub_action} ${styles.basket}`}>
            <i></i>
            <p className={styles.count}>1</p>
        </div>
    </div>
    <div className={styles.actions}>
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
    </div>
</section>)
}


export default MyInfo;
