import React from 'react';
import styles from './ballon.module.css';

const  Ballon = ({index , text, direction = 'right'}) => { 
    return (
        <div data-ballon={index} className={styles.ballon_box}>
            <div className={direction === 'right' ? styles.right_point : styles.left_point}>
                <div className={styles.point1}></div>
                <div className={styles.point2}></div>
            </div>
            <div className={styles.ballon}>
            {text}
            </div>
            {/* <div className={styles.confirm}>
                    다시 보지 않을게요 <button className={styles.xbutton}></button>
            </div> */}
        </div>
    )
}

export default Ballon;
			
		
		
