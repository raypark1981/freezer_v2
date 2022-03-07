import React, { useEffect, useState } from 'react';
import styles from './section.module.css';

import {  useNavigate } from 'react-router-dom';
import { getLocal, setLocal, setSession } from '../../../services/session';
import Ballon from '../../utils/ballon/ballon';
const Section = ({ idx, selectedKey, freezerkey, section, foods }) => {
    
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const handleClick = (e) => {
        

        if (!!e.target.dataset.section) { 
            navigate(`/addfood/${freezerkey}`);
            /** 마지막 누른 섹션 정보 기억*/
            setSession('lastSectionKey', e.target.dataset.section);
            return;
        }
        setSelected(!selected)
    }

    useEffect(() => { 
       
        // 눌러진 상태 동기화
        selectedKey === section.key && setSelected(true)
    }, [selectedKey])

    useEffect(() => { 
        /** 푸드 저장 알림 */
        if (!getLocal('sectionNotice') && idx === 0) { 
            setTimeout(() => {
                setLocal('sectionNotice', 'done')
                document.querySelector('[data-ballon="sectionNotice"]') && document.querySelector('[data-ballon="sectionNotice"]').remove()
            },5000)
        }
    },[])
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
                    {(idx == 0 && !getLocal('sectionNotice')) && <div><Ballon index={'sectionNotice'} text={"음식을 등록해보세요!"} /></div>}
                    <button className={styles.plus} data-section={section.key}>
                    </button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Section;