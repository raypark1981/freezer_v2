import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination, Mousewheel, Keyboard} from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/scrollbar';
import styles from './whatis.module.css'
import './whatis.cutsom.css'
import { getLocal, setLocal } from '../../services/session';
import moment from 'moment';

const WhatIs = ({ setVisibleWhatis }) => { 
    // const [visible, setVisible] = useState(true);
    const data = [
        { key : 1 , url : '/images/whatis/whatis-1.png'}
        ,{ key : 2 , url : '/images/whatis/whatis-2.png'}
        ,{ key : 3 , url : '/images/whatis/whatis-3.png'}
        ,{ key : 4 , url : '/images/whatis/whatis-4.png'}
    ];
    const close = (e) => {
        switch (e.target.dataset.target) { 
            case 'close':
                setLocal('whatis', moment(new Date()).add(1, 'days')._d.toString());
                break;
            case 'close_f':
                setLocal('whatis', moment(new Date()).add(365, 'days')._d.toString());
                break;
        }
        setVisibleWhatis(false)
        // setVisible(false);
    }
    
    return (
        <div className={styles.what_is}>
            <div className={styles.blinder}></div>
            <Swiper className={styles.container}
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                loop={false}>

                {
                  data.map((img, i) => {
                        return (
                        <SwiperSlide className={styles.slide_custom} key={img.key} >
                            <div className={styles.img}>
                                <img src={img.url} alt="" />
                            </div>
                        </SwiperSlide>)
                    })
                }
            </Swiper>
            <div className={styles.confirm}>
                <p className={styles.button_box}>

                    <button data-target="close" onClick={close}><i className={styles.xbutton}></i> 닫기</button>
                    <button data-target="close_f" onClick={close}><i className={styles.xbutton}></i> 다시보지않기</button>
                </p>
            </div>
        </div>
    )
}

export default WhatIs;