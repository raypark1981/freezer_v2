import React from 'react';
import styles from './section.module.css';
import Food from '../food/food';
import {  useNavigate } from 'react-router-dom';
import { setSession } from '../../../services/session';
const Section = ({ freezerkey,  section, foods }) => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate(`/addfood/${freezerkey}`);
        setSession('sectionKey', e.currentTarget.dataset.section);
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