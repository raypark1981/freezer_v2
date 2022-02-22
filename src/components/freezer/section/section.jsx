import React from 'react';
import styles from './section.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Food from '../food/food';
import { useLocation, useNavigate } from 'react-router-dom';
const Section = ({ section, foods }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate("/addfood", { state: location.state });
    }
    
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.handle}>
                    <div className={styles.grab}>
                        <i></i>
                    </div>
                </div>
                <div className={styles.drawer_name}>{section.name}</div>
                <div className={styles.add_food}>
                    <FontAwesomeIcon icon={faSquarePlus} className={styles.plus} onClick={handleClick}/>
                </div>
            </div>
            <ul>
                {
                    !!foods && Object.keys(foods).map(key => { 
                        return <Food key={key}  food={foods[key]} />
                    })
                }
                
            </ul>
        </div>
    )
}

export default Section;