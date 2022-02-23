import React, { useCallback, useRef, useState } from 'react';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './addFood.module.css';
import { AuthServiceContext } from '../../App';
import FoodCalendar from '../utils/FoodCalendar/foodCalendar';
import moment from 'moment';

const AddFood = ({ history }) => { 
    const [food, setFood] = useState({});
    const [actInputName, setActInputName] = useState(true);
    const [actFoodType, setFoodType] = useState(false);
    const [actKeepCalendar, setKeepCalendar] = useState(false);
    const [actExpiredCalendar, setExpiredCalendar] = useState(false);
    const refName = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const serviceContext = useContext(AuthServiceContext);
    const userId = location.state && location.state.userId;

    const handleInputName = (e) => {
        if (e.currentTarget.tagName === 'INPUT') { 
            setFood({
                ...food, 
                foodName: refName.current.value
            })
        }
        setActInputName(!actInputName);
    }

    const handleSelected = useCallback((value, target) => {
        if ('keep' === target) {
            setFood((food) => ({
                ...food,
                insertedDate: value
            }))
        } else {
            setFood((food) => ({
                ...food,
                expiredDate: value
            }))
        }
    } , []);
    const handleFoodType = useCallback((e) => { 
        setFood((food) => ({
            ...food,
            foodGrp: e.target.value
        }))
    }, [])

    const handleDateClick = (e) => { 
        const target = e.currentTarget.dataset.type;
        if ('keep' === target) {
            setKeepCalendar(!actKeepCalendar);
            !actKeepCalendar && setExpiredCalendar(false);
        } else { 
            setExpiredCalendar(!actExpiredCalendar);
            !actExpiredCalendar && setKeepCalendar(false);
        }
    }

    const backHome = () => { 
        navigate(-1);
    }

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
                {
                    actInputName && <>
                        
                        <div className={styles.ask}  onClick={handleInputName}>{!!food.foodName ? food.foodName : "입력하세요"}
                        <i></i>
                        </div>
                    </>
                }
                {
                    !actInputName && <>
                        <input ref={refName} type="text" className={styles.input_name} placeholder="이름을 입력하세요.." defaultValue={food.foodName} />
                        <input type="button" className={styles.btn_save_name} onClick={handleInputName}/>
                    </>
                }
                
                
            </div>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.foodcup}`}></button>
                <div className={styles.middle}>품목명</div>
                {actFoodType && <div className={styles.right_arrow}>선택하세요</div>}
                {!actFoodType && <FoodType foodGrp={food.foodGrp} onChange={handleFoodType }/>}
                
            </div>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.clock}`}></button>
                <div className={styles.middle}>
                    <div data-type="keep" onClick={handleDateClick}>
                        <div className={styles.keep_date_title}>
                        보관일시
                        </div>
                        <div className={styles.keep_date}>
                        {food.insertedDate && moment(food.insertedDate).format("YYYY년 MM월 DD일")}
                        </div>
                    </div>
                    <div className={styles.calendar_holder}>
                        <FoodCalendar active={actKeepCalendar} selected={handleSelected} setValueTarget={"keep"}/>
                    </div>
                    <div data-type="expired" onClick={handleDateClick}>
                        <div className={styles.expired_title}>
                        소비기한
                        </div>
                        <div className={styles.expired_date}>
                            {food.expiredDate && moment(food.expiredDate).format("YYYY년 MM월 DD일")}
                        </div>
                    </div>
                    <div className={styles.calendar_holder}>
                        <FoodCalendar active={actExpiredCalendar} selected={handleSelected} setValueTarget={"expired"}/>
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

const FoodType = React.memo(({foodGrp , onChange}) => { 
    return (
        <div className={ styles.food_type}>
        <select defaultValue={foodGrp} id="foodType" onChange={onChange}>
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
})

export default AddFood;

