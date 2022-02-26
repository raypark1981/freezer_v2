import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataServiceContext } from '../../../App';
import styles from './food.module.css';


const Food = ({ food , sectionKey }) => { 
    const dataServiceContext = useContext(DataServiceContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState(location.state);

    const handleButton = (e) => {
        const target = e.target.dataset.target;
        const yn = {};
        switch (target) {
            case 'recipe':
                yn.recipeYN = !food.recipeYN;
                break;
            case 'basket':
                yn.basketYN = !food.basketYN;
                break;
            default:
                return;
        }
        dataServiceContext.updateFood(state.user.userId, sectionKey, { ...food , ...yn });
    }
    const goToPage = (e) => { 
        if (!!e.target.dataset.target) return;

        const key = e.currentTarget.dataset.key;
        navigate(`/addfood/${key}`, { state: { ...state, sectionKey: sectionKey}});
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

    const diff = caculateDatediff(food.expiredDate);
    return (
        <li data-key={food.key} onClick={goToPage}   className={`${styles.food_container}`}>
            <div className={styles.outline}>
                <div className={styles.food} >
                    <div className={styles.img} >
                        <img src={`../../images/foods/${food.foodGrp}.png`} alt="" />
                    </div>
                    <div className={styles.info} >
                        <div>
                            <h3 className={styles.name} >{food && food.foodName}</h3>
                            <span className={styles.nutrition} >{food && food.nutrition}</span>
                        </div>
                        <p className={styles.memo} >{food && food.memo}</p>
                        <div className={styles.btns} onClick={handleButton}>
                            <button data-target="recipe" className={`${styles.btn} ${styles.recipe} ${food.recipeYN ? styles.active : ''}`}><i></i></button>
                            <button data-target="basket" className={`${styles.btn} ${styles.basket} ${food.basketYN ? styles.active : ''}`}><i></i></button>
                            <button data-target="sub" className={`${styles.btn} ${styles.date}`} data-count={diff}><i></i></button>
                            <button data-target="sub" className={`${styles.btn} ${styles.warning} ${diff > 0 ? styles.active : (diff < 0 && diff > -3) ? styles.ready : ''}`}><i></i></button>
                        </div>
                    </div>
                </div>
            </div>            
        </li>
       
    )
}

export default Food;