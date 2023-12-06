import React from "react";
import Lottie from "react-lottie";
import el1 from "../components/styles/images/Animation.json";
import { motion } from 'framer-motion';
import "../components/styles/Home.scss"

export const HomePage = () => {

  const variantsLeft = {
    hidden: { opacity: 0, x: -20 },
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

  const red = <span className="e1__red">100000$</span>

  return <div className="home-view">
    <div
        className="home"
    >
      <motion.div
          className="e1"
          initial="hidden"
          animate="visible"
          variants={variantsLeft}
          transition={{ duration: 2 }}
      >
        So far you have spent: {red} this year
      </motion.div>
      <div className="e2" style={{pointerEvents: "none"}}>
        <div className="e2__lottie">
          <Lottie
              options={defaultOptions}
          />
        </div>
      </div>
      <motion.div
          className="e3"
          initial="hidden"
          animate="visible"
          variants={variantsLeft}
          transition={{ duration: 2, delay: 1}}
      >You spend the most money on: <div style={{"color": "red"}}>Food</div>
      </motion.div>
      <motion.div
          className="e4"
          initial="hidden"
          animate="visible"
          variants={variantsLeft}
          transition={{ duration: 2, delay: 1 }}
      >Month when you spend the most amount of money was: <br/><div style={{"color": "red"}}>December</div>
      </motion.div>
      <motion.div
          className="e5"
          initial="hidden"
          animate="visible"
          variants={variantsLeft}
          transition={{ duration: 2, delay: 1 }}
      >Your last purchase was: <div style={{"color": "red"}} >Kebab</div>
      </motion.div>
    </div>
  </div>
}