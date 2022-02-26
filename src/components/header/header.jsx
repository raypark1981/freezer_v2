import React, { useState } from 'react'
import styles from './header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHamburger } from '@fortawesome/free-solid-svg-icons'
const Header = ({  }) => { 
    const [open, setOpen] = useState(false);
    const handleClick = () => { 
        setOpen(!open);
    }

    return (
        <header>
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

export default Header;