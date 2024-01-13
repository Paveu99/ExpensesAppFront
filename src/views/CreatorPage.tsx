import React from 'react';
import '../components/styles/Creator.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Keyboard, Mousewheel, Pagination} from 'swiper/modules';
import {AnimatedSlide} from "../components/slides/AnimatedSlide";
import img1 from "../components/styles/images/Paweł Jarecki - photo.jpg"
import img2 from "../components/styles/images/4672500.png"
import img3 from "../components/styles/images/Profile.jpg"

export const CreatorPage = () => {
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
                <SwiperSlide>
                    <AnimatedSlide>
                        <div className="about">
                            <img className="profile-img" src={img1} alt="Profile picture"/>
                            <div className="description">
                                <h2 className="intro">Hi it's me!</h2>
                                <p>
                                    Hi, I am graduate from Wroclaw University of Science and Technology, who is very passionate about new technologies and programming.
                                    I am working as a Technology Analyst at UBS.
                                    My preferable choice of programming language is JavaScript/TypeScript. I love working with React and MySQL, with which I created couple of projects that you can view on my GitHub repository.
                                </p>
                            </div>
                        </div>
                    </AnimatedSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <AnimatedSlide>
                        <div className="about">
                            <img className="gmail-img" src={img2} alt="Gmail picture"/>
                            <div className="description">
                                <h2 className="intro">Contact?</h2>
                                <p>
                                    Here is my email address:
                                    <br/>
                                    <a href="mailto:paweljarecki10@gmail.com?subject=Question&body=Description">paweljarecki10@gmail.com</a>
                                </p>
                            </div>
                        </div>
                    </AnimatedSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <AnimatedSlide>
                        <div className="about">
                            <img className="github-img" src={img3} alt="Github profile"/>
                            <div className="description">
                                <h2 className="intro">My repo!</h2>
                                <p>Here is a link to my GitHub repository in case you would like to see a little bit more of my projects. Hope you will find inspiration or help over there.</p>
                            </div>
                        </div>
                    </AnimatedSlide>
                </SwiperSlide>
            </Swiper>
        </div>
};