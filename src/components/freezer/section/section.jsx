import React from 'react';
import styles from './section.module.css';
import Food from '../food/food';
import { useLocation, useNavigate } from 'react-router-dom';
const Section = ({ freezerkey,  section, foods }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (e) => {
        navigate(`/addfood/${freezerkey}`, { state: { ...location.state, sectionKey: e.currentTarget.dataset.section }});
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
                    <button className={styles.plus} data-section={section.key} onClick={handleClick}>
                    </button>
                    
                </div>
            </div>
            <ul>
                {
                    !!foods && Object.keys(foods).map(key => { 
                        return <Food key={key} freezerkey={freezerkey} sectionKey={section.key} food={foods[key]} />
                    })
                }
                
            </ul>
        </div>
    )
}

export default Section;