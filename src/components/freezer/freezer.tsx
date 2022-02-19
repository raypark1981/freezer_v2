import React from 'react';
import styles from './freezer.module.css';

const Freezer = () => { 
    return (
        <section className={styles.freezer}>
            <div className={styles.food}>
                <div className={styles.container}>
                    <div className={styles.drawer}><i></i></div>
                    <div>신선칸</div>
                    <div className={styles.add_food}>
                        <i className={styles.plus}></i>
                    </div>
                </div>
                <ul>
                    <li>food1</li>
                    <li>food2</li>
                </ul>
            </div>    
        </section>
)
}

export default Freezer;