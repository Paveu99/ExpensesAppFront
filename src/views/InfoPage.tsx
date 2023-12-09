import React from 'react';
import '../components/styles/Creator.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../components/styles/Creator.scss'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {Keyboard, Mousewheel, Pagination} from 'swiper/modules';

interface AnimatedSlideProps {
  children: React.ReactNode;
}

const AnimatedSlide = (children: AnimatedSlideProps ) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
      <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2 }}
      >
        {children.children}
      </motion.div>
  );
};

export const InfoPage = () => {
  return <div className="creator">
    <Swiper
        modules={[Mousewheel, Pagination, Keyboard]}
        direction={'horizontal'}
        slidesPerView={1}
        spaceBetween={30}
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