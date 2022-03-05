
import React , { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './swiperType.module.css'


// SwiperCore.use([Navigation, Pagination])

const SwiperType = memo(({ data, tags }) => {
  
  return (
    <Swiper className={styles.swiper}
      pagination={{ clickable: true }}
      loop={false}>
      {
        data.map((type, i) => {
          return (<SwiperSlide className={styles.slide} key={i} >
            <button className={`${tags.indexOf(type) > -1 ? styles.selected : ''} ${styles.button}`} >{type}</button>
          </SwiperSlide>)
        })
      }
    </Swiper>
  )
});

export default SwiperType;