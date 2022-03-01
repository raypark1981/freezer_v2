import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataServiceContext } from '../../App';
import { getSession } from '../../services/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

import styles from './myFreezer.module.css';

const MyFreezer = ({ }) => { 
    const navigate = useNavigate();
   
    const dataServiceContext = useContext(DataServiceContext);
    const [addOpen, setAddOpen] = useState(false);
    const [freezer, setFreezer] = useState();
    const [section, setSection] = useState();
    const [selectFreezer, setSelectFreezer ] = useState('');

    const goToPage = (e) => { 
        const target = e.currentTarget.dataset.target;
        switch (target) { 
            case 'save':
                navigate('/freezer', {})
                break;
            case 'delete':
                navigate('/freezer', {})
                break;
            
        }
    }



    const getMainData = () => { 
        const promise = dataServiceContext.getFreezerAll(getSession('uid'));

        promise.then((datas) => { 
            const fre = datas[0];
            const sec = datas[1];
            
            setFreezer(fre);
            setSection(sec)
        })
    }

    const handleAddOpen = () => { 
        setAddOpen(!addOpen);
    }

    const addFreezer = () => { 
        const fzkey = `fz${Date.now()}`;
        setFreezer({ ...freezer, [fzkey]: { name: '이름을 지어주세요.' } })
        setAddOpen(false);
    }

    const addSection = () => { 
        if (!selectFreezer) { 
            alert('냉장고를 먼저 선택해주세요')
            setAddOpen(false);
            return;
        }

        const sckey = `sc${Date.now()}`;
        const newSection = section[selectFreezer] || [];
        setSection({...section , [selectFreezer] :  
            [...newSection, { key: sckey,  name: '칸 이름을 지어주세요.' } ]
        });
        setSelectFreezer('');
        setAddOpen(false);
    }

    useEffect(() => { 
        getMainData();
    }, [])
    
    return (
        <section className={styles.my_freezer}>
            <header className={styles.header}>
                <div>
                    <button data-target="delete" className={styles.left} onClick={goToPage}></button>
                </div>
                <h3 className={`${styles.middle} ${styles.align_center}` }>냉장고 관리</h3>
                <div>
                    <button data-target="save" className={styles.right} onClick={goToPage}></button>
                </div>
            </header>
            <div>
                {
                    freezer && Object.keys(freezer).map((key) => { 
                        return (
                            <div  className={styles.block}  key={key}>
                                <EditFreezer freezer={freezer[key]} freezerkey={key} selectFreezer={selectFreezer} setSelectFreezer={setSelectFreezer}/>
                                {
                                    <ul className={styles.sections}>
                                        {
                                            section && section[key] && section[key].map((sec , i) => {
                                                return <EditSection key={sec.key} index={i} section={sec} freezerkey={key} />
                                            })
                                        }
                                    </ul>
                                }
                            </div>
                        )       
                    })
                }
              
            </div>
            <div className={`${styles.blinder} ${addOpen && styles.on}`}></div> 
            <div className={styles.section_add}>
                    <div className={`${styles.btn_box} ${addOpen && styles.on}`}>
                        <button onClick={addFreezer} className={styles.btn_freezer}></button>
                        <button onClick={addSection} className={styles.btn_section}></button>
                    </div>
                    <div >
                        <button className={`${styles.btn_add}  ${addOpen && styles.on}`} onClick={handleAddOpen}></button>
                    </div>
                </div>
        </section>
    )
}

const EditFreezer = ({ freezer, freezerkey, selectFreezer, setSelectFreezer }) => { 

    const [actInputName, setActInputName] = useState(false);
    const [_freezer, setFreeser] = useState(freezer);
    const dataServiceContext = useContext(DataServiceContext);
    const refName = useRef();
    
    const handleSave = () => { 
        if (!!freezer.key) {
            dataServiceContext.updateFreezer(getSession('uid'), { ..._freezer, name: refName.current.value });
            setFreeser({ ..._freezer, name: refName.current.value });
        } else { 
            dataServiceContext.setFreezer(getSession('uid'), { ..._freezer, name: refName.current.value, key: freezerkey });
            setFreeser({ ..._freezer, name: refName.current.value, key:freezerkey });
        }
        setActInputName(!actInputName);
    }

    const handleInputName = (e) => {
        console.log(e.target.dataset.target);
        if (e.target.dataset.target === 'select') { 
            setSelectFreezer(freezerkey);
            return;
        }

        setSelectFreezer('')

        if (e.target.dataset.target === 'delete') { 
            if (window.confirm('삭제 하시겠습니까? 아래칸,음식도 함께 삭제됩니다.')) { 
                dataServiceContext.deleteFreezer(getSession('uid'), freezerkey);
            }
            return;
        }

        setActInputName(!actInputName);
        setTimeout(() => { 
            refName.current.focus();
            refName.current.select();
        }, 10)
    }

    return (<>
        <div className={styles.create_date}>{_freezer?.key && retrieveDateFromId(_freezer?.key)}</div>
        <div className={`${styles.edit_freezer} ${selectFreezer === freezerkey && styles.selected}`}  onClick={handleInputName}>
                <i className={styles.icon_freezer} data-target="select"></i>
                {
                    actInputName &&
                    <>
                    <input ref={refName} type="text" className={styles.input_name} onBlur={handleSave} defaultValue={_freezer?.name} />
                        <button className={styles.btn_save_name} onClick={handleSave}></button>
                    </>
                }
                {
                    !actInputName &&
                    <>
                        <div className={styles.name}>{_freezer?.name} </div>
                    <FontAwesomeIcon data-target="delete" icon={faTrashCan} className={styles.btn_edit}/>
                    </>
                }
                
        </div>
    </>)
}

const EditSection = ({ section, freezerkey , index }) => { 
    const [actInputName, setActInputName] = useState(false);
    const [_section, setSection] = useState(section);
    const dataServiceContext = useContext(DataServiceContext);
    const refName = useRef();
    
    const handleSave = () => { 
        dataServiceContext.updateSection(getSession('uid'),freezerkey,index, { ..._section, name: refName.current.value });
        setSection({ ..._section, name: refName.current.value });
        setActInputName(!actInputName);
    }

    const handleInputName = (e) => {
        if (e.target.dataset.target === 'delete') { 
            console.log(section.key);
            if (window.confirm('삭제 하시겠습니까? 아래 음식도 함께 삭제됩니다.')) { 
                dataServiceContext.deleteSection(getSession('uid'), section.key);
            }
            return;
        }
        setActInputName(!actInputName);
        setTimeout(() => { 
            refName.current.focus();
            refName.current.select();
        }, 10)
    }

    return (
        <li className={styles.section} onClick={handleInputName}>
            <i className={`${styles.rec_icon} color${index + 1}` }></i>
            {!actInputName &&
                <>
                    <div className={styles.section_name}>{_section?.name}</div>
                    <div className={styles.section_date}>{retrieveDateFromId(_section?.key)}</div>
                    <FontAwesomeIcon data-target="delete" icon={faTrashCan} className={styles.btn_edit}/>
                </>
            }
            {actInputName && <input ref={refName} type="text" onBlur={handleSave} className={`${styles.input_name}`} defaultValue={_section?.name}/>}
            
        </li>
    )
}

const retrieveDateFromId = (id) => { 
    const time = id.substring(2, id.length);
    return moment(new Date(parseInt(time))).format("YYYY년 MM월 DD일")
}
export default MyFreezer;

