import React, {useContext, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './freezer.module.css';
import Header from '../header/header';
import Section from './section/section';
import { AuthServiceContext, DataServiceContext } from '../../App';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Freezer = ({ }) => { 
    const [freezer, setFreezer] = useState({});
    const [sections, setSections] = useState([]);
    const [foods, setFoods] = useState({});
    const [cookies, setCookies] = useCookies();
    const location = useLocation();
    
    const navigate = useNavigate();
    
    const authServiceContext = useContext(AuthServiceContext);
    const dataServiceContext = useContext(DataServiceContext);

    const getMainData = () => { 
        const promise = dataServiceContext.getFreezer(location.state.uid);
        promise.then((datas) => { 
            const fre = datas[0];
            const sec = datas[1];
            
            // main freezer
            const mainFreezerKey = Object.keys(fre).filter(key => fre[key].mainYN === "Y");
            // main freezer > sections
            const mainSections = sec[mainFreezerKey];
    
            setFreezer(fre[mainFreezerKey]);
            setSections(mainSections)

            mainSections.length > 0 && dataServiceContext.getFoods(location.state.uid, setFoods);
        })
    }

    useEffect(() => {
        getMainData();
    } , [])

    useEffect(() => { 
        // authServiceContext.checkUserState((user) => { 
        //     if (user) { 
        //         if (cookies['uid'] !== user.uid) { 
        //             navigate('/', {replace : true})
        //         }
        //     }
        // })
    }, [])
    
    return (
    <>
        <Header />
            <h3 className={styles.freezer_name}><i></i>{freezer.name}</h3>
        <main>
            <section className={styles.freezer}>
            {
                sections.length > 0 && sections.map((section) => { 
                    return <Section key={section.key} section={section} foods={foods[section.key]} />
                })   
            }   
            </section>
        </main>
    </> 
    )
}

export default Freezer;