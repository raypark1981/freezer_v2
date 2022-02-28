import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myFreezer.module.css';
import { DataServiceContext } from '../../App';

const MyFreezer = ({ }) => { 
    const navigate = useNavigate();
    const refName = useRef();
    const [actInputName, setActInputName] = useState(false);
    const [freezer, setFreezer] = useState();
    const goToPage = (e) => { 
        const target = e.currentTarget.dataset.target;
        switch (target) { 
            case 'save':
                navigate('/freezer', {})
                break;
            case 'delete':
                navigate('/freezer', {})
                break;
            
        }
    }

    const handleInputName = (e) => {
        if (e.currentTarget.tagName === 'INPUT') { 
            setFreezer({
                ...freezer, 
                name: refName.current.value
            })
        }
        setActInputName(!actInputName);
    }




    return (
        <section className={styles.my_freezer}>
            <header className={styles.header}>
                <div>
                    <button data-target="delete" className={styles.left} onClick={goToPage}></button>
                </div>
                <h3 className={`${styles.middle} ${styles.align_center}` }>냉장고 관리</h3>
                <div>
                    <button data-target="save" className={styles.right} onClick={goToPage}></button>
                </div>
            </header>
            <div className={styles.block}>
                <div className={styles.create_date}>2022년 02월 28일</div>
                <div className={styles.edit_freezer}>
                    <i className={styles.icon_freezer}></i>
                    {
                        actInputName &&
                        <>
                            <input type="text" className={styles.input_name} defaultValue={"울집냉장고일걸.."} />
                            <button className={styles.btn_save_name}></button>
                        </>
                    }
                    {
                            !actInputName &&
                            <>
                                <div className={styles.name}>울집냉자고일걸</div>
                                <button className={styles.btn_edit}></button>
                            </>
                    }
                    
                </div>
            </div>
            <div className={styles.block}>
                <ul className={styles.sections}>
                    <li className={styles.section}>
                        <i className={`${styles.rec_icon} color1` }></i>
                        <div className={styles.section_name}>신선칸(생)</div>
                        <div className={styles.section_date}>2022년 02월 01일</div>
                        <button className={styles.btn_edit}></button>
                    </li>
                    <li className={styles.section}>
                        <i className={`${styles.rec_icon} color2` }></i>
                        <div className={styles.section_name}>신선칸(생1)</div>
                        <div className={styles.section_date}>2022년 02월 01일</div>
                        <button className={styles.btn_edit}></button>
                    </li>
                    <li className={styles.section}>
                        <i className={`${styles.rec_icon} color3` }></i>
                        <div className={styles.section_name}>신선칸(생2)</div>
                        <div className={styles.section_date}>2022년 02월 01일</div>
                        <button className={styles.btn_edit}></button>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default MyFreezer;

