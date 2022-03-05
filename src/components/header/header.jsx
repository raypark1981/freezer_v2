import React, { useState } from 'react'
import styles from './header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHamburger } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import uiActionCreator from '../../actions/uiAction'
const Header = ({ opened , toggleRightMyInfo }) => { 
    
    const handleClick = () => { 
        toggleRightMyInfo();
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}></div>
                <div className={styles.title}><i></i></div>
                <div className={styles.right} onClick={handleClick}>
                    <FontAwesomeIcon icon={faHamburger} className={styles.hamburger}/>
                </div>
            </div>
        </header>
    )
}
const mapStateToProps = (state) => { 
    return {
        opened : state.uiState.right_myinfo_opened
    }
}

const mapDispatchToProps = (dispatch, ownProps) => { 
    return {
        toggleRightMyInfo: () => dispatch(uiActionCreator.toggleRightMyInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Header);