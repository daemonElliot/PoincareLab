import React from "react";
import { motion } from "framer-motion";
import artdude from "../assets/artdude.gif";
import "./ThirdBlock.css";

const ThirdBlock = () => {
  return (
    <section id="contacts" className="contacts-block">
      <div className="contacts-overlay" />

      <div className="contacts-container">
        <motion.div
          className="contacts-title-row"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="contacts-title">contacts</h2> 

          <img src={artdude} alt="Contacts" className="contacts-gif" />
        </motion.div>

        <motion.div
          className="contacts-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="contact-info">
            <span className="contact-label">Inquiries</span>
            <span className="contact-email">info@poincarelab.org</span>
          </div>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <div className="footer-line" />
          <p className="footer-text">
            © 2025 Poincarelab. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThirdBlock;