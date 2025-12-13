import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "./FirstBlock.css";
import bgGif from "../assets/analog.gif";
import { registerUser, loginUser } from "../api";

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};


export default function FirstBlock() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const navRef = useRef(null);
  const rafRef = useRef(null);
  const latestXRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    latestXRef.current = x;

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        if (navRef.current && latestXRef.current != null) {
          navRef.current.style.setProperty("--cursor-x", `${latestXRef.current}px`);
        }
        rafRef.current = null;
      });
    }
  };

  const handleMouseLeave = () => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      const center = Math.round(rect.width / 2);
      navRef.current.style.setProperty("--cursor-x", `${center}px`);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    
    const form = e.target.closest("form");
    const formData = new FormData(form);
    
    const usernameInput = (formData.get("username") || "").trim();
    const password = (formData.get("password") || "").trim();
    const emailInput = (formData.get("email") || "").trim();

    if (!usernameInput || !password || (authMode === "signup" && !emailInput)) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }
    
    try {
      if (authMode === "login") {
        const data = await loginUser({ email: usernameInput, password });
        setError(`Welcome back, ${data.username}!`); 
        setTimeout(() => setShowModal(false), 1000);
      } else {
        const data = await registerUser({ username: usernameInput, email: emailInput, password });
        setError(`Success!`);
        setTimeout(() => setShowModal(false), 2000);
      }
    } catch (err) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = (e) => {
    e.preventDefault();
    setError(""); 
    setAuthMode((m) => (m === "login" ? "signup" : "login"));
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="firstblock-container">
      <div className="background-layer">
        <img src={bgGif} alt="background" className="background-gif" />
      </div>

      <motion.nav
        ref={navRef}
        className="navbar"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ "--cursor-x": "50%" }}
      >
        <div className="nav-left">PoincaréLab</div>
        <div className="nav-center">
          <a href="#about"onClick={(e) => scrollToSection(e, "about")}>About</a>
          <a href="#approach" onClick={(e) => scrollToSection(e, "approach")}>Approach</a>
          <a href="#contacts"onClick={(e) => scrollToSection(e, "contacts")}>Contacts</a>
        </div>
        <div className="nav-right">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="login-btn"
            onClick={() => {
              setAuthMode("login");
              setError(""); 
              setShowModal(true);
            }}
          >
            Login / Sign up
          </motion.button>
        </div>
      </motion.nav>

      <motion.div
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="main-title animate-gradient">Frontier. Advanced. Reasoning.</h1>
        <h3 className="main-description">
        </h3>
      </motion.div>
      <div className="main-cta-wrapper">
        <motion.button
          className="waitlist-btn"
          onClick={() => {
            setAuthMode('signup'); 
            setError(""); 
            setShowModal(true);
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Join waitlist
        </motion.button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <h2>{authMode === "login" ? "Welcome back" : "Join the Waitlist"}</h2>
              
              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="error-message"
                    style={{ 
                      color: error.includes("Success") || error.includes("Welcome") ? '#00d4ff' : '#ff72ff', 
                      fontSize: '0.85rem',
                      overflow: 'hidden',
                      margin: '0',
                      padding: '0 0.5rem',
                      fontWeight: '500'
                    }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
              
              <motion.form 
                onSubmit={handleAuth} 
                className="auth-form" 
                autoComplete="off"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { 
                    transition: {
                      staggerChildren: 0.08,
                    } 
                  }
                }}
              >
                <motion.input 
                  name="username" 
                  placeholder={authMode === "login" ? "Email" : "Username"} 
                  type={authMode === "login" ? "email" : "text"} 
                  variants={itemVariants} 
                />
                
                {authMode === "signup" && (
                  <motion.input 
                    name="email" 
                    placeholder="Email" 
                    type="email" 
                    variants={itemVariants} 
                  />
                )}
                
                <motion.input 
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                  variants={itemVariants} 
                />
                
                <motion.button 
                  type="submit" 
                  className="primary-auth-btn" 
                  disabled={loading}
                  variants={itemVariants}
                  whileHover={{ scale: loading ? 1 : 1.01, translateY: loading ? 0 : -3 }}
                >
                  {loading 
                    ? <span className="spinner-border">Processing...</span> 
                    : (authMode === "login" ? "Sign in" : "Join Waitlist")
                  }
                </motion.button>
              </motion.form>

              <p className="switch-line">
                {authMode === "login" ? (
                  <>
                    No account yet?{" "}
                    <button className="link-btn" onClick={toggleAuthMode} disabled={loading}>
                      Join waitlist
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button className="link-btn" onClick={toggleAuthMode} disabled={loading}>
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}