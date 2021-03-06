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
                    alert('?????? ????????? ???????????????.');
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
                if (!window.confirm('?????????????????????????')) return;
                    
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
                <h3 className={`${styles.middle} ${styles.align_center}` }>??????</h3>
                <div>
                    <button data-target="save" className={styles.right} onClick={goToPage}></button>
                </div>
            </header>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.foodcup}`}></button>
                <div className={styles.middle}>?????????</div>
                {
                    actInputName && <>
                        <div className={styles.ask}  onClick={handleInputName}>{!!food.foodName ? food.foodName : "???????????????"}
                        <i></i>
                        </div>
                    </>
                }
                {
                    !actInputName && <>
                        <input ref={refName} type="text" className={styles.input_name} onBlur={handleInputName} placeholder="????????? ???????????????.." defaultValue={food.foodName} />
                        <input type="button" className={styles.btn_save_name} onClick={handleInputName}/>
                    </>
                }


            </div>

            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.clock}`}></button>
                <div className={styles.middle}>
                    <div data-type="keep" onClick={handleDateClick}>
                        <div className={styles.keep_date_title}>
                        ????????????
                        </div>
                        <div className={styles.keep_date}>
                        {food.insertedDate && moment(food.insertedDate).format("YYYY??? MM??? DD???")}
                        </div>
                    </div>
                    <div className={styles.calendar_holder}>
                        {
                            <FoodCalendar date={typeof food.insertedDate === 'string' ? new Date(food.insertedDate) : food.insertedDate} active={actKeepCalendar} selected={handleSelected} setValueTarget={"keep"} />
                        }
                    </div>
                    <div data-type="expired" onClick={handleDateClick}>
                        <div className={styles.expired_title}>
                        ????????????
                        </div>
                        <div className={styles.expired_date}>
                            {food.expiredDate && moment(new Date(food.expiredDate)).format("YYYY??? MM??? DD???")}
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
                <div className={styles.middle}>????????????</div>
                <p className={styles.ask}> {food.foodDetail} </p>
                <div className={styles.right_arrow}></div>
            </div>
            <div className={styles.block} onClick={goToPage} data-target="addMemo" >
                <button className={`${styles.icon} ${styles.memo}`}></button>
                <div className={styles.middle}>??????</div>
                <p className={styles.ask}> {food.memo} </p>
                <div className={styles.right_arrow}></div>
            </div>
            <div className={styles.block}>
                <button className={`${styles.icon} ${styles.foodcup}`}></button>
                <div className={styles.middle}>?????????</div>
            </div>
            <div className={`${styles.block} ${styles.mart0}`}>
                <FoodType foodGrp={food.foodGrp} onChange={handleFoodType } />
            </div>
            { food.key && <div className={styles.block}>
                <div className={styles.button_box}>
                    <button data-target="delete" className={styles.delete} onClick={goToPage}>??????</button>
                </div>
            </div>}
        </section>
    )
}

const FoodType = React.memo(({ foodGrp, onChange }) => {
    const foodGrps = [
        { key : 'FM013', text: '?????? ??? ?????????' }
        ,{ key : 'FM009', text: '?????? ??? ??? ??????' }
        ,{ key : 'FM011', text: '?????????' }
        ,{ key : 'FM012', text: '?????????' }
        ,{ key : 'FM006', text: '?????????' }
        ,{ key : 'FM015', text: '?????? ??? ??????' }
        ,{ key : 'FM007', text: '?????????' }
        ,{ key : 'FM008', text: '?????????' }
        ,{ key : 'FM014', text: '?????????' }
        ,{ key : 'FM005', text: '?????????' }
        , { key : 'FM001', text: '?????? ??? ??? ??????' }
        ,{ key : 'FM002', text: '?????? ??? ?????????' }
        ,{ key : 'FM003', text: '?????? ??? ??? ??????' }
        ,{ key : 'FM004', text: '?????? ??? ??? ??????' }
        ,{ key : 'FM010', text: '??????' }
        ,{ key : 'FM016', text: '????????????' }
        ,{ key : 'FM017', text: '?????????????????????' }
        // ,{ key: 'FM018', text: '????????????' }
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

