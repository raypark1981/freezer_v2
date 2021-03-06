import React, { useRef } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './addMemo.module.css';
import { getSession, setSession } from '../../services/session';
const AddMemo = () => { 
    const navigate = useNavigate();
    const { fz, fd } = useParams();
    const [tmpFood, setTmpFood] = useState(getSession('tmpFood', {}));
    const [memo, setMemo] = useState(!!tmpFood.food.memo ? tmpFood.food.memo : '');
    const refMemo = useRef();

    const goToPage = (e) => { 
        const target = e.currentTarget.dataset.target;
        switch (target) { 
            case 'back':
                navigate(`/addFood/${fz}`);
                setSession('tmpFood',{
                    food: {
                        ...tmpFood.food,
                        memo: refMemo.current.value
                    }
                })

                
                break;
        }
    }
    
    return (
        <section className={styles.add_memo}>
            <header className={styles.header}>
                <div>
                    
                </div>
                <h3 className={`${styles.middle} ${styles.align_center}` }>세부사항</h3>
                <div className={styles.right_holder}>
                    <button data-target="back" className={styles.right} onClick={goToPage}></button>
                </div>
            </header>
            <div className={styles.block}>
                <textarea ref={refMemo} placeholder='내용을 입력해주세요...' className={styles.memo} defaultValue={memo}></textarea>
            </div>
        </section>
    )
}

export default AddMemo;