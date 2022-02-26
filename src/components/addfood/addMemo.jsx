import React, { useRef } from 'react';
import { useContext, useEffect , useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthServiceContext } from '../../App';
import styles from './addMemo.module.css';

const AddMemo = () => { 
    const navigate = useNavigate();
    const location = useLocation();
    const serviceContext = useContext(AuthServiceContext);
    
    const [state, setState] = useState(location.state);
    const [memo, setMemo] = useState(!!state.food.memo ? state.food.memo : '');
    const refMemo = useRef();

    const goToPage = (e) => { 
        const target = e.currentTarget.dataset.target;
        switch (target) { 
            case 'back':
                navigate("/addFood", {
                    state: {
                        ...state,
                        food: {
                            ...state.food,
                            memo: refMemo.current.value
                        }
                    }
                });
                
                break;
        }
    }
    
    useEffect(() => { 
        serviceContext.checkUserState((user) => { 
            if (user) { 
                if (state.user.userId !== user.uid) { 
                    alert('사용자가 없습니다. ')
                    navigate('/', {replace : true})
                }
            }
        })
    }, [])
    console.log(state);
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