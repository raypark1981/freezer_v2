import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./recipe.module.css";
import { DataServiceContext } from "../../App";

const Recipe = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState(location.state);

  const goToPage = (e) => {
    const target = e.currentTarget.dataset.target;
    switch (target) {
      case "save":
        navigate("/freezer", {});
        break;
    }
  };

  return (
    <section className={styles.my_freezer}>
      <header className={styles.header}>
          <div className={`${styles.middle}`}>
            <i></i>
          </div>
          <div className={styles.right}>
            <div className={styles.searchBox}>
              <input type="text" placeholder="재료명, 음식명, 태그" />
            
              <button data-target="searcch" onClick={goToPage}></button>              
            </div>
          </div>
      </header>
      <div className={styles.block}>
        <ul className={styles.types}>
          <li className={styles.selected}>재료별</li>
          <li>방법별</li>
          <li>종류별</li>
        </ul>
      </div>
      <div className={styles.sub_block}>
        <i className={styles.happy}/>
        냉장고 재료를 선택해주세요!
      </div>

      <div className={styles.block}>
        <div className={styles.recipe_header}>
          <h4>추천레시피</h4>
          <div className={styles.tags}>
            <span>#밥</span><span>#끓이기</span>
          </div>
       
        </div>
        <ul className={styles.recipes}>
          
          <li className={styles.recipe}>
            <div className={styles.image_box}>
              <img src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00015_2.png" alt="" />
            </div>
            <h5>오색영양밥 롤</h5>
            <div className={styles.tags}>
              <span>#밥</span><span>#끓이기</span>
            </div>
          </li>
          <li className={styles.recipe}>
            <div className={styles.image_box}>
              <img src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00128_2.png" alt="" />
            </div>
            <h5>볶음밥 만두</h5>
            <div className={styles.tags}>
              <span>#밥</span><span>#끓이기</span>
            </div>
          </li>
          <li className={styles.recipe}>
            <div className={styles.image_box}>
              <img src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00133_2.png" alt="" />
            </div>
            <h5>하수오 구기자 밥</h5>
            <div className={styles.tags}>
              <span>#밥</span><span>#끓이기</span>
            </div>
          </li>
        </ul>
        <div className={styles.no_data}><i className={styles.annoying}/>검색어를 입력해주세요</div>
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
          
          <li className={styles.recipe}>
            <div className={styles.image_box}>
              <img src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00015_2.png" alt="" />
            </div>
            <h5>오색영양밥 롤</h5>
            <div className={styles.tags}>
              <span>#밥</span><span>#끓이기</span>
            </div>
          </li>
          <li className={styles.recipe}>
            <div className={styles.image_box}>
              <img src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00128_2.png" alt="" />
            </div>
            <h5>볶음밥 만두</h5>
            <div className={styles.tags}>
              <span>#밥</span><span>#끓이기</span>
            </div>
          </li>
          <li className={styles.recipe}>
            <div className={styles.image_box}>
              <img src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00133_2.png" alt="" />
            </div>
            <h5>하수오 구기자 밥</h5>
            <div className={styles.tags}>
              <span>#밥</span><span>#끓이기</span>
            </div>
          </li>
        </ul>
        <div className={styles.no_data}><i className={styles.annoying}/>검색어를 입력해주세요</div>
        <div className={styles.more}>
          <button>read more</button>
        </div>
      </div>
    </section>
  );
};

export default Recipe;
