import React from 'react';
// import '../components/styles/Info.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Keyboard, Mousewheel, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {AnimatedSlide} from "../components/slides/AnimatedSlide";

export const InfoPage = () => {
  return <div className="creator">
    <Swiper
        modules={[Mousewheel, Pagination, Keyboard]}
        direction={'vertical'}
        slidesPerView={1}
        mousewheel={true}
        keyboard
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
    >
      <SwiperSlide><AnimatedSlide>Hejka</AnimatedSlide></SwiperSlide>
      <SwiperSlide><AnimatedSlide>Stulejka</AnimatedSlide></SwiperSlide>
      <SwiperSlide><AnimatedSlide>E;p</AnimatedSlide></SwiperSlide>
    </Swiper>
  </div>
};