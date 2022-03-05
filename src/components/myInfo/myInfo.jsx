import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Link, useLocation } from 'react-router-dom';
import { myInfoActionCreator } from '../../actions/myInfo.action';
import uiActionCreator from '../../actions/uiAction';
import { AuthServiceContext , DataServiceContext } from '../../App';
import { getSession } from '../../services/session';
import styles from './myInfo.module.css'

const MyInfo = ({ toggle, count , initialCountBasketRecipeWarning}) => { 
    const [user, setUser] = useState(null);
    const authServiceContext = useContext(AuthServiceContext);
    const dataServiceContext = useContext(DataServiceContext);
    const handleClick = () => { 
        toggle();
    }

    const caculateDatediff = (subject) => { 
        if (!subject) { 
            return 0
        }
        
        const now = new Date();
        const sub = new Date(subject);
        const diff = moment(now).diff(sub);
        const dateDiff = Math.floor(diff / 1000 / 60 / 60 / 24);
        return dateDiff > 0 ? 1 : 0;
    }

    const initialCount = (foods) => { 
        let warning = 0;
        let recipe = 0;
        let basket = 0;
        Object.keys(foods).map(key => {
            const food = foods[key];
            Object.keys(food).map((_key) => { 
                recipe = recipe + (food[_key].recipeYN ? 1 : 0)
                basket = basket + (food[_key].basketYN ? 1 : 0)
                warning = warning + caculateDatediff(food[_key].expiredDate)
            })
        }) 
        initialCountBasketRecipeWarning({ warning, recipe, basket })
    }

    useEffect(() => { 
        if (!getSession('uid')) return;

        authServiceContext.checkUserState((user) => { 
            user && setUser({ email: user.email , photoURL : user.photoURL })
        })

        dataServiceContext.getFoods(getSession('uid')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                initialCount(data);
            }
        });
    } , [])

    return (<section className={styles.section}>
    <header className={styles.header}>
        {user && <div className={styles.me_pic}>
            <img src={user && user.photoURL} alt="me" />
        </div>}
        <div className={styles.email}>{user ? user.email : "needs Login.."}</div>
    </header>
    <div className={styles.sub_actions}>
        <div className={`${styles.sub_action} ${styles.warning}`}>
            <i></i>
        {user && <p className={styles.count}>{count ? count.warning : '0'}</p>}
        </div>
        <div className={`${styles.sub_action} ${styles.recipe}`}>
            <i></i>
            { user && <p className={styles.count}>{count ? count.recipe : '0'}</p>}
        </div>
        <div className={`${styles.sub_action} ${styles.basket}`}>
            <i></i>
            { user && <p className={styles.count}>{count ? count.basket : '0'}</p>}
        </div>
        </div>
        
    {user && <div className={styles.actions}>
        <div className={`${styles.action} ${styles.my_edit} ${styles.line_right}`}>
            <Link to="/myEdit" onClick={handleClick}>
                <i></i>
                <button>회원정보</button>
            </Link>
        </div>
            <div className={`${styles.action} ${styles.my_ref} ${styles.line_right}`}>
            <Link to="/myFreezer" onClick={handleClick}>
                <i></i>
                <button>내 냉장고</button>
            </Link>
        </div>
            <div className={`${styles.action} ${styles.my_basket}`}>
            <Link to="/myBasket"  onClick={handleClick}>
                <i></i>
                <button>장바구니</button>
            </Link>
        </div>
            <div className={`${styles.action} ${styles.my_recipe}  ${styles.line_top} ${styles.line_right}`}>
            <Link to="/recipe"  onClick={handleClick}>
                <i></i>
                <button>추천레시피</button>
            </Link>
        </div>
            <div className={`${styles.action} ${styles.my_notice} ${styles.line_top} ${styles.line_right}`}>
            <Link to="/notice"  onClick={handleClick}>
                <i></i>
                <button>공지사항</button>
            </Link>
        </div>
            <div className={`${styles.action} ${styles.my_ask} ${styles.line_top}`}>
                <div>

            <i></i>
            <button>1:1문의</button>
                </div>
        </div>
    </div>}
</section>)
}

const mapStateToProp = (state) => { 
    return {
        count: state.myInfoState
    }
}

const mapDispatchToProps = (dispatch) => { 
    return {
        toggle: () => dispatch(uiActionCreator.toggleRightMyInfo(false)),
        initialCountBasketRecipeWarning : (count) =>  dispatch(myInfoActionCreator .initialCountBasketRecipeWarning(count))
    }
}

export default connect(mapStateToProp , mapDispatchToProps)(MyInfo);
