import React from 'react';
import styles from './freezer.module.css';

import Header from '../header/header';
import Section from '../section/section';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Freezer = ({authService}) => { 
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state.userId;

    useEffect(() => { 
        authService.checkUserState((user) => { 
            if (user) { 
                if (userId !== user.uid) { 
                    navigate('/', {replace : true})
                }
            }
        })
    }, [])

    return (
    <>
        <Header />
        <main>
            <section className={styles.freezer}>
                <Section />
            </section>
        </main>
    </>

        
)
}

export default Freezer;