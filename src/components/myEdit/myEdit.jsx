import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './myEdit.module.css';

const MyEdit = ({ }) => { 
    
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState(location.state);
    
    const goToPage = (e) => { 
        const target = e.currentTarget.dataset.target;
        switch (target) { 
            case 'save':
                navigate('/freezer', {})
                break;
            case 'delete':
                navigate('/freezer', {})
                break;
            
        }
    }




    return (
        <section className={styles.my_edit}>
            <header className={styles.header}>
                <div>
                    <button data-target="delete" className={styles.left} onClick={goToPage}></button>
                </div>
                <h3 className={`${styles.middle} ${styles.align_center}` }>회원정보</h3>
                <div>
                    <button data-target="save" className={styles.right} onClick={goToPage}></button>
                </div>
            </header>
            <h3 className={styles.email}>
                "작업이메일"
            </h3>
            <div className={styles.block} onClick={goToPage} data-target="addDetail" >
                <ul>
                    <li className={styles.info_box}>
                        <div className={styles.icon_name}>
                            <i></i>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.info_title}>이름</div>
                            <div className={styles.info_value}>작업중..</div>
                        </div>
                    </li>
                    <li className={styles.info_box}>
                        <div className={styles.icon_freezer}>
                            <i></i>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.info_title}>보유냉장고</div>
                            <div className={styles.info_value}>넣어라</div>
                        </div>
                    </li>
                    <li className={styles.info_box}>
                        <div className={styles.icon_level}>
                            <i></i>
                        </div>
                        <div className={`${styles.info} ${styles.last}`}>
                            <div className={styles.info_title}>회원등급</div>
                            <div className={styles.info_value}>일반</div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className={styles.block}>
                <button className={ styles.logout}>로그아웃</button>
            </div>
        </section>
    )
}

export default MyEdit;

