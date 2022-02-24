import React from 'react';
import styles from './section.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot } from '@fortawesome/free-solid-svg-icons';
import Food from '../food/food';
import { useLocation, useNavigate } from 'react-router-dom';
const Section = ({ section, foods }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (e) => {
        navigate("/addfood", { state: { ...location.state, sectionKey: e.currentTarget.dataset.section }});
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
                    <button className={styles.plus} data-section={section.key} onClick={handleClick}>음식추가
                    <FontAwesomeIcon icon={faCarrot}/>
                    </button>
                    
                </div>
            </div>
            <ul>
                {
                    !!foods && Object.keys(foods).map(key => { 
                        return <Food key={key} food={foods[key]} sectionKey={section.key}/>
                    })
                }
                
            </ul>
        </div>
    )
}

export default Section;