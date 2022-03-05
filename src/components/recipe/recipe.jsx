import React, {memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./recipe.module.css";
import { DataServiceContext } from "../../App";
import { getSession } from '../../services/session';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperType from './swiperType';

const Recipe = ({ }) => {
  const navigate = useNavigate();
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
      setTags(!e.target.value ? [] : [e.target.value]);
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

    /** tag 삭제 재클릭시 */
    if (newTags.indexOf(v) >= 0) { 
      setTags(newTags.filter(h => h !== v))
      return;
    }
    
    let selectedIngredient, selectedType, selectedWay;
    switch (tap) { 
      case 'i':
        /** 재료는 중복이 가능함으로 */
        newTags.indexOf(v) < 0 && setTags([...new Set([...newTags, e.target.innerText])].filter(i => !!i));
        break;
      case 'w':
        selectedIngredient = [...new Set(newTags.filter(i => cookIngredient.includes(i)))] 
        selectedType = [...new Set(newTags.filter(i => cookType.includes(i)))] 
        /** 방법은 중복이 불가능함 */
        selectedWay = [e.target.innerText] 
        setTags([...new Set([
          useSearch.current.value
          , ...selectedIngredient
          , ...selectedWay
          , ...selectedType
          , e.target.innerText])].filter(i => !!i));
          break;
      case 't':
        selectedIngredient = [...new Set(newTags.filter(i => cookIngredient.includes(i)))] 
        /** 종류별도 중복이 불가능함 */
        selectedType = [e.target.innerText] 
        selectedWay = [...new Set(newTags.filter(i => cookWay.includes(i)))] 
        setTags([...new Set([
          useSearch.current.value
          , ...selectedIngredient
          , ...selectedWay
          , ...selectedType
          , e.target.innerText])].filter(i => !!i));
          break;
    }

  };

  const getRecipes = (type, dtls, way2, pat2) => {
    fetch('/recipe.json?type=' + type).then(data => data.json()).then((data) => {
      setHotRecipe(data.RecipeIndexlist);
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
    dataServiceContext.getFoods(getSession('uid'), (data) => {
      Object.keys(data).map(key => {
        const food = data[key];
        Object.keys(food).map(_key => {
          !!food[_key].recipeYN && temp.push(food[_key].foodName);
        })
      });
      
      setCookIngredient(temp);
    });
  
    // getRecipes('search');
  }, [])

  useEffect(() => { 
    console.log(hotRecipe.filter(r => { 
      
      // return tags.indexOf(r.RCP_PAT2) > -1 || tags.indexOf(r.RCP_WAY2) > -1 || 

    }))
    // setHotRecipe()
  }, [tags])

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
          <SwiperType data={cookIngredient} tags={tags} />
          {cookIngredient.length === 0 &&
            <>
              < i className={styles.happy} />
              <span>냉장고 재료를 선택해주세요!</span>
            </>
          }
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
        <ul className={styles.recipes}>
          {
            searchRecipe.length > 0 && searchRecipe.map((recipe) => { 
              return <RecipeItem key={recipe.REP_SEQ} recipe={recipe} />
            })
          }
        </ul>
        {
          searchRecipe.length == 0 && <div className={styles.no_data}><i className={styles.annoying}/>검색어를 입력해주세요</div>
        }
        <div className={styles.more}>
          <button>read more</button>
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.recipe_header}>
          <h4>인기레시피</h4>
          <div className={styles.tags}>
            <span>#밥</span><span>#끓이기</span>
          </div>
       
        </div>
        
         <ul className={styles.recipes}>
          {
            hotRecipe.length > 0 && hotRecipe.map((recipe) => { 
              return <RecipeItem key={recipe.RCP_SEQ} recipe={recipe} />
            })
          }
        </ul>
        {
          hotRecipe.length == 0 && <div className={styles.no_data}><i className={styles.annoying}/>검색어를 입력해주세요</div>
        }
        <div className={styles.more}>
          <button>read more</button>
        </div>
      </div>
    </section>
  );
};

const RecipeItem = memo(({ recipe }) => { 
  const { DISP_RCP_NM, RCP_WAY2, RCP_PAT2, HASH_TAG, ATT_FILE_NO_MAIN } = recipe;
  return (
    <li className={styles.recipe}>
      <div className={styles.image_box}>
        <img src={ATT_FILE_NO_MAIN} alt={DISP_RCP_NM} />
      </div>
      <h5>{DISP_RCP_NM}</h5>
      <div className={styles.tags}>
        { RCP_WAY2 && <span>#{RCP_WAY2}</span>}
        { RCP_PAT2 && <span>#{RCP_PAT2}</span>}
        { HASH_TAG && <span>#{HASH_TAG}</span>}
      </div>
    </li>
  )
})

export default Recipe;
