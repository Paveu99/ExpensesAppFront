import React from 'react';
import '../components/styles/Info.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Keyboard, Mousewheel, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {AnimatedSlide} from "../components/slides/AnimatedSlide";

export const InfoPage = () => {
  return <div className="info-page">
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
      <SwiperSlide><AnimatedSlide>What is it really about?</AnimatedSlide></SwiperSlide>
      <SwiperSlide><AnimatedSlide>Step by step explanation</AnimatedSlide></SwiperSlide>
      <SwiperSlide><AnimatedSlide>Maybe some sort of videos</AnimatedSlide></SwiperSlide>
    </Swiper>
  </div>
};