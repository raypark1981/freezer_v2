import React from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './addfood.module.css';
import { AuthServiceContext } from '../../App';
import { useEffect } from 'react';

const AddFood = ({history}) => { 
    const navigate = useNavigate();
    const location = useLocation();
    const serviceContext = useContext(AuthServiceContext);
    const userId = location.state && location.state.userId;

    const backHome = () => { 
        navigate(-1);
    }

    // console.log(history);
    useEffect(() => { 
        serviceContext.checkUserState((user) => { 
            if (user) { 
                if (userId !== user.uid) { 
                    alert('사용자가 없습니다. ')
                    navigate('/', {replace : true})
                }
            }
        })
    }, [])


    return (
        <section className={styles.add_food}>
            <header className={styles.header}>
                <div>
                    <button className={styles.left} onClick={ backHome}></button>
                </div>
                <h3 className={`${styles.middle} ${styles.align_center}` }>추가</h3>
                <div>
                    <button className={styles.right} onClick={ backHome}></button>
                </div>
            </header>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.foodcup}`}></button>
                <div className={styles.middle}>식품명</div>
                <div className={styles.ask}>입력하세요</div>
                <i></i>
            </div>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.foodcup}`}></button>
                <div className={styles.middle}>품목명</div>
                <div className={styles.right_arrow}>선택하세요
                </div>
            </div>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.clock}`}></button>
                <div className={styles.middle}>
                    <div className={styles.keepdate_title}>
                    보관일시
                    </div>
                    <div className={styles.keepdate}>
                    2022년 02월 01일
                    </div>
                    <div className={styles.consume_title}>
                    소비기한
                    </div>
                    <div className={styles.consume_date}>
                    2022년 02월 01일
                    </div>
                </div>
            </div>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.chat}`}></button>
                <div className={styles.middle}>세부사항</div>
                <div className={styles.right_arrow}></div>
            </div>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.memo}`}></button>
                <div className={styles.middle}>메모</div>
                <div className={styles.right_arrow}></div>
            </div>
        </section>
    )
}

export default AddFood;