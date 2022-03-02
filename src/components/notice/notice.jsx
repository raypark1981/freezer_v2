import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./notice.module.css";

const Notice = ({}) => {
  const navigate = useNavigate();
  const goToPage = (e) => {
    const target = e.currentTarget.dataset.target;
    switch (target) {
      case "back":
        navigate("/freezer", {});
        break;
    }
  };

  return (
    <section className={styles.my_notice}>
        <header className={styles.header}>
            <h3 className={`${styles.middle} ${styles.align_center}` }>장바구니</h3>
            <div className={styles.right}>
                <button data-target="back" onClick={goToPage}></button>
            </div>
        </header>
        <div className={styles.block} >
          <div className={styles.section}>
            <div className={styles.notice_box}>
            <div className={styles.notice_type}>[ 서비스 안내 ]</div>
            <div className={styles.gap}></div>
            <div className={styles.date}>2022년 03월 01일</div>    
            </div>  
            <div className={styles.title}>
              내 냉장고를 부탁해 웹 출시!!
            </div>
          </div>
          <div>
            <i className={`${styles.arrow} ${styles.arrow_up}`}></i>
          </div>
        </div>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <p className={styles.point}>#당신의 냉장고를 관리해줄 혁신적 어플 </p>
          당신의 냉장고를 효과적으로 관리할 어플이 탄생했습니다. <br/> 설치를 망설이는 당신! 둘중에 하나만 골라 YES or YES! 
          <p className={styles.point}>#냉장고속 유통기한 관리 까지 꼼꼼히!</p>
          냉장고에서 푸른생명체를 키우시는 모든 분들을 위해 유통기한이 지난 식품이 있다면 알림을 드립니다! 물론! 공짜! 
          <p className={styles.point}>#냉장고 파먹기 도전?</p>
        응! 도전! 냉장고 속 재료를 활용한 레시피를 추천해 드립니다. <br/><br/> 
          어플을 다운받아 주신 모든 분들께 감사드리며 더 좋은 서비스가 될 수 있도록 최선을 다하겠습니다.
        </div>
      </div>        
        
    </section>
  )
};

export default Notice;
