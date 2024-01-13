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
import {Image} from "../components/info/InfoPopUp";

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
                  <p>Just click on an image to see more</p>
                  <div className="container">
                      <div className="one">
                          <Image src={el1} alt="Add an expense" description="A from that can either add a future expense or add old expense as a historic record. Form dynamically check input and shows you green checkmarks if conditions are met."></Image>
                          <p className="what">Add an expense</p>
                      </div>
                      <div className="two">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="three">
                          <Image src={el3} alt="Choose type" description="In this step you can either choose the past expenses or the planned ones to work with."></Image>
                          <p className="what">Past or future?</p>
                      </div>
                      <div className="four">
                          <img src={el4} alt="" style={{width: "100%"}} className="arrowup"/>
                      </div>
                      <div className="five">
                          <img src={el5} alt="" style={{width: "100%"}} className="arrowdown"/>
                      </div>
                      <div className="six">
                          <Image src={el6} alt="All time view" description="All time overall statistics are displayed on the screen with years to choose from. In all of the views a Excel type report can be downloaded just by clicking on icon."></Image>
                          <p className="what">All time view</p>
                      </div>
                      <div className="seven">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="eight">
                          <Image src={el7} alt="Year view" description="After choosing a year, the overall stats for that year are shown with months that have added expenses which can be clicked on and moved to a another view."></Image>
                          <p className="what">Year view</p>
                      </div>
                      <div className="nine">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="ten">
                          <Image src={el8} alt="Month view" description="After choosing a month, all the expenses that were added to this month are displayed, overall stats can be alos seen on the screen. By clicking on a expense user can trigger edit form to chenge or delete expense."></Image>
                          <p className="what">Month view</p>
                      </div>
                      <div className="eleven">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="twelve">
                          <Image src={el9} alt="Edit view" description="Form that allows user to manipulate already existing data. It can be either deleted or simply changed. After making any changes a button with 'Update Expense' will be unlocked, which means that a change can be saved."></Image>
                          <p className="what">Edit view</p>
                      </div>
                      <div className="thirteen">
                          <Image src={el10} alt="All planned expenses view" description="A view with overall stats for planned expenses and a table that contains all of them. By clicking on singular expense an edit form is trigggered. Data can be filtered by clicking on the head of every colummn. If we would like to come back to the default view a reset button will pop up and by clicking on it you can go back."></Image>
                          <p className="what">All planned expenses view</p>
                      </div>
                      <div className="fourteen">
                          <img src={el2} alt="" style={{width: "100%"}}/>
                      </div>
                      <div className="fifteen">
                          <Image src={el11} alt="Edit future expenses view" description="This edit form can be described as a mirror reflection of edit form for past expenses, but with a little twist which is a functionality that allows user to automatically move expenses that are overdue to the past expepenses."></Image>
                          <p className="what">Edit future expenses view</p>
                      </div>
                  </div>
              </div>
          </AnimatedSlide>
      </SwiperSlide>
        <SwiperSlide>
            <AnimatedSlide>
                Demo
            </AnimatedSlide>
        </SwiperSlide>
    </Swiper>
  </div>
};