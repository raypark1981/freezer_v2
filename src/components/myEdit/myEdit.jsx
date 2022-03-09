import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthServiceContext, DataServiceContext } from '../../App';
import { clearSession, getSession } from '../../services/session';

import styles from './myEdit.module.css';

const MyEdit = ({ }) => {
    
    const dataServiceContext = useContext(DataServiceContext);
    const authServiceContext = useContext(AuthServiceContext);
    const navigate = useNavigate();
    const [myInfo, setMyInfo] = useState();
    const [myFreezer, setMyFreezer] = useState({});
    
    const goToPage = (e) => {
        const target = e.currentTarget.dataset.target;
        switch (target) {
            case 'save':
                navigate('/freezer', {})
                break;
        }
    }

    const signOut = useCallback(() => {
        authServiceContext.signOut().then((d) => {
            clearSession();
            window.location.replace('/');
        }).catch((error) => {
            console.log(error)
        })
    }, [authServiceContext]);

    useEffect(() => {
        dataServiceContext.getUserInfo(getSession('uid'), setMyInfo);
        dataServiceContext.getFreezer(getSession('uid'), setMyFreezer);
    }, [])

    return (
        <section className={styles.my_edit}>
            <header className={styles.header}>
                <h3 className={`${styles.middle} ${styles.align_center}` }>회원정보</h3>
                <div className={styles.right}>
                    <button data-target="save" onClick={goToPage}></button>
                </div>
            </header>
            <h3 className={styles.email}>
                {myInfo?.email}
            </h3>
            <div className={styles.block} onClick={goToPage} data-target="addDetail" >
                <ul>
                    <li className={styles.info_box}>
                        <div className={styles.icon_name}>
                            <i></i>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.info_title}>이름</div>
                            <div className={styles.info_value}>{myInfo?.name}</div>
                        </div>
                    </li>
                    <li className={styles.info_box}>
                        <div className={styles.icon_freezer}>
                            <i></i>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.info_title}>보유냉장고</div>
                            <div className={styles.info_value}>{
                                Object.keys(myFreezer).length > 0  && Object.keys(myFreezer).map((key) => { 
                                    return <Link  key={myFreezer[key].key} to={`/freezer/${myFreezer[key].key}`}><div>{myFreezer[key].name}</div></Link> 
                                })
                            }
                            </div>
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
                <button className={styles.logout} onClick={ signOut}>로그아웃</button>
            </div>
        </section>
    )
}

export default MyEdit;

