import moment from 'moment';
import React, { memo, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { myInfoActionCreator } from '../../../actions/myInfo.action';
import uiActionCreator from '../../../actions/uiAction';
import { DataServiceContext } from '../../../App';
import { getSession, setSession } from '../../../services/session';
import styles from './food.module.css';

const Food = memo(({ freezerkey, sectionKey, food , addCountBasketRecipeWarning}) => { 
    const dataServiceContext = useContext(DataServiceContext);
    const navigate = useNavigate();
    const [_food, setFood] = useState(food);
    const handleButton = (e) => {
        const target = e.target.dataset.target;
        const yn = {};
        switch (target) {
            case 'recipe':
                yn.recipeYN = !_food.recipeYN;
                setFood({ ..._food, recipeYN: !_food.recipeYN });
                addCountBasketRecipeWarning({
                    recipe : !_food.recipeYN ? 1 : -1
                })
                break;
            case 'basket':
                yn.basketYN = !_food.basketYN;
                setFood({ ..._food, basketYN: !_food.basketYN });
                addCountBasketRecipeWarning({
                    basket : !_food.basketYN ? 1 : -1
                })
                break;
            default:
                return;
        }
        
        dataServiceContext.updateFood(getSession("uid"), sectionKey, { ..._food, ...yn });
    }
    const goToPage = (e) => { 
        if (!!e.target.dataset.target) return;

        const foodkey = e.currentTarget.dataset.key;
        navigate(`/addfood/${freezerkey}/${foodkey}`);
        /** 마지막 누른 음식의 섹션  정보 기억*/
        setSession('lastSectionKey',sectionKey);
    }

    const handleNoImage = (e) => { 
        e.target.onerror = null;
        e.target.src = `../../images/foods/${"nofood"}.png`;
    }

    const caculateDatediff = (subject) => { 
        if (!subject) { 
            return "non";
        }
        
        const now = new Date();
        const sub = new Date(subject);
        const diff = moment(now).diff(sub);

        return Math.floor(diff / 1000 / 60 / 60 / 24);
    }

    const diff = caculateDatediff(_food.expiredDate);
    return (
        <li data-key={_food.key} onClick={goToPage}   className={`${styles.food_container}`}>
            <div className={styles.outline}>
                <div className={styles.food} >
                    <div className={styles.img} >
                        <img src={!!_food.foodGrp ?
                            `../../images/foods/${_food.foodGrp}.png` : 
                            '../../images/foods/nofood.png'
                    } onError={handleNoImage} alt="" />
                    </div>
                    <div className={styles.info} >
                        <div>
                            <h3 className={styles.name} >{_food?.foodName}</h3>
                            <span className={styles.nutrition} >{_food.nutrition}</span>
                        </div>
                        <p className={styles.memo} >{_food.memo}</p>
                        <div className={styles.btns} onClick={handleButton}>
                            <button data-target="recipe" className={`${styles.btn} ${styles.recipe} ${_food.recipeYN? styles.active : ''}`}><i></i></button>
                            <button data-target="basket" className={`${styles.btn} ${styles.basket} ${_food.basketYN ? styles.active : ''}`}><i></i></button>
                            <button data-target="sub" className={`${styles.btn} ${styles.date}`} data-count={diff}><i></i></button>
                            <button data-target="sub" className={`${styles.btn} ${styles.warning} ${diff > 0 ? styles.active : (diff < 0 && diff > -3) ? styles.ready : ''}`}><i></i></button>
                        </div>
                    </div>
                </div>
            </div>            
        </li>
       
    )
})

const mapDispatchToProps = (dispatch) => { 
    
    return {
        onOffSpiner: () => dispatch(uiActionCreator.onOffSpiner()), 
        addCountBasketRecipeWarning: (count) => dispatch(myInfoActionCreator.addCountBasketRecipeWarning(count))
    }   
}

export default connect(null, mapDispatchToProps)(Food);