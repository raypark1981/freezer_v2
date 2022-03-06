import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './recipeDetail.module.css';
import fetchJsonp from 'fetch-jsonp';

const hostName = '//foodkiper.com/'
const apikey = 'wkftkfdkqhqtlek'
const trimZeroPoint = (value) => {
    return value ? value.replace(/(0+$)/, "").replace(/\.$/, "") : "";
}
const RecipeDetail = () => { 
    const { id } = useParams();
    const [rcpInfo, setRcpInfo] = useState({})
    const navigate = useNavigate();
    const loadRecipeInfo = () => {
        fetchJsonp(`${hostName}api/RecipeAPI?id=${id}&key=${apikey}`,
            { jsonpCallbackFunction: 'jsoncallback' })
            .then(function (response) {
              return response.json()
            }).then(function (json) {
                setRcpInfo(json);
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    useEffect(() => {
        loadRecipeInfo();
    }, [])

    return (
    <div>
        <div className={`${styles.recipe_container}`}>
                <a className={styles.close} onClick={() => { navigate(-1)}}></a>
           <div className={styles.title_wrapper}>
              <div className={styles.text_box}>
                 <p>{rcpInfo.RCP_NM}</p>
              </div>
                    <img src={rcpInfo.ATT_FILE_NO_MK} />
                    <div className={styles.icon}>
                        <i className={`${styles.like} ${styles.on}`}></i>
                        <i className={styles.view}></i><span>30</span>
                    </div>
              <div className={styles.nutrition_}>
                 <p>영양성분(1인분)</p>
                 <table>
                    <tbody>
                       <tr>
                          <td>열량</td>
                          <td className={styles.info}>{trimZeroPoint(rcpInfo.INFO_ENG)}Kcal</td>
                       </tr>
                       <tr>
                          <td>탄수화물</td>
                          <td className={styles.info}>{trimZeroPoint(rcpInfo.INFO_CAR)}g</td>
                       </tr>
                       <tr>
                          <td>단백질</td>
                          <td className={styles.info}>{trimZeroPoint(rcpInfo.INFO_PRO)}g</td>
                       </tr>
                       <tr>
                          <td>지방</td>
                          <td className={styles.info}>{trimZeroPoint(rcpInfo.INFO_FAT)}g</td>
                       </tr>
                       <tr>
                          <td>나트륨</td>
                          <td className={styles.info}>{trimZeroPoint(rcpInfo.INFO_NA)}mg</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
           <div className={styles.recipe_wrapper}>
              <div className={styles.title}><span>재료</span></div>
                    <div className={styles.ingredient}>
                        {
                            rcpInfo.RCP_PARTS_DTLS && rcpInfo.RCP_PARTS_DTLS.split("\n").map((v, i) => (<span key={i}>{v}</span>))
                        }
                    </div>
              <div className={styles.title}><span>레시피</span></div>
              <div className={styles.method}>
                 <ul>
                 {
                    rcpInfo.MANUALS && rcpInfo.MANUALS.map((v, i) => {
                            if(v.MANUAL_DESC){
                                if(v.MANUAL_IMG){
                                    return <li key={i}><img src={v.MANUAL_IMG} /><p className="right">{v.MANUAL_DESC}</p></li>
                                }else{
                                    return <li key={i}><p>{v.MANUAL_DESC}</p></li>
                                }
                            }
                        })
                }
                 </ul>
              </div>
              <div className={styles.title}><span>영양성분</span></div>
              <div className={styles.nutrition}>
                        <div className={styles.title_wrap}><span className={styles.title}>열량</span>
                        <span className={styles.kcal}>{trimZeroPoint(rcpInfo.INFO_ENG)}kcl/{rcpInfo.INFO_WGT}</span></div>
                 <table>
                    <thead>
                       <tr>
                          <th>탄수화물</th>
                          <th>딘백질</th>
                          <th>지방</th>
                          <th className={styles.last}>나트륨</th>
                       </tr>
                    </thead>
                    <tbody>
                       <tr>
                          <td>{trimZeroPoint(rcpInfo.INFO_CAR)}g</td>
                          <td>{trimZeroPoint(rcpInfo.INFO_PRO)}g</td>
                          <td>{trimZeroPoint(rcpInfo.INFO_FAT)}g</td>
                          <td className={styles.last}>{trimZeroPoint(rcpInfo.INFO_NA)}mg</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
     </div>
     )
}

export default RecipeDetail;