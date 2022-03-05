import React, {useContext, useEffect , useState} from 'react';
import Header from '../header/header';
import Section from './section/section';
import Food from '../freezer/food/food';
import styles from './freezer.module.css';
import moment from 'moment';

import { useNavigate, useParams } from 'react-router-dom';
import { DataServiceContext } from '../../App';
import { getSession, removeSession } from '../../services/session';
import { myInfoActionCreator } from '../../actions/myInfo.action';
import { connect } from 'react-redux';

const Freezer = ({ initialCountBasketRecipeWarning }) => { 
    const { fz, fd } = useParams();
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
            

            if (mainSections && mainSections.length > 0) { 
                dataServiceContext.getFoods(getSession('uid')).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setFoods(data);
                        initialCount(data);
                    } else {
                        setFoods({});
                    }
                });
            }
        })
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
        getMainData();
        removeSession('tmpFood');
        removeSession('sectionKey');
    } , [])
    return (
    <>
        <Header />
            <h3 className={styles.freezer_name}><i></i>{freezer.name}</h3>
        <main className={styles.main}>
            <section className={styles.freezer}>
            {
                    
                sections && sections.length > 0 && sections.map((section) => {       
                    return <React.Fragment key={section.key}>
                        <Section freezerkey={mainFreezerKey} section={section} foods={foods[section.key]} />
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

const mapDispathToProp = (dispatch) => { 
    return {
        initialCountBasketRecipeWarning : (count) =>  dispatch(myInfoActionCreator.initialCountBasketRecipeWarning(count))
    }
}

export default connect(null , mapDispathToProp)(Freezer);