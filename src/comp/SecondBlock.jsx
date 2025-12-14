import React from "react";
import { motion } from "framer-motion";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import "./SecondBlock.css";

import backgroundGif from "../assets/heart.gif";
import darkneon from "../assets/art.gif";

const SecondBlock = () => {
  return (
    <section
      id="approach"
      className="second-block"
      style={{ backgroundImage: `url(${backgroundGif})` }}
    >
      <div className="background-overlay" />

      <div className="about-container">
        <motion.div
          className="title-row"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="about-title">approach</h2>
          <img src={darkneon} alt="Deep Learning" className="title-gif" />
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        >
          <p>
            To tackle this problem, we propose, as one possible approach, a reinforcement learning policy specifically designed for tasks from the <strong>Abstraction and Reasoning Corpus</strong> benchmark.  
            The core idea is to embed a <strong>probabilistic reasoning layer</strong> into the policy structure, allowing the agent to evaluate possible next actions through a weighted probabilistic model rather than deterministic logits.  
            This approach captures the combinatorial, compositional and analogical nature of ARC transformations.
          </p>
        </motion.div>

        <motion.div
          className="math-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <h3 className="section-subtitle">Probabilistic Policy Formulation</h3>

          <div>
            Let the state space be <InlineMath math="\mathcal{S}" />, action space{" "}
            <InlineMath math="\mathcal{A}" />, and transition dynamics unknown. We
            model the policy as a conditional probability distribution:
          </div>

          <BlockMath math="\pi_\theta(a_t \mid s_t, \phi_t) = \frac{\exp(-\mathcal{E}_\theta(a_t, s_t, \phi_t))}{Z_\theta(s_t, \phi_t)}" />
          
          <div>
            where <InlineMath math="\mathcal{E}_\theta" /> is an energy function
            capturing the semantic cost, <InlineMath math="Z_\theta" /> is the
            partition function, and <InlineMath math="\phi_t" /> represents
            contextual latent variables.<br></br>
            The agent therefore minimizes the expected <em>free energy</em> functional
          </div>

          <BlockMath math="\mathcal{F}(\theta) = \mathbb{E}_{s_t \sim \rho_\pi} \Big[ \mathbb{E}_{a_t \sim \pi_\theta(\cdot \mid s_t)} [\mathcal{E}_\theta(a_t, s_t, \phi_t) - \tau \log \pi_\theta(a_t \mid s_t, \phi_t)] \Big]" />
          
          <div>
            where <InlineMath math="\tau" /> is a temperature parameter controlling
            stochasticity.
          </div>
        </motion.div>

        <motion.div
          className="math-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.9 }}
        >
          <h3 className="section-subtitle">Weighted Probabilistic Evaluation</h3>
          
          <div>
            Each action <InlineMath math="a_t" /> (e.g., grid transformation) is
            assigned a composite weight:
          </div>
          
          <BlockMath math="w(a_t \mid s_t) = \sum_i \alpha_i \, p_i(a_t \mid s_t)" />
          
          <div>
            where <InlineMath math="\alpha_i" /> are learnable coefficients and{" "}
            <InlineMath math="p_i" /> represent distinct reasoning hypotheses.
          </div>

          <BlockMath math="\pi_\theta(a_t \mid s_t) \propto w(a_t \mid s_t) \cdot \exp(-\mathcal{E}_\theta(a_t, s_t))" />
        </motion.div>

        <motion.div
          className="math-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.9 }}
        >
          <h3 className="section-subtitle">Bayesian Weight Dynamics</h3>
          
          <div>
            We introduce a Bayesian prior over the weight functions:
          </div>

          <BlockMath math="\alpha_i \sim \mathrm{Dirichlet}(\beta)" />
          
          <div>
            and update the posterior using variational inference:
          </div>

          <BlockMath math="q(\alpha_i) \propto p(\alpha_i) \exp\Big( \mathbb{E}_{a_t, s_t}[\log p(a_t \mid s_t, \alpha_i)] \Big)" />
          
        </motion.div>
      </div>
    </section>
  );
};

export default SecondBlock;