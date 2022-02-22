import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './addfood.module.css';
import { AuthServiceContext } from '../../App';
import FoodCalendar from '../utils/FoodCalendar/FoodCalendar';


const AddFood = ({ history }) => { 
    const [actInputName, setActInputName] = useState(true);
    const [actFoodType, setFoodType] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const serviceContext = useContext(AuthServiceContext);
    const userId = location.state && location.state.userId;

    const handleInputName = () => { 
        setActInputName(!actInputName);
    }
    const backHome = () => { 
        navigate(-1);
    }
    // let date = moment(new Date());
    // // 년-월-일
    // console.log(date.format("YYYY년 MM월 DD일")); // 2021-01-27
    
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
                {
                    actInputName && <>
                        <div className={styles.middle}>식품명</div>
                        <div className={styles.ask}>입력하세요</div>
                        <i onClick={handleInputName}></i>
                    </>
                }
                {
                    !actInputName && <>
                        <input type="text" className={styles.input_name} placeholder="이름을 입력하세요.." />
                        <input type="button" className={styles.btn_save_name} onClick={handleInputName}/>
                    </>
                }
                
                
            </div>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.foodcup}`}></button>
                <div className={styles.middle}>품목명</div>
                {actFoodType && <div className={styles.right_arrow}>선택하세요</div>}
                {!actFoodType && <FoodType />}
                
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
                    <div>
                        <FoodCalendar active={true}/>
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

const FoodType = () => { 
    return (
        <div className={ styles.food_type}>
        <select id="foodType">
        <option value="">전 체</option>
        <option value="FM001">곡류 및 그 제품</option>
        <option value="FM002">감자 및 전분류</option>
        <option value="FM003">당류 및 그 제품</option>
        <option value="FM004">두류 및 그 제품</option>
        <option value="FM005">견과류</option>
        <option value="FM006">채소류</option>
        <option value="FM007">버섯류</option>
        <option value="FM008">과실류</option>
        <option value="FM009">육류 및 그 제품</option>
        <option value="FM010">난류</option>
        <option value="FM011">어패류</option>
        <option value="FM012">해조류</option>
        <option value="FM013">우유 및 유제품</option>
        <option value="FM014">유지류</option>
        <option value="FM015">음료 및 주류</option>
        <option value="FM016">조미료류</option>
        <option value="FM017">조리가공식품류</option>
        <option value="FM018">기타</option>
    </select></div>);
}

export default AddFood;

