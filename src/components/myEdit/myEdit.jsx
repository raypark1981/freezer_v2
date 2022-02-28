import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './myEdit.module.css';
import { AuthServiceContext , DataServiceContext } from '../../App';
import CommonService from '../../services/common_service';

const MyEdit = ({ }) => { 
    
    const navigate = useNavigate();
    const location = useLocation();
    const authSrviceContext = useContext(AuthServiceContext);
    const [state , setState] = useState(location.state);
    const goToPage = (e) => { 
        const target = e.currentTarget.dataset.target;
        switch (target) { 
            case 'save':
                
                navigate('/freezer', { state: { user: { ...state.user }}})
                break;
            case 'delete':
                navigate('/freezer', { state: { user: { ...state.user } } })
                break;
            
        }
    }


    useEffect(() => { 
        // authSrviceContext.checkUserState((user) => { 
        //     // console.log(user);
        // })
    }, [])

    return (
        <section className={styles.add_food}>
            <header className={styles.header}>
                <div>
                    <button data-target="delete" className={styles.left} onClick={goToPage}></button>
                </div>
                <h3 className={`${styles.middle} ${styles.align_center}` }>추가</h3>
                <div>
                    <button data-target="save" className={styles.right} onClick={goToPage}></button>
                </div>
            </header>
            
            <div className={styles.block} onClick={goToPage} data-target="addDetail" >
                <button className={`${styles.icon} ${styles.chat}`}></button>
                <div className={styles.middle}>세부사항</div>
                <p className={styles.ask}> </p>
                <div className={styles.right_arrow}></div>
            </div>
        </section>
    )
}

MyEdit.prototype = Object.create(CommonService.prototype);

export default MyEdit;

