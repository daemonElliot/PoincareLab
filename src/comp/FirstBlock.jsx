import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "./FirstBlock.css";
import bgGif from "../assets/analog.gif";
import { registerUser, loginUser } from "../api";

export default function FirstBlock() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); 
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
    const form = e.target.closest("form");
    const formData = new FormData(form);
    const username = (formData.get("username") || "").trim();
    const password = (formData.get("password") || "").trim();
    const email = (formData.get("email") || "").trim();

    if (!username || !password || (authMode === "signup" && !email)) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (authMode === "login") {
        const data = await loginUser({ username, password });
        alert(`Welcome back, ${data.username}!`);
      } else {
        const data = await registerUser({ username, email, password });
        alert(`Account created for ${data.username}`);
      }
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleAuthMode = (e) => {
    e.preventDefault();
    setAuthMode((m) => (m === "login" ? "signup" : "login"));
  };

  // Функция плавного скролла к секции
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
          <a href="#approach" onClick={(e) => scrollToSection(e, "approach")}>Approach</a>
          <a href="#contacts"onClick={(e) => scrollToSection(e, "contacts")}>Contacts</a>
        </div>

        <div className="nav-right">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="login-btn"
            onClick={() => {
              setAuthMode("login");
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
        <p className="main-description">
          Towards Probabilistic Reinforcement Learning
        </p>
      </motion.div>

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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <h2>{authMode === "login" ? "Welcome back" : "Create an account"}</h2>

              <form onSubmit={handleAuth} className="auth-form" autoComplete="off">
                <input name="username" placeholder="Username" />
                {authMode === "signup" && <input name="email" placeholder="Email" type="email" />}
                <input name="password" type="password" placeholder="Password" />
                <button type="submit" className="primary-auth-btn">
                  {authMode === "login" ? "Sign in" : "Sign up"}
                </button>
              </form>

              <p className="switch-line">
                {authMode === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button className="link-btn" onClick={toggleAuthMode}>
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button className="link-btn" onClick={toggleAuthMode}>
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
