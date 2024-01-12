import React from 'react';
import '../components/styles/Info.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Keyboard, Mousewheel, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {AnimatedSlide} from "../components/slides/AnimatedSlide";
import el1 from '../components/styles/screens/Add.png';
import el2 from '../components/styles/screens/Next.png';
import el3 from '../components/styles/screens/Choice.png';
import el4 from '../components/styles/screens/Up.png';
import el5 from '../components/styles/screens/Down.png';
import el6 from '../components/styles/screens/All time.png';
import el7 from '../components/styles/screens/Year.png';
import el8 from '../components/styles/screens/Month.png';
import el9 from '../components/styles/screens/Edit past.png';
import el10 from '../components/styles/screens/All planned.png';
import el11 from '../components/styles/screens/Edit planned.png';

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
      <SwiperSlide>
          <AnimatedSlide>
              <div className="info-intro">
                  <h1 style={{fontSize: "60px"}}>Okay <span style={{color: "red"}}>Expense App</span>, but what is it exactly?</h1>
                  <div style={{width: "70vw", textAlign: "justify", fontSize: "22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                      <p>
                          Introducing an innovative web application designed for seamless expense tracking and management! User-friendly platform allows you to effortlessly record and categorize your expenditures based on all-time, yearly, and monthly perspectives. Experience real-time dynamism as you edit and seamlessly shift expenses across different dates, providing unparalleled flexibility.
                      </p>
                      <p>
                          But that's not all – envision your financial future with our unique feature for tracking upcoming expenses! Simply label them as future expenditures, and dive into future expense registry, where you can dynamically move them to the past, edit, or even remove them.
                      </p>
                      <p>
                          Take control of your financial journey with the ability to generate comprehensive reports, offering insights into your spending patterns over any selected period. Embrace the convenience of an application that not only tracks the past but empowers you to plan for the future.
                      </p>
                  </div>
              </div>
          </AnimatedSlide>
      </SwiperSlide>
      <SwiperSlide>
          <AnimatedSlide>
              <div className="tour-guide">
                  <h1 style={{fontSize: "60px", paddingTop: "30px"}}>Tour guide</h1>
                  <div className="container">
                      <div className="one">
                          <img src={el1} alt="" style={{width: "100%"}}/>
                          <p className="what">Add an expense</p>
                      </div>
                      <div className="two">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="three">
                          <img src={el3} alt="" style={{width: "100%"}}/>
                          <p className="what">Past or future?</p>
                      </div>
                      <div className="four">
                          <img src={el4} alt="" style={{width: "100%"}} className="arrowup"/>
                      </div>
                      <div className="five">
                          <img src={el5} alt="" style={{width: "100%"}} className="arrowdown"/>
                      </div>
                      <div className="six">
                          <img src={el6} alt="" style={{width: "100%"}}/>
                          <p className="what">All time view</p>
                      </div>
                      <div className="seven">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="eight">
                          <img src={el7} alt="" style={{width: "100%"}}/>
                          <p className="what">Year view</p>
                      </div>
                      <div className="nine">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="ten">
                          <img src={el8} alt="" style={{width: "100%"}}/>
                          <p className="what">Month view</p>
                      </div>
                      <div className="eleven">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="twelve">
                          <img src={el9} alt="" style={{width: "100%"}}/>
                          <p className="what">Edit view</p>
                      </div>
                      <div className="thirteen">
                          <img src={el10} alt="" style={{width: "100%"}}/>
                          <p className="what">All planned expenses view</p>
                      </div>
                      <div className="fourteen">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="fifteen">
                          <img src={el11} alt="" style={{width: "100%"}}/>
                          <p className="what">Edit future expenses view</p>
                      </div>
                  </div>
              </div>
          </AnimatedSlide>
      </SwiperSlide>
        <SwiperSlide>
            <AnimatedSlide>
                Maybe some sort of videos
            </AnimatedSlide>
        </SwiperSlide>
    </Swiper>
  </div>
};