import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './recipeList.module.css';

const RecipeList = ({ data }) => {
    const rowPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [totCnt, setTotCnt] = useState(0);
    const [pagingData, setPagingData] = useState([]);

    const getMore = () => {
        setCurrentPage(currentPage + 1);
    }

    const getPageingList = (list, _rowPerPage, _pageNumber) => {
        return list.filter((element, idx) => (idx >= _rowPerPage * _pageNumber - _rowPerPage && idx < _rowPerPage * _pageNumber));
    }

    // 페이지 첫로딩때 쓰임 검색후 첫 데이터가 변경될시
    useEffect(() => {
        
        if (data.length === 0) {
            setPagingData([]);
            setTotCnt(0);
            return;
        }

        setPagingData(getPageingList(data, rowPerPage, 1));
        setCurrentPage(1);
        setTotCnt(data.length);
    }, [data]);

    // when getMore click paging!
    useEffect(() => {
        if (currentPage > 1) { 
            setPagingData([...pagingData, ...getPageingList(data, rowPerPage, currentPage)])
        }
    }, [currentPage]);

    return (
        <>
            <ul className={styles.recipes}>
                {
                    pagingData.length > 0 && pagingData.map((recipe) => {
                        return <RecipeItem key={recipe.RCP_SEQ} recipe={recipe} />
                    })
                }
            </ul>
            {
                pagingData.length === 0 && <div className={styles.no_data}><i className={styles.annoying} />검색어를 입력해주세요</div>
            }
            {
                (totCnt > currentPage * rowPerPage)
                && <div className={styles.more}>
                    <button onClick={getMore}>read more</button>
                </div>
            }
        </>
    )

};


const RecipeItem = memo(({ recipe }) => { 
    const { RCP_SEQ, DISP_RCP_NM, RCP_WAY2, RCP_PAT2, HASH_TAG, ATT_FILE_NO_MAIN } = recipe;
    return (
      <li className={styles.recipe}>
        <div className={styles.image_box}>
          <Link to={"/recipe/" + RCP_SEQ}>
            <img src={ATT_FILE_NO_MAIN} alt={DISP_RCP_NM} />
          </Link>
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
  
export default RecipeList;