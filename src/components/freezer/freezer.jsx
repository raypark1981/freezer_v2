import React, {useContext, useEffect , useState} from 'react';
import Header from '../header/header';
import Section from './section/section';
import styles from './freezer.module.css';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataServiceContext } from '../../App';
import { getSession } from '../../services/session';

const Freezer = ({ }) => { 
    const { fz , fd } = useParams();
    const [freezer, setFreezer] = useState({});
    const [sections, setSections] = useState([]);
    const [foods, setFoods] = useState({});   
    const [mainFreezerKey, setMainFreezerKey] = useState();
    const navigate = useNavigate();
    const dataServiceContext = useContext(DataServiceContext);

    const getMainData = () => { 
        const promise = dataServiceContext.getFreezerAll(getSession('uid'));
        promise.then((datas) => { 
            
            const fre = datas[0];
            const sec = datas[1];
            
            // main freezer
            let _mainFreezerKey = (Object.keys(fre).filter(key => fre[key].mainYN === "Y"));
            if (!!fz) { 
                _mainFreezerKey = fz;
            }
            
            // main freezer > sections
            const mainSections = sec[_mainFreezerKey];
            
            setFreezer(fre[_mainFreezerKey]);
            setSections(mainSections)
            setMainFreezerKey(_mainFreezerKey);
            mainSections.length > 0 && dataServiceContext.getFoods(getSession('uid'), setFoods);
        })
    }

    useEffect(() => {
        if (!getSession('uid')) return;
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
                    return <Section key={section.key} freezerkey={mainFreezerKey} section={section} foods={foods[section.key]} />
                })   
            }   
            </section>
        </main>
    </> 
    )
}

export default Freezer;