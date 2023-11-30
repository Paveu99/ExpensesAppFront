import React from "react";
import Lottie from "react-lottie";
import el1 from "../components/styles/images/Animation.json";
import { motion } from 'framer-motion';
import "../components/styles/Home.scss"

export const HomePage = () => {

  const variantsLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  const variantsRight = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: el1,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <div className="home-view">
    {/*<h2 className="home-title">Hello there! What are we counting today?</h2>*/}
    <motion.div
        className="home"
        initial="hidden"
        animate="visible"
        variants={variantsLeft}
        transition={{ duration: 2 }}
    >
      <div className="e1">So far you have spent 100000$ this year</div>
      <div className="e2" style={{width: "80%", pointerEvents: "none"}}><Lottie options={defaultOptions}/></div>
      <div className="e3">You spend the most money on: Food</div>
      <div className="e4">Month when you spend the most amount of money was: December</div>
      <div className="e5">Your last purchase was: Kebab </div>
    </motion.div>
  </div>
}