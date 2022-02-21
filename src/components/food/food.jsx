import React from 'react';
import styles from './food.module.css';

const Food = ({food}) => { 
    return (
        <li className={styles.food_container}>
            <div className={styles.outline}>
                <div className={styles.food} >
                    <div className={styles.img} >
                        <img src="" alt="" />
                    </div>
                    <div className={styles.info} >
                        <h3 className={styles.name} ></h3>
                        <span className={styles.nutrition} ></span>
                        <p className={styles.memo} ></p>
                        <div className={styles.btns} >
                            <button className={`${styles.btn} ${styles.basket}`}><i></i></button>
                            <button className={`${styles.btn} ${styles.recipe}`}><i></i></button>
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