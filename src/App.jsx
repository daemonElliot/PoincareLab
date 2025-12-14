import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import FirstBlock from "./comp/FirstBlock.jsx";
import SecondBlock from "./comp/SecondBlock.jsx";
import ThirdBlock from "./comp/ThirdBlock.jsx";
import AboutBlock from "./comp/AboutBlock.jsx";
import "./App.css";

function App() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  return (
    <>
      <FirstBlock />
      <AboutBlock />
      <SecondBlock />
      <ThirdBlock />

      <AnimatePresence>
        {showScroll && (
          <motion.button
            className="scroll-to-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;