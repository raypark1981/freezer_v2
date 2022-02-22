import React from 'react';
import styles from './food.module.css';

const Food = ({food}) => { 
    return (
        <li className={`${styles.food_container} ${food && food.master_code}`}
            data-food-grp={food && food.foodgrp}>
            <div className={styles.outline}>
                <div className={styles.food} >
                    <div className={styles.img} >
                        <img src="../../images/foods/FM001.png" alt="" />
                    </div>
                    <div className={styles.info} >
                        <div>
                            <h3 className={styles.name} >{food && food.foodname}</h3>
                            <span className={styles.nutrition} >{food && food.nutrition}</span>
                        </div>
                        <p className={styles.memo} >{food && food.memo}</p>
                        <div className={styles.btns} >
                            <button className={`${styles.btn} ${styles.recipe}`}><i></i></button>
                            <button className={`${styles.btn} ${styles.basket}`}><i></i></button>
                            <button className={`${styles.btn} ${styles.date}`}><i></i></button>
                            <button className={`${styles.btn} ${styles.warning}`}><i></i></button>
                        </div>
                    </div>
                </div>
            </div>            
        </li>
       
    )
}

export default Food;