import React, { useState } from 'react';
import styles from './section.module.css';

import {  useNavigate } from 'react-router-dom';
import { setSession } from '../../../services/session';
const Section = ({ freezerkey,  section, foods }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const handleClick = (e) => {
        if (!!e.target.dataset.section) { 
            navigate(`/addfood/${freezerkey}`);
            setSession('sectionKey', e.target.dataset.section);
            return;
        }
        
        setSelected(!selected)
    }

    return (
        <div className={`${styles.section} ${selected ? styles.selected : ''}`}  onClick={handleClick}>
            <div className={styles.container}>
                <div className={styles.handle}>
                    <div className={styles.grab}>
                        <i></i>
                    </div>
                </div>
                <div className={styles.drawer_name}>{section.name}</div>
                <div className={styles.add_food}>
                    <button className={styles.plus} data-section={section.key}>
                    </button>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Section;