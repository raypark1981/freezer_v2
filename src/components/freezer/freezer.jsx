import React, {useContext, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './freezer.module.css';
import Header from '../header/header';
import Section from './section/section';
import { AuthServiceContext, FoodServiceContext } from '../../App';
import { useState } from 'react';



const foods = [{
    food_key : -1,
    master_code : '', 
    food_cd: '', 
    foodcd_name: '우유',
    food_name : '우유1',
    food_grp : '',
    expired_date : new Date() ,
    food_detail : '서울우유' , 
    memo : '하하',
    basket_memo : '', 
    basket_yn : 'n'
}];

const Freezer = ({ }) => { 
    const [freezer, setFreezer] = useState({});
    const [sections, setSections] = useState([]);
    const [foods, setFoods] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state && location.state.userId;

    const authServiceContext = useContext(AuthServiceContext);
    const foodServiceContext = useContext(FoodServiceContext);

    useEffect(() => {
        foodServiceContext.foods(userId).then((data) => {
            const temp = data[userId];
            const fre = temp["freezers"];
            const sec = temp["sections"];
            const fod = temp["foods"];
            
            // main freezer
            const mainFreezerKey = Object.keys(fre).filter(key => fre[key].mainYN === "Y");
            // main freezer > sections
            const mainSections = sec[mainFreezerKey];

            setFreezer(fre[mainFreezerKey]);
            setSections(mainSections)
            //food all
            setFoods(fod);

        });
    } , [])

    useEffect(() => { 
        authServiceContext.checkUserState((user) => { 
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
        <h3 className={styles.freezer_name}><i></i> 울집냉장고</h3>
        <main>
            <section className={styles.freezer}>
            {
                sections.length > 0 && sections.map((section) => { 
                    return <Section key={section.key} section={section} foods={foods[section.key]}/>
                })   
            }   
            </section>
        </main>
    </> 
    )
}

export default Freezer;