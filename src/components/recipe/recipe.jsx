import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./recipe.module.css";
import { DataServiceContext } from "../../App";
import { getSession } from '../../services/session';

import 'swiper/css';
import SwiperType from './swiperType';
import fetchJsonp from 'fetch-jsonp'
import RecipeList from './recipeList';

const hostName = '//foodkiper.com/'
const apikey = 'wkftkfdkqhqtlek'

const Recipe = ({ }) => {
  const [tags, setTags] = useState([]);
  const [hotRecipe, setHotRecipe] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState([]);
  const [cookIngredient, setCookIngredient] = useState([]);
  const [cookWay, setCookWay] = useState([]);
  const [cookType, setCookType] = useState([]);
  const [tap, setTap] = useState('i');
  const useSearch = useRef();
  const dataServiceContext = useContext(DataServiceContext);

  const handleInputChange = (e) => {
    if (e.keyCode === 13 || e.keyCode === undefined) {
      const params = !e.target.value ? [] : [e.target.value];
      setTags(params);
      searchRecipeAPI(params);
    }
  }

  const handleTapClick = (e) => {
    e.target.dataset.type && setTap(e.target.dataset.type);
  }

  const handleCookType = (e) => {
    
    const v = e.target.innerText;
    const newTags = [...tags.filter(t => t !== useSearch.current.value)];
    useSearch.current.value = ''
    if (e.target.tagName !== 'BUTTON') return;

    /** 재클릭시 tag 삭제  */
    let total = [];
    let selectedIngredient, selectedType, selectedWay;

    if (newTags.indexOf(v) >= 0) { 
      total = newTags.filter(h => h !== v);
      setTags(total)
      getRecipeAPI(total);
      return;
    }
  
    switch (tap) { 
      case 'i':
        /** 재료는 중복이 가능함으로 */
        total = [...new Set([...newTags, e.target.innerText])].filter(i => !!i);
        newTags.indexOf(v) < 0 && setTags(total);
        break;
      case 'w':
        selectedIngredient = [...new Set(newTags.filter(i => cookIngredient.includes(i)))] 
        selectedType = [...new Set(newTags.filter(i => cookType.includes(i)))] 
        /** 방법은 중복이 불가능함 */
        selectedWay = [e.target.innerText] 
        total = [...new Set([
          useSearch.current.value
          , ...selectedIngredient
          , ...selectedWay
          , ...selectedType
          , e.target.innerText])].filter(i => !!i);
        setTags(total);
        
          break;
      case 't':
        selectedIngredient = [...new Set(newTags.filter(i => cookIngredient.includes(i)))] 
        /** 종류별도 중복이 불가능함 */
        selectedType = [e.target.innerText] 
        selectedWay = [...new Set(newTags.filter(i => cookWay.includes(i)))] 
        total = [...new Set([
          useSearch.current.value
          , ...selectedIngredient
          , ...selectedWay
          , ...selectedType
          , e.target.innerText])].filter(i => !!i);
        setTags(total);
          break;
    }
    getRecipeAPI(total);
  };

  const searchRecipeAPI = (params) => { 
    const _params = `api/SearchAPI?type=searchByText&dtls=${params[0]}&way2=&pat2=&key=${apikey}`   
    setTimeout(() => {
      fetchJsonp(hostName + _params,
        { jsonpCallbackFunction: 'jsoncallback' })
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          setSearchRecipe(json.RecipeIndexlist);
        }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
    }, 100);
  }

  const getRecipeAPI = (params) => { 
    const ing = cookIngredient.filter(i => params.indexOf(i) > -1).map(i => encodeURIComponent(i));
    const way = cookWay.filter(i => params.indexOf(i) > -1).map(i => encodeURIComponent(i));;
    const typ = cookType.filter(i => params.indexOf(i) > -1).map(i => encodeURIComponent(i));;
    

    const _params = `api/SearchAPI?type=search&dtls=${ing.join('+')}&way2=${way[0] ? way[0] : '' }&pat2=${typ[0] ? typ[0] : ''}&key=${apikey}` 
    setTimeout(() => {
      fetchJsonp(hostName + _params,
        { jsonpCallbackFunction: 'jsoncallback' })
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          setSearchRecipe(json ? json.RecipeIndexlist : []);
        }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
    }, 100);
  }

  const getRecipes = (type, dtls, way2, pat2) => {
    fetch('/recipe.json?type=' + type).then(data => data.json()).then((data) => {
      setHotRecipe(data ? data.RecipeIndexlist : []);
      const tmpCookWay = [];
      const tmpCookType = []

      data.RecipeIndexlist.map(r => {
        r.RCP_WAY2 && tmpCookWay.push(r.RCP_WAY2)
        r.RCP_PAT2 && tmpCookType.push(r.RCP_PAT2)
      })

      /** 헤더에 표기될 버튼데이터 */
      setCookWay([...new Set(tmpCookWay)]);
      setCookType([...new Set(tmpCookType)]);
    })
  }

  useEffect(() => {
    getRecipes('hot');

    const temp = [];
    dataServiceContext.getFoods(getSession('uid')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        Object.keys(data).map(key => {
          const food = data[key];
          Object.keys(food).map(_key => {
            !!food[_key].recipeYN && temp.push(food[_key].foodName);
          })
        });
        
        setCookIngredient([...new Set(temp)]);
      }
    });
  }, [])

  return (
    <section className={styles.my_freezer}>
      <header className={styles.header}>
        <div className={`${styles.middle}`}>
          <Link to={'/freezer'}>
            <i></i>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.searchBox}>
            <input ref={useSearch} type="text" placeholder="재료명, 음식명, 태그" onKeyUp={handleInputChange} onBlur={handleInputChange} />
            <button>{/*input onblur*/}</button>
          </div>
        </div>
      </header>
      <div className={styles.block}>
        <ul className={styles.types} onClick={handleTapClick}>
          <li data-type="i" className={`${tap === 'i' && styles.selected}`}>재료별</li>
          <li data-type="w" className={`${tap === 'w' && styles.selected}`}>방법별</li>
          <li data-type="t" className={`${tap === 't' && styles.selected}`}>종류별</li>
        </ul>
      </div>
      {tap === 't' &&
        <div className={`${styles.sub_block}`} onClick={handleCookType}>
          <SwiperType data={cookType} tags={tags} />
        </div>
      }
      {
        tap === 'w' && <div className={`${styles.sub_block}`} onClick={handleCookType}>
        <SwiperType data={cookWay} tags={tags} />
        </div>
      }
      {tap === 'i' &&
        <div className={`${styles.sub_block}`} onClick={handleCookType}>
          {
            cookIngredient.length === 0 &&
            <>
              < i className={styles.happy} />
              <span>냉장고 재료를 선택해주세요!</span>
            </>
          }
          <SwiperType data={cookIngredient} tags={tags} />
        </div>
      }

      <div className={styles.block}>
        <div className={styles.recipe_header}>
          <h4>추천레시피</h4>
          <div className={styles.tags}>
            {
              tags && tags.map((s, i) => <span key={i}>#{s}</span>)
            }
          </div>
       
        </div>
        <RecipeList data={searchRecipe}/>
      </div>

      <div className={styles.block}>
        <div className={styles.recipe_header}>
          <h4>인기레시피</h4>
          <div className={styles.tags}>
            {/* <span>#밥</span><span>#끓이기</span> */}
          </div>
        </div>
        <RecipeList data={hotRecipe}/>
      </div>
    </section>
  );
};


export default Recipe;
