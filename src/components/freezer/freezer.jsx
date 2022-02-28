import React, {useContext, useEffect , useState} from 'react';
import Header from '../header/header';
import Section from './section/section';
import styles from './freezer.module.css';

import { useLocation } from 'react-router-dom';
import { DataServiceContext } from '../../App';
import { getSession } from '../../services/session';

const Freezer = ({ }) => { 
    const [freezer, setFreezer] = useState({});
    const [sections, setSections] = useState([]);
    const [foods, setFoods] = useState({});
    const location = useLocation();
    
    const dataServiceContext = useContext(DataServiceContext);

    const getMainData = () => { 
        const promise = dataServiceContext.getFreezer(getSession('uid'));
        promise.then((datas) => { 
            const fre = datas[0];
            const sec = datas[1];
            
            // main freezer
            const mainFreezerKey = Object.keys(fre).filter(key => fre[key].mainYN === "Y");
            // main freezer > sections
            const mainSections = sec[mainFreezerKey];
    
            setFreezer(fre[mainFreezerKey]);
            setSections(mainSections)

            mainSections.length > 0 && dataServiceContext.getFoods(getSession('uid'),  setFoods);
        })
    }

    useEffect(() => {
        getMainData();
    } , [])
    
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