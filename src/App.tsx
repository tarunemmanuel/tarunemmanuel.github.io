import { useEffect, useMemo, useState } from "react";
import AmbientFX from "./components/AmbientFX";
import CursorFX from "./components/CursorFX";
import "./portfolio.css";

type Theme = "light" | "neon";

export default function App() {
  // Light theme default
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "neon" || saved === "light" ? saved : "light";
  });

  const year = useMemo(() => new Date().getFullYear(), []);

  // Always start at top on refresh
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Apply theme to <body>
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Mobile nav toggle
  useEffect(() => {
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");
    const onClick = () => links?.classList.toggle("show");
    toggle?.addEventListener("click", onClick);
    return () => toggle?.removeEventListener("click", onClick);
  }, []);

  // Active nav highlight on scroll + navbar condensed shadow
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a"));
    const navbar = document.querySelector<HTMLElement>(".navbar");

    const onScroll = () => {
      const y = window.scrollY;

      navbar?.classList.toggle("scrolled", y > 10);

      let current = "";
      for (const sec of sections) {
        const top = sec.offsetTop - 140;
        const bottom = top + sec.offsetHeight;
        if (y >= top && y < bottom) current = sec.id;
      }

      anchors.forEach((a) => {
        const href = a.getAttribute("href");
        a.classList.toggle("active", !!current && href === `#${current}`);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById("scrollbar-fill") as HTMLDivElement | null;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (bar) bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Modern reveal-on-scroll 
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.14 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <AmbientFX />
      <CursorFX />

      {/* Scroll progress */}
      <div className="scrollbar" aria-hidden="true">
        <div className="scrollbar-fill" id="scrollbar-fill" />
      </div>

      {/* Navbar */}
      <header className="navbar">
        <div className="nav-inner container">
          <a href="#home" className="logo">
            Tarun
          </a>

          <nav className="nav-links" id="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <button
              className="theme-btn"
              onClick={() => setTheme((t) => (t === "light" ? "neon" : "light"))}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <i className={theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"} />
              <span className="theme-label">{theme === "light" ? "Neon" : "Light"}</span>
            </button>

            <button className="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero hero-tarun" id="home">
        <div className="hero-watermark" aria-hidden="true">
          Tarun
        </div>

        <div className="container hero-center">
          <p className="hero-tag reveal">AI/ML ENGINEER</p>

          <h1 className="hero-title reveal">
            Engineering scalable AI systems with measurable impact.
          </h1>

          <p className="hero-subtitle hero-subtitle-center reveal">
            I design and deploy production-ready ML solutions from LLMs, RAG, and embeddings to
            end-to-end MLOps pipelines (training → evaluation → deployment) on cloud.
          </p>

          <div className="hero-actions hero-actions-center reveal">
            <a href="#projects" className="btn primary" data-magnet="14">
              View Work
            </a>
            <a href="#contact" className="btn ghost" data-magnet="14">
              Contact
            </a>
          </div>

          <div className="hero-socials hero-socials-center reveal">
            <a href="https://github.com/tarunemmanuel" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/tarun-emmanuel-m/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:tarunemmanuel.majhi@gmail.com" aria-label="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section reveal" id="about">
        <div className="container section-inner">
          <div>
            <h2 className="section-title">About Me</h2>
            <p className="section-text">
            I’m an AI/ML Engineer specializing in building production-ready machine learning systems and intelligent applications. I design scalable model pipelines, optimize training workflows, and deploy ML solutions that turn data into measurable impact.
            </p>
            <br>
            </br>
            <p className="section-text">
            I enjoy taking ML projects end-to-end — from data engineering and feature design to model development, evaluation, containerization, CI/CD automation, and cloud deployment.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card reveal">
              <p className="about-label">Location</p>
              <p className="about-value">Worcester, MA</p>
            </div>
            <div className="about-card reveal">
              <p className="about-label">Email</p>
              <p className="about-value">tarunemmanuel.majhi@gmail.com</p>
            </div>
            <div className="about-card reveal">
              <p className="about-label">Open To</p>
              <p className="about-value">AI-ML / SWE / DevOps roles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
<section className="section alt" id="skills">
  <div className="container">
    <h2 className="section-title reveal">Technical Expertise</h2>

    <div className="skills-grid">

      {/* Core Programming */}
      <div className="skills-card reveal glass-card" data-magnet="10">
        <h3>Programming & Core Tools</h3>
        <div className="skills-icons">
          <span><i className="fa-brands fa-python"></i> Python</span>
          <span><i className="fa-brands fa-js"></i> JavaScript</span>
          <span><i className="fa-brands fa-java"></i>Java</span>
          <span><i className="fa-solid fa-code"></i> Scala</span>
          <span><i className="fa-solid fa-bolt"></i> PySpark</span>
          <span><i className="fa-solid fa-terminal"></i> Bash</span>
          <span><i className="fa-brands fa-git-alt"></i> Git</span>
          <span><i className="fa-solid fa-database"></i> PostgreSQL</span>
          <span><i className="fa-solid fa-database"></i> MySQL</span>
          <span><i className="fa-solid fa-file-code"></i> JSON / YAML</span>
        </div>
      </div>

      {/* Machine Learning */}
      <div className="skills-card reveal glass-card" data-magnet="10">
        <h3>Machine Learning</h3>
        <div className="skills-icons">
          <span><i className="fa-solid fa-chart-line"></i> Linear Regression</span>
          <span><i className="fa-solid fa-chart-line"></i> Logistic Regression</span>
          <span><i className="fa-solid fa-layer-group"></i> Classification Algs</span>
          <span><i className="fa-solid fa-sitemap"></i> Ensemble Algs</span>
          <span><i className="fa-solid fa-wave-square"></i> Time Series Algs</span>
          <span><i className="fa-solid fa-magnifying-glass-chart"></i> Anomaly Detection</span>
          <span><i className="fa-solid fa-wand-magic-sparkles"></i> Feature Engineering</span>
          <span><i className="fa-solid fa-compress"></i> Dimensionality Reduction</span>
          <span><i className="fa-solid fa-sliders"></i> Model Optimization</span>
          <span><i className="fa-solid fa-chart-pie"></i> Model Evaluation</span>
        </div>
      </div>

      {/* NLP & Generative AI */}
      <div className="skills-card reveal glass-card" data-magnet="10">
        <h3>NLP & Generative AI</h3>
        <div className="skills-icons">
          <span><i className="fa-solid fa-robot"></i> LLMs</span>
          <span><i className="fa-solid fa-diagram-project"></i> Transformers</span>
          <span><i className="fa-solid fa-font"></i> BERT</span>
          <span><i className="fa-solid fa-database"></i> Embeddings</span>
          <span><i className="fa-solid fa-magnifying-glass"></i> Semantic Search</span>
          <span><i className="fa-solid fa-book-open"></i> RAG</span>
          <span><i className="fa-solid fa-pen-nib"></i> Prompt Engineering</span>
          <span><i className="fa-solid fa-sitemap"></i> Agentic Workflows</span>
        </div>
      </div>

      {/* ML Libraries */}
      <div className="skills-card reveal glass-card" data-magnet="10">
        <h3>ML Libraries & Frameworks</h3>
        <div className="skills-icons">
          <span><i className="fa-solid fa-table"></i> Pandas</span>
          <span><i className="fa-solid fa-chart-simple"></i> NumPy</span>
          <span><i className="fa-solid fa-network-wired"></i> PyTorch</span>
          <span><i className="fa-solid fa-cubes"></i> TensorFlow</span>
          <span><i className="fa-solid fa-chart-line"></i> scikit-learn</span>
          <span><i className="fa-solid fa-brain"></i> Hugging Face</span>
          <span><i className="fa-solid fa-square-root-variable"></i> Statsmodels</span>
          <span><i className="fa-solid fa-chart-area"></i> Matplotlib</span>
          <span><i className="fa-solid fa-chart-column"></i> Seaborn</span>
        </div>
      </div>

      {/* Cloud & DevOps */}
      <div className="skills-card reveal glass-card" data-magnet="10">
        <h3>Cloud, DevOps & MLOps</h3>
        <div className="skills-icons">
          <span><i className="fa-brands fa-aws"></i> AWS </span>
          <span><i className="fa-solid fa-cloud"></i> Azure ML</span>
          <span><i className="fa-brands fa-docker"></i> Docker</span>
          <span><i className="fa-solid fa-network-wired"></i> Kubernetes</span>
          <span><i className="fa-solid fa-arrows-rotate"></i> CI/CD </span>
          <span><i className="fa-solid fa-gears"></i> ML Pipelines</span>
          <span><i className="fa-solid fa-chart-line"></i> MLflow</span>
          <span><i className="fa-solid fa-heart-pulse"></i> Model Monitoring</span>
          <span><i className="fa-solid fa-code-branch"></i> Terraform</span>
        </div>
      </div>

      {/* Data Engineering */}
      <div className="skills-card reveal glass-card" data-magnet="10">
        <h3>Data Engineering & Analytics</h3>
        <div className="skills-icons">
          <span><i className="fa-solid fa-database"></i> Data Modeling</span>
          <span><i className="fa-solid fa-database"></i> Data Warehousing</span>
          <span><i className="fa-solid fa-server"></i> ETL / ELT Pipelines</span>
          <span><i className="fa-solid fa-database"></i> Snowflake</span>
          <span><i className="fa-solid fa-leaf"></i> MongoDB</span>
          <span><i className="fa-solid fa-database"></i> Vector Databases</span>
          <span><i className="fa-solid fa-chart-column"></i> Tableau</span>
          <span><i className="fa-solid fa-chart-pie"></i> Power BI</span>
        </div>
      </div>

      {/* Domain */}
      <div className="skills-card reveal glass-card" data-magnet="10">
        <h3>Domain & Responsible AI</h3>
        <div className="skills-icons">
          <span><i className="fa-solid fa-shield-halved"></i> Fraud Detection</span>
          <span><i className="fa-solid fa-scale-balanced"></i> Credit Risk Modeling</span>
          <span><i className="fa-solid fa-file-shield"></i> Regulatory Compliance</span>
          <span><i className="fa-solid fa-eye"></i> Explainable AI (XAI)</span>
          <span><i className="fa-solid fa-clipboard-check"></i> Model Governance</span>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* Projects */}
      <section className="section" id="projects">
        <div className="container">
          <h2 className="section-title reveal">Featured Projects</h2>
          <p className="section-text center reveal">
            Selected work in ML systems, analytics, and full-stack apps.
          </p>

          <div className="projects-grid">
            <article className="project-card reveal">
              <div className="project-header">
                <span className="project-icon">
                  <i className="fa-solid fa-shield-halved"></i>
                </span>
                <h3>Credit Card Fraud Detection</h3>
              </div>

              <p className="project-desc">
                Random Forest fraud detection with imbalance handling (SMOTE) and model tuning.
              </p>

              <ul className="project-tags">
                <li>Python</li>
                <li>ML (Random Forest)</li>
                <li>SMOTE</li>
              </ul>

              <div className="project-links">
                <a
                  className="link-btn"
                  href="https://github.com/tarunemmanuel/credit-card-fraud-detection"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-github" /> View Repo
                </a>
              </div>
            </article>

            <article className="project-card reveal">
              <div className="project-header">
                <span className="project-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </span>
                <h3>Stock Market Trend Prediction</h3>
              </div>

              <p className="project-desc">
                Trend prediction using ML/DL approaches (LSTM/GRU comparisons) with visualization.
              </p>

              <ul className="project-tags">
                <li>Python</li>
                <li>LSTM</li>
                <li>GRU</li>
              </ul>

              <div className="project-links">
                <a
                  className="link-btn"
                  href="https://github.com/tarunemmanuel/stock-market-trend-prediction"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-github" /> View Repo
                </a>
              </div>
            </article>

            <article className="project-card reveal">
              <div className="project-header">
                <span className="project-icon">
                  <i className="fa-solid fa-box-archive"></i>
                </span>
                <h3>Archivum</h3>
              </div>

              <p className="project-desc">
                A web application for managing and archiving documents and files within blockchain.
              </p>

              <ul className="project-tags">
                <li>Blockchain</li>
                <li>Containers</li>
                <li>Hardhat</li>
              </ul>

              <div className="project-links">
                <a
                  className="link-btn"
                  href="https://github.com/tarunemmanuel/archivum"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-github" /> View Repo
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

     {/* Experience */}
<section className="section alt" id="experience">
  <div className="container">
    <h2 className="section-title reveal">Experience</h2>

    <div className="timeline reveal">
      <div className="timeline-item reveal">
        <span className="timeline-dot"></span>
        <div className="timeline-content">
          <p className="timeline-period">Sep 2025 – Present</p>
          <h3>Goldman Sachs Group, USA · AI/ML Engineer</h3>
          <p>
            • Led AI-driven fraud detection for custody banking using LLMs and RAG with Hugging Face and FAISS on transaction data,
            improving accuracy by 28% and reducing false positives by 15% while ensuring SOC 2 compliance.
            <br />
            • Developed AI-driven quantitative trading strategies for equities using time-series analysis, recommender systems, and agentic
            workflows (LangChain), improving trading outcomes and alpha generation in high-frequency markets.
            <br />
            • Fine-tuned Transformer models (BERT) with prompt engineering for NLP-based sentiment analysis on client feedback and market notes,
            enhancing risk prediction and portfolio optimization across asset management desks.
            <br />
            • Built end-to-end ML pipelines with PyTorch and AWS SageMaker for real-time credit risk scoring, including feature engineering and
            evaluation (AUC 0.92), enabling faster loan servicing approvals while ensuring SOC 2 compliance.
          </p>
        </div>
      </div>

      <div className="timeline-item reveal">
        <span className="timeline-dot"></span>
        <div className="timeline-content">
          <p className="timeline-period">Apr 2021 – Dec 2023</p>
          <h3>Happiest Minds Technologies, India · ML Engineer</h3>
          <p>
            • Engineered a predictive analytics platform for financial forecasting using Transformers and fine-tuning with PyTorch on time-series data,
            achieving 22% better accuracy in market volatility prediction for investment clients.
            <br />
            • Developed unsupervised clustering models (K-Means) with Scikit-learn and prompt engineering for client segmentation, integrating
            agents for real-time recommendations and increasing portfolio personalization and retention by 18%.
            <br />
            • Automated ML workflows with Azure ML Studio and PySpark for batch processing, including model evaluation (Precision/Recall) and
            A/B testing, optimizing resource usage and cutting deployment time by 30%.
            <br />
            • Collaborated with data science and DevOps teams to ensure compliance in model training, using Git and Jenkins for CI/CD to deliver
            scalable solutions for enterprise finance analytics.
            <br />
            • Built predictive models with Scikit-learn and vector databases (FAISS) for anomaly detection in transaction data, applying feature
            engineering to reduce false alerts by 20% in early-stage projects.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
      
      {/* Education */}
      <section className="section alt" id="education">
        <div className="container">
          <h2 className="section-title reveal">Education</h2>

          <div className="edu-grid">
            <article className="edu-card glass-card reveal" data-magnet="10">
              <div className="edu-top">
                <div className="edu-mark" aria-hidden="true">CU</div>

                <div className="edu-head">
                  <h3 className="edu-school">Clark University</h3>
                  <p className="edu-location">Worcester, MA</p>
                </div>

                <div className="edu-badges">
                  <span className="badge">Jan 2024 – Dec 2025</span>
                  <span className="badge badge-solid">GPA 3.94</span>
                </div>
              </div>

              <p className="edu-degree">Master of Science · Computer Science</p>
            </article>

            <article className="edu-card glass-card reveal" data-magnet="10">
              <div className="edu-top">
                <div className="edu-mark" aria-hidden="true">JNTU</div>

                <div className="edu-head">
                  <h3 className="edu-school">Jawaharlal Nehru Technological University (Anantapur)</h3>
                  <p className="edu-location">Andhra Pradesh, India</p>
                </div>

                <div className="edu-badges">
                  <span className="badge">June 2018 - May 2022</span>
                  <span className="badge badge-solid">GPA 3.2</span>
                </div>
              </div>

              <p className="edu-degree">Bachelor of Technology · Computer Science and Engineering</p>
            </article>
          </div>
        </div>
      </section>

{/* Contact */}
      <section className="section" id="contact">
        <div className="container contact-inner">
          <div className="reveal">
            <h2 className="section-title">Let’s Connect</h2>
            <p className="section-text">
              Want to collaborate or hiring for Software / AI-ML / DevOps roles? Reach out.
            </p>

            <ul className="contact-list">
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:tarunemmanuel.majhi@gmail.com">tarunemmanuel.majhi@gmail.com</a>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
                <a href="https://www.linkedin.com/in/tarun-emmanuel-m/" target="_blank" rel="noreferrer">
                  linkedin.com/in/tarunemmanuel
                </a>
              </li>
              <li>
                <i className="fab fa-github"></i>
                <a href="https://github.com/tarunemmanuel" target="_blank" rel="noreferrer">
                  github.com/tarunemmanuel
                </a>
              </li>
            </ul>
          </div>

          <form
  className="contact-form reveal"
  onSubmit={(e) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const message = (document.getElementById("message") as HTMLTextAreaElement).value;

    const subject = encodeURIComponent(`Portfolio Contact — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:tarunemmanuel.majhi@gmail.com?subject=${subject}&body=${body}`;
  }}
>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Your name" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={4} placeholder="Tell me about your project or role…" required />
            </div>

            <button className="btn primary full-width" type="submit">
              Send Message <i className="fa-solid fa-paper-plane" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner reveal">
          <p>© {year} Tarun Emmanuel Majhi. All rights reserved.</p>
          <p className="footer-note">Built with React + TypeScript · Deployed on GitHub Pages</p>
        </div>
      </footer>
    </>
  );
}
