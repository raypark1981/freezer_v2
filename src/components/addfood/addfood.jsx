import React, { useCallback, useRef, useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './addFood.module.css';

import FoodCalendar from '../utils/FoodCalendar/foodCalendar';
import moment from 'moment';
import { getSession, setSession } from '../../services/session';
import { DataServiceContext } from '../../App';

const AddFood = ({  }) => {
    const { fz, fd } = useParams();
    const refName = useRef();
    const navigate = useNavigate();
    // const location = useLocation();
    const [food, setFood] = useState({});
    const dataServiceContext = useContext(DataServiceContext);

    const [actInputName, setActInputName] = useState(true);
    const [actKeepCalendar, setActKeepCalendar] = useState(false);
    const [actExpiredCalendar, setActExpiredCalendar] = useState(false);
    const [tmpFood, setTmpFood] = useState(getSession('tmpFood', {}));
    const [sectionKey, setSectionKey] = useState(getSession('lastSectionKey', ''));
    
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
        const date = moment(value).format("YYYY-MM-DD");
        if ('keep' === target) {
            setFood((food) => ({
                ...food,
                insertedDate: date
            }))
        } else {
            setFood((food) => ({
                ...food,
                expiredDate: date
            }))
        }
    }, []);

    const handleFoodType = useCallback((e) => {
        if (!e.target.dataset.key) return;
        setFood((food) => ({
            ...food,
            foodGrp: e.target.dataset.key
        }))
    }, [])

    const handleDateClick = (e) => {
        const target = e.currentTarget.dataset.type;
        if ('keep' === target) {
            setActKeepCalendar(!actKeepCalendar);
            !actKeepCalendar && setActExpiredCalendar(false);
        } else {
            setActExpiredCalendar(!actExpiredCalendar);
            !actExpiredCalendar && setActKeepCalendar(false);
        }
    }
    
    const goToPage = (e) => {
        const target = e.currentTarget.dataset.target;
        switch (target) {
            case 'close':
                navigate(`/freezer/${fz}`)
                break;
            case 'save':
                if (!food.foodName) {
                    alert('푸드 이름이 필요합니다.');
                    return;
                }
                if (!food.key) {
                    const foodKey = ('fd' + Date.now());
                    dataServiceContext.setFood(getSession('uid'), sectionKey, { ...food, key: foodKey });
                } else {
                    dataServiceContext.updateFood(getSession('uid'), sectionKey, { ...food });
                }
                navigate(`/freezer/${fz}`)
                break;
            case 'delete':
                if (!window.confirm('삭제하시겠습니까?')) return;
                    
                dataServiceContext.deleteFood(getSession('uid'), sectionKey, food.key);
                navigate(`/freezer/${fz}`)

                break;
            case 'addDetail':
                // navigate(`/addDetail/${fz}`, { state: { ...state, food: { ...food } }})
                setSession('tmpFood' , { food: { ...food }})
                navigate(`/addDetail/${fz}`)
                break;
            case 'addMemo':
                // navigate(`/addMemo/${fz}`, { state: { ...state, food: { ...food } } })
                setSession('tmpFood', { food: { ...food }})
                navigate(`/addMemo/${fz}`)
                break;
        }
    }

    useEffect(() => {
        if (!!fd) {
            dataServiceContext.getFoods(getSession('uid'), `${sectionKey}/${fd}`).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setFood(data);
                    
                } else {
                    navigate(`/freezer/${fz}`, { replace: false })
                }
            });
        } else {
            !!tmpFood.food && setFood(!!tmpFood.food ? tmpFood.food : {} );
        }
    }, [])

    return (
        <section className={styles.add_food}>
            <header className={styles.header}>
                <div>
                    <button data-target="close" className={styles.left} onClick={goToPage}></button>
                </div>
                <h3 className={`${styles.middle} ${styles.align_center}` }>추가</h3>
                <div>
                    <button data-target="save" className={styles.right} onClick={goToPage}></button>
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
                        <input ref={refName} type="text" className={styles.input_name} onBlur={handleInputName} placeholder="이름을 입력하세요.." defaultValue={food.foodName} />
                        <input type="button" className={styles.btn_save_name} onClick={handleInputName}/>
                    </>
                }


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
                        {
                            <FoodCalendar date={typeof food.insertedDate === 'string' ? new Date(food.insertedDate) : food.insertedDate} active={actKeepCalendar} selected={handleSelected} setValueTarget={"keep"} />
                        }
                    </div>
                    <div data-type="expired" onClick={handleDateClick}>
                        <div className={styles.expired_title}>
                        소비기한
                        </div>
                        <div className={styles.expired_date}>
                            {food.expiredDate && moment(new Date(food.expiredDate)).format("YYYY년 MM월 DD일")}
                        </div>
                    </div>
                    <div className={styles.calendar_holder}>
                        {
                            <FoodCalendar date={typeof food.expiredDate === 'string' ?new Date(food.expiredDate): food.expiredDate} active={actExpiredCalendar} selected={handleSelected} setValueTarget={"expired"} />
                        }
                    </div>
                </div>
            </div>
            <div className={styles.block} onClick={goToPage} data-target="addDetail" >
                <button className={`${styles.icon} ${styles.chat}`}></button>
                <div className={styles.middle}>세부사항</div>
                <p className={styles.ask}> {food.foodDetail} </p>
                <div className={styles.right_arrow}></div>
            </div>
            <div className={styles.block} onClick={goToPage} data-target="addMemo" >
                <button className={`${styles.icon} ${styles.memo}`}></button>
                <div className={styles.middle}>메모</div>
                <p className={styles.ask}> {food.memo} </p>
                <div className={styles.right_arrow}></div>
            </div>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.foodcup}`}></button>
                <div className={styles.middle}>품목명</div>
            </div>
            <div className={`${styles.block} ${styles.mart0}`}>
                <FoodType foodGrp={food.foodGrp} onChange={handleFoodType } />
            </div>
            { food.key && <div className={styles.block}>
                <div className={styles.button_box}>
                    <button data-target="delete" className={styles.delete} onClick={goToPage}>삭제</button>
                </div>
            </div>}
        </section>
    )
}

const FoodType = React.memo(({ foodGrp, onChange }) => {
    const foodGrps = [
        { key : 'FM013', text: '우유 및 유제품' }
        ,{ key : 'FM009', text: '육류 및 그 제품' }
        ,{ key : 'FM011', text: '어패류' }
        ,{ key : 'FM012', text: '해조류' }
        ,{ key : 'FM006', text: '채소류' }
        ,{ key : 'FM015', text: '음료 및 주류' }
        ,{ key : 'FM007', text: '버섯류' }
        ,{ key : 'FM008', text: '과실류' }
        ,{ key : 'FM014', text: '유지류' }
        ,{ key : 'FM005', text: '견과류' }
        , { key : 'FM001', text: '곡류 및 그 제품' }
        ,{ key : 'FM002', text: '감자 및 전분류' }
        ,{ key : 'FM003', text: '당류 및 그 제품' }
        ,{ key : 'FM004', text: '두류 및 그 제품' }
        ,{ key : 'FM010', text: '난류' }
        ,{ key : 'FM016', text: '조미료류' }
        ,{ key : 'FM017', text: '조리가공식품류' }
        // ,{ key: 'FM018', text: '직접등록' }
    ]
    return (
        <div className={ styles.food_type}>
            <ul className={styles.food_grps} id="foodType" onClick={onChange}>
                {
                    foodGrps.map((i) => {
                        return <li key={i.key} data-key={i.key} className={foodGrp === i.key ? styles.selected : ''}>{i.text}</li>;
                    })
                }
            </ul>
        </div>);
})

export default AddFood;

