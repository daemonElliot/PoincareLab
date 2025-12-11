import React from "react";
import { motion } from "framer-motion";
import "./AboutBlock.css";
import aboutBg from "../assets/loopwater.gif"; 
import sphereGif from "../assets/artpink.gif"; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

const AboutBlock = () => {
  return (
    <section 
      id="about" 
      className="about-block"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="about-bg-overlay" />

      <motion.div
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants} className="about-header">
          <div className="title-row">
            <h2 className="section-title">about</h2>
            <img src={sphereGif} alt="sphere" className="darksphere-gif" />
          </div>
        </motion.div>

        <motion.p 
          className="about-intro-text"
          variants={itemVariants} 
        >
          We are people who commit ourselves to advancing the frontier of genuine AI reasoning models, working collectively to provide resilient, precisely engineered solutions for high-dimensional decision-making challenges.
        </motion.p>

        <div className="cards-grid">
          <motion.div className="glass-card" variants={itemVariants}>
            <span className="card-number">01</span>
            <h2>
              AI that works for every human being 
            </h2>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutBlock;