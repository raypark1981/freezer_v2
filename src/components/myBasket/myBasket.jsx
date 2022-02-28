import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './myBasket.module.css';
import { DataServiceContext } from '../../App';

const MyBasket = ({ }) => { 
    
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState(location.state);
    
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




    return (
        <section className={styles.my_basket}>
            <header className={styles.header}>
                
                <h3 className={`${styles.middle} ${styles.align_center}` }>장바구니</h3>
                <div className={styles.right}>
                    <button data-target="save" className={styles.right} onClick={goToPage}></button>
                </div>
            </header>
            <div className={styles.block} onClick={goToPage} data-target="addDetail" >
                <div className={styles.section}>
                    <i className={`${styles.rec_icon} color1` }></i>
                    <div className={styles.name}>달걀(생2)</div>
                    <button className={styles.btn_edit}></button>
                </div>
            </div>
            <div className={styles.block} onClick={goToPage} data-target="addDetail" >
                <div className={styles.section}>
                    <i className={`${styles.rec_icon} color3` }></i>
                    <div className={styles.name}>달걀(생2)</div>
                    <button className={styles.btn_edit}></button>
                </div>
            </div>
            
        </section>
    )
}

export default MyBasket;

