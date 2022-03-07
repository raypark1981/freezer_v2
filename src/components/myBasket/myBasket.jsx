import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './myBasket.module.css';
import { DataServiceContext } from '../../App';
import { getSession } from '../../services/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

const MyBasket = ({ }) => { 
    
    const dataServiceContext = useContext(DataServiceContext);
    const navigate = useNavigate();
    const [baskets, setBaskets] = useState();
    const [foods , setFoods] = useState();
    
    const goToPage = (e) => { 
        const target = e.currentTarget.dataset.target;
        switch (target) { 
            case 'save':
                navigate('/freezer', {})
                break;
        }
    }

    const getFoods = () => { 
        dataServiceContext.getFoods(getSession('uid')).then((snapshot) => { 
            if (snapshot.exists()) {
                const data = snapshot.val();
                setFoods(data);
            }
        });
    }

    const getBasket = () => { 
        dataServiceContext.getBasket(getSession('uid'), setBaskets);
    }

    const handleAddBasket = () => {

        if (baskets && Object.keys(baskets).filter((key) => {
            return !baskets[key]?.name;
        }).length > 0){
            alert('등록중인 장바구니가 있습니다!');
            return;
        }

        const basketKey = "ba" + Date.now();
        setBaskets({
            ...baskets,
            [basketKey]: { name: '' }
        });
        
        dataServiceContext.setBasket(getSession('uid'), basketKey, {
            name: ''
        })
    }
    
    useEffect(() => {
        getFoods();
        getBasket();
     }, [])

    // console.log(foods);
    return (
        <section className={styles.my_basket}>
            <header className={styles.header}>
                <h3 className={`${styles.middle} ${styles.align_center}` }>장바구니</h3>
                <div className={styles.right}>
                    <button data-target="save" onClick={goToPage}></button>
                </div>
            </header>
            <div className={styles.basket_container}>
            {
                foods && Object.keys(foods).map((key) => { 
                    const temp = foods[key];
                    return Object.keys(temp).map((_key) => { 
                        if (temp[_key].basketYN) { 
                            return <Basket key={_key} name={temp[_key].foodName} foodKey={_key} sectionKey={key} dataServiceContext={dataServiceContext} />
                        }
                    })
                })
            }

            {
                baskets && Object.keys(baskets).map((key) => { 
                    return <Basket key={key} basketKey={key} name={baskets[key].name} dataServiceContext={dataServiceContext} setBaskets={setBaskets} baskets={baskets} />
                })
            }
            </div>
            <div className={styles.section_add}>
                <button className={`${styles.btn_add}`} onClick={handleAddBasket}></button>
            </div>
        </section>
    )
}

const Basket = memo(({ name, basketKey, foodKey, sectionKey, dataServiceContext, setBaskets, baskets }) => { 
    const [actInput, setActInput] = useState(false);
    const [checked, setChecked] = useState(false);
    const [display, setDisplay] = useState(true);
    const refInput = useRef();
    const [random, setRandom] = useState(Math.floor(Math.random() * 10));

    const handleClick = (e) => { 
        const target = e.target.dataset.target;
        switch (target) { 
            case 'delete':
                if (!!foodKey) { 
                    setDisplay(false);
                    dataServiceContext.updateFoodBasket(getSession("uid"), sectionKey, foodKey, false);
                }

                if (!!basketKey) { 
                    setDisplay(false);
                    // basket 에 있는 음식
                    dataServiceContext.deleteBasket(getSession("uid"), basketKey);
                }
                break;
            case 'check':
                setChecked(!checked);
                break;
            case 'input':
                setActInput(true);
                // refInput.current.select();
                break;
            case 'block':
                alert('냉장고에 있는 음식은 수정할 수 없습니다.');
                break;
        }
    }

    const onBlurName = () => { 
        setActInput(false);

        if (!refInput.current.value) return;

        setBaskets({
            ...baskets,
            [basketKey]: {
                name : refInput.current.value
            }
        })

        dataServiceContext.updateBasket(getSession("uid"), basketKey, {
            name : refInput.current.value
        });
    }

    useEffect(() => { 
        (basketKey && !name) && setActInput(true);
    }, [])

    return (
        display &&
    <div className={styles.block}>
        <div className={styles.section}  onClick={handleClick}>
            <i data-target="check" className={`${styles.rec_icon} ${checked ? styles.checked : ''} color${random}`}></i>        
                    
            {foodKey && <div data-target="block" className={styles.name}>{name}</div>}
            {(basketKey && actInput) && <input ref={refInput} type="text" onBlur={onBlurName} className={styles.input} defaultValue={name} placeholder="입력해주세요.." />}        
            {(basketKey && !actInput) && <div data-target="input" className={styles.name} >{name}</div> }        
                    
            <FontAwesomeIcon data-target="delete" icon={faTrashCan} className={styles.btn_edit}/>
        </div>
    </div>)
    
})

export default MyBasket;

