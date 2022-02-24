import React, { useRef, useState } from 'react';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthServiceContext } from '../../App';
import styles from './addDetail.module.css';

const AddDetail = () => { 
    const navigate = useNavigate();
    const location = useLocation();
    const serviceContext = useContext(AuthServiceContext);    
    const [state, setState] = useState(location.state);
    const [detail, setDetail] = useState(!!state.food.foodDetail ? state.food.foodDetail : '');

    const goToPage = (e) => { 
        const target = e.currentTarget.dataset.target;
        switch (target) { 
            case 'addFood':
                navigate("/addFood", {
                    state: {
                        ...state,
                        food: {
                            ...state.food,
                            foodDetail: detail
                        }
                    }
                });
                
                break;
        }
    }

    const handleKeypad= (e) => { 
        
        setDetail((value) => { 
            
            switch (e.target.dataset.value) { 
                case 'hide':
                    return value + ' ';
                case 'space':
                    return value + ' ';
                case 'back':
                    return value.substr(0, value.length - 1);
                default: 
                    return value += e.target.dataset.value;
            }
        })
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

    return (
        <section className={styles.add_detail}>
            <header className={styles.header}>
                <div>
                    
                </div>
                <h3 className={`${styles.middle} ${styles.align_center}` }>세부사항</h3>
                <div className={styles.right_holder}>
                    <button data-target="addFood" className={styles.right} onClick={goToPage}></button>
                </div>
            </header>
            <div className={styles.block}>
                <p className={styles.detail}>{detail}<i className={styles.cursor}></i></p>
            </div>
            <div className={styles.keypad_wrapper} onClick={ handleKeypad}>
                    {/* <div className={styles.hide_container}>
                        <div className={styles.row}>
                            <div className={styles.col}><button type="button" className={styles.hide_button} data-value="hide">∨</button></div>
                        </div>
                    </div> */}
                    <div className={styles.keypad_container}>
                    <div className={styles.num_container} >
                            <div className={styles.row}>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="7">7</button></div>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="8">8</button></div>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="9">9</button></div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="4">4</button></div>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="5">5</button></div>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="6">6</button></div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="1">1</button></div>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="2">2</button></div>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="3">3</button></div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col}><button type="button" className={`${styles.num_button} ${styles.hangle}`} data-value="space">space</button></div>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="0">0</button></div>
                                <div className={styles.col}><button type="button" className={styles.num_button} data-value="back">←</button></div>
                            </div>
                        </div>
                        <div className={styles.unit_container}>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                <ul>
                                    <li data-value="-">-</li>
                                    <li data-value="/">/</li>
                                    <li data-value="소분">소분</li>
                                    <li data-value="묶음">묶음</li>
                                    <li data-value="봉지">봉지</li>
                                    <li data-value="병">병</li>
                                    <li data-value="Kg">Kg</li>
                                    <li data-value="g">g</li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            
        </section>
    )
}

export default AddDetail;