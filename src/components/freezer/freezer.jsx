import React, {useContext, useEffect , useState} from 'react';
import Header from '../header/header';
import Section from './section/section';
import Food from '../freezer/food/food';
import styles from './freezer.module.css';


import { useNavigate, useParams } from 'react-router-dom';
import { DataServiceContext } from '../../App';
import { getSession, removeSession } from '../../services/session';

const Freezer = ({ }) => { 
    const { fz, fd } = useParams();
    const [freezer, setFreezer] = useState({});
    const [sections, setSections] = useState([]);
    const [foods, setFoods] = useState({});   
    const [mainFreezerKey, setMainFreezerKey] = useState();
    const [lastSelectedSection, setLastSelectedSecion] = useState();
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
            

            if (mainSections && mainSections.length > 0) { 

                /** 마지막 누른 정보 아니면 기본 첫번째 섹션 셋팅 */
                setLastSelectedSecion(getSession('lastSectionKey') || mainSections[0].key)
                /** 마지막 누른 section key는 필요 없음 */
                removeSession('lastSectionKey');

                dataServiceContext.getFoods(getSession('uid')).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setFoods(data);
                    } else {
                        setFoods({});
                    }
                });
            }
        })
    }

    useEffect(() => {
        if (!getSession('uid')) return;
        getMainData();
        removeSession('tmpFood');
        
    }, [])
    
    return (
    <>
        <Header />
            <h3 className={styles.freezer_name}><i></i>{freezer.name}</h3>
        <main className={styles.main}>
            <section className={styles.freezer}>
            {
                    
                sections && sections.length > 0 && sections.map((section ,idx) => {       
                    return <React.Fragment key={section.key}>
                        <Section idx={idx} selectedKey={lastSelectedSection} freezerkey={mainFreezerKey} section={section} foods={foods[section.key]} />
                        <ul className={styles.food_section}>
                            {
                                !!foods[section.key] && Object.keys(foods[section.key]).map(key => { 
                                    return <Food key={key} freezerkey={mainFreezerKey} sectionKey={section.key} food={foods[section.key][key]} />
                                })
                            }
                            
                        </ul>
                    </React.Fragment>
                })   
            }   
            </section>
        </main>
    </> 
    )
}

export default Freezer;