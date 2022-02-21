import React from 'react';
import styles from './section.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Food from '../food/food';
const Section = () => { 
    const food = {}
    return (
        <div className={styles.section}>
            <div className={styles.container}>  
                <div className={styles.handle}>
                    <div className={styles.grab}>
                        <i></i>    
                    </div>
                </div>
                <div className={styles.drawer_name}>신선칸</div>
                <div className={styles.add_food}>
                    <FontAwesomeIcon icon={faSquarePlus} className={styles.plus}/>
                </div>            
            </div>
            <ul>
                <Food food={food}/>
            </ul>
        </div>   
    )
}

export default Section;