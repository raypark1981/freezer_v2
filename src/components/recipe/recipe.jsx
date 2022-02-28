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
      case "delete":
        navigate("/freezer", {});
        break;
    }
  };

  return (
    <section className={styles.my_freezer}>
      <header className={styles.header}>
        <div>
          <button
            data-target='delete'
            className={styles.left}
            onClick={goToPage}
          ></button>
        </div>
        <h3 className={`${styles.middle} ${styles.align_center}`}>
          추천레시피
        </h3>
        <div>
          <button
            data-target='save'
            className={styles.right}
            onClick={goToPage}
          ></button>
        </div>
      </header>
      <div
        className={styles.block}
        onClick={goToPage}
        data-target='addDetail'
      ></div>
    </section>
  );
};

export default Recipe;
