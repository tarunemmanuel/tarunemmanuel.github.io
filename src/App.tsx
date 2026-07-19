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
          <p className="hero-tag reveal">MACHINE LEARNING ENGINEER</p>

          <h1 className="hero-title reveal">
            Building production AI solutions, LLM applications, RAG systems, and real-time ML pipelines.
          </h1>

          <p className="hero-subtitle hero-subtitle-center reveal">
            Machine Learning Engineer with 4 years of experience building production AI solutions across financial services and enterprise applications. Strong background in Python, PyTorch, FastAPI, LangChain, Kubernetes, and cloud platforms.
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
            <a href="mailto:iamtarunemmanuel@gmail.com" aria-label="Email">
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
              Machine Learning Engineer with 4 years of experience building production AI solutions across
              financial services and enterprise applications. Experienced in designing Large Language Model (LLM)
              applications, Retrieval Augmented Generation (RAG) systems, intelligent document processing, and real-time
              machine learning pipelines.
            </p>
            <br></br>
            <p className="section-text">
              Strong background in Python, PyTorch, FastAPI, LangChain, Kubernetes, and cloud platforms, with hands-on
              experience developing scalable AI services, automating ML workflows, and deploying models from experimentation to production.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card reveal">
              <p className="about-label">Location</p>
              <p className="about-value">Worcester, MA, USA</p>
            </div>
            <div className="about-card reveal">
              <p className="about-label">Email</p>
              <p className="about-value">iamtarunemmanuel@gmail.com</p>
            </div>
            <div className="about-card reveal">
              <p className="about-label">Phone</p>
              <p className="about-value">(774) 232-5627</p>
            </div>
            <div className="about-card reveal">
              <p className="about-label">Open To</p>
              <p className="about-value">Machine Learning Engineer / AI Engineer roles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section alt" id="skills">
        <div className="container">
          <h2 className="section-title reveal">Technical Skills</h2>

          <div className="skills-grid">
            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Programming & Core</h3>
              <div className="skills-icons">
                <span><i className="fa-brands fa-python"></i> Python</span>
                <span><i className="fa-brands fa-java"></i> Java</span>
                <span><i className="fa-solid fa-database"></i> SQL</span>
                <span><i className="fa-solid fa-bolt"></i> FastAPI</span>
                <span><i className="fa-solid fa-plug"></i> REST APIs</span>
                <span><i className="fa-solid fa-cubes"></i> Microservices</span>
                <span><i className="fa-solid fa-stream"></i> Apache Kafka</span>
                <span><i className="fa-solid fa-network-wired"></i> ETL Pipelines</span>
                <span><i className="fa-solid fa-server"></i> Distributed Systems</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Machine Learning</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-network-wired"></i> PyTorch</span>
                <span><i className="fa-solid fa-cubes"></i> TensorFlow</span>
                <span><i className="fa-solid fa-chart-line"></i> Scikit-learn</span>
                <span><i className="fa-solid fa-sitemap"></i> XGBoost</span>
                <span><i className="fa-solid fa-sitemap"></i> LightGBM</span>
                <span><i className="fa-solid fa-brain"></i> Transformers</span>
                <span><i className="fa-solid fa-font"></i> BERT</span>
                <span><i className="fa-solid fa-chart-area"></i> Prophet</span>
                <span><i className="fa-solid fa-wave-square"></i> LSTM & GRU</span>
                <span><i className="fa-solid fa-chart-line"></i> TFT</span>
                <span><i className="fa-solid fa-magnifying-glass-chart"></i> SHAP</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Generative AI & Agentic AI</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-link"></i> LangChain</span>
                <span><i className="fa-solid fa-diagram-project"></i> LangGraph</span>
                <span><i className="fa-solid fa-robot"></i> OpenAI GPT-4o</span>
                <span><i className="fa-solid fa-cloud"></i> Azure OpenAI</span>
                <span><i className="fa-solid fa-wand-magic-sparkles"></i> Agentic AI</span>
                <span><i className="fa-solid fa-book-open"></i> RAG</span>
                <span><i className="fa-solid fa-pen-nib"></i> Prompt Engineering</span>
                <span><i className="fa-solid fa-sliders"></i> QLoRA & PEFT</span>
                <span><i className="fa-solid fa-database"></i> Embeddings</span>
                <span><i className="fa-solid fa-magnifying-glass"></i> Hybrid Search</span>
                <span><i className="fa-solid fa-check-double"></i> RAGAS</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Cloud & MLOps</h3>
              <div className="skills-icons">
                <span><i className="fa-brands fa-aws"></i> AWS (SageMaker, Bedrock, Textract, Lex)</span>
                <span><i className="fa-solid fa-cloud"></i> Azure AI Services</span>
                <span><i className="fa-brands fa-docker"></i> Docker</span>
                <span><i className="fa-solid fa-network-wired"></i> Kubernetes</span>
                <span><i className="fa-solid fa-wind"></i> Apache Airflow</span>
                <span><i className="fa-solid fa-chart-line"></i> MLflow</span>
                <span><i className="fa-solid fa-arrows-rotate"></i> CI/CD</span>
                <span><i className="fa-solid fa-rocket"></i> Model Deployment</span>
                <span><i className="fa-solid fa-heart-pulse"></i> Model Monitoring</span>
                <span><i className="fa-solid fa-gears"></i> LLMOps</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Document AI & Computer Vision</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-file-contract"></i> LayoutLM</span>
                <span><i className="fa-solid fa-file-text"></i> Tesseract OCR</span>
                <span><i className="fa-solid fa-eye"></i> OpenCV</span>
                <span><i className="fa-solid fa-microchip"></i> ONNX Runtime</span>
                <span><i className="fa-solid fa-robot"></i> Intelligent Document Processing</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Databases & Tools</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-database"></i> PostgreSQL</span>
                <span><i className="fa-solid fa-memory"></i> Redis</span>
                <span><i className="fa-solid fa-database"></i> Vector Databases</span>
                <span><i className="fa-brands fa-git-alt"></i> Git</span>
                <span><i className="fa-brands fa-github"></i> GitHub</span>
                <span><i className="fa-solid fa-list-check"></i> Jira</span>
                <span><i className="fa-solid fa-users"></i> Agile Scrum</span>
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
            Selected projects showcasing deep learning forecasting, risk scoring anomaly detection, and RAG troubleshooting engines.
          </p>

          <div className="projects-grid">
            <article className="project-card reveal">
              <div className="project-header">
                <span className="project-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </span>
                <h3>Stock Market Trend Prediction Analysis</h3>
              </div>

              <p className="project-desc">
                Engineered a high-frequency trading forecasting engine using LSTM and GRU networks with TensorFlow, achieving a 25% increase in prediction accuracy for historical market datasets. Developed a full-stack financial dashboard using FastAPI and React.js to visualize real-time inference, reducing latency by 30% through optimized preprocessing pipelines and NumPy vectorization.
              </p>

              <ul className="project-tags">
                <li>Python</li>
                <li>TensorFlow</li>
                <li>LSTM / GRU</li>
                <li>FastAPI</li>
                <li>React.js</li>
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
                  <i className="fa-solid fa-shield-halved"></i>
                </span>
                <h3>Credit Card Fraud Detection</h3>
              </div>

              <p className="project-desc">
                Architected a real-time risk scoring system using Random Forest and Scikit-learn, processing 984K+ transactions to detect anomalies and minimize false positives in high-volume production environments. Implemented an automated feature engineering pipeline with Python and SQL, utilizing SMOTE for imbalanced data handling and Docker for scalable, containerized model deployment.
              </p>

              <ul className="project-tags">
                <li>Python</li>
                <li>Random Forest</li>
                <li>Scikit-learn</li>
                <li>SMOTE</li>
                <li>Docker</li>
                <li>SQL</li>
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
                  <i className="fa-solid fa-robot"></i>
                </span>
                <h3>RAG Assistant for SAP Incident Troubleshooting</h3>
              </div>

              <p className="project-desc">
                Developed a RAG-based assistant that ingests historical SAP tickets, dumps, job logs, and internal KB/SAP Notes into a vector database for similarity search. Implemented text chunking, embeddings, and retrieval pipelines so that for a new incident, the system surfaces similar cases and contextual documents, enabling LLMs to generate targeted troubleshooting guidance.
              </p>

              <ul className="project-tags">
                <li>Python</li>
                <li>RAG</li>
                <li>Vector Databases</li>
                <li>Embeddings</li>
                <li>LLMs</li>
              </ul>

              <div className="project-links">
                <a
                  className="link-btn"
                  href="https://github.com/tarunemmanuel/rag-sap-troubleshooting"
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
          <h2 className="section-title reveal">Professional Experience</h2>

          <div className="timeline reveal">
            <div className="timeline-item reveal">
              <span className="timeline-dot"></span>
              <div className="timeline-content">
                <p className="timeline-period">Sep 2025 – Present</p>
                <h3>State Street · Machine Learning Engineer</h3>
                <p>
                  • Architected and deployed Retrieval Augmented Generation applications using LangChain, LangGraph, Azure OpenAI, and vector databases to improve enterprise knowledge discovery for financial research teams.
                  <br />
                  • Developed Agentic AI workflows with tool calling, memory management, and multi-step reasoning to automate research, document analysis, and internal knowledge retrieval.
                  <br />
                  • Built scalable inference services using FastAPI, Docker, and Kubernetes, enabling reliable deployment of LLM powered applications with sub two second response times.
                  <br />
                  • Designed hybrid retrieval pipelines combining embeddings, BM25 search, reranking models, and semantic search to improve response relevance across enterprise AI assistants.
                  <br />
                  • Implemented end to end MLOps and LLMOps workflows using MLflow, Apache Airflow, CI/CD, automated evaluation, and model monitoring, reducing model deployment time by 60%.
                  <br />
                  • Collaborated with data scientists, software engineers, and business stakeholders to deliver secure, scalable AI solutions aligned with enterprise governance and compliance requirements.
                </p>
              </div>
            </div>

            <div className="timeline-item reveal">
              <span className="timeline-dot"></span>
              <div className="timeline-content">
                <p className="timeline-period">Apr 2021 – Dec 2023</p>
                <h3>Happiest Minds Technologies · Machine Learning Engineer</h3>
                <p>
                  • Developed customer churn prediction models using Python, Scikit learn, XGBoost, and SQL on more than 1 million customer records, improving retention campaign effectiveness by 18%.
                  <br />
                  • Built intelligent document processing solutions using LayoutLM, OCR, and transformer models, reducing manual document processing by 70%.
                  <br />
                  • Improved document extraction accuracy from 67% to 89% by implementing layout aware NLP pipelines for scanned and semi structured documents.
                  <br />
                  • Automated model training, deployment, and monitoring using Apache Airflow, MLflow, Docker, and Kubernetes to streamline machine learning operations.
                  <br />
                  • Developed demand forecasting models using Prophet, LSTM, and Temporal Fusion Transformers to support inventory planning and business forecasting.
                  <br />
                  • Collaborated with product managers and engineering teams to integrate machine learning models into production applications, contributing to solutions that generated approximately $2 million in annual operational savings.
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
                  <span className="badge badge-solid">Master's</span>
                </div>
              </div>

              <p className="edu-degree">MS in Computer Science, GPA: 3.9/4.0</p>
            </article>

            <article className="edu-card glass-card reveal" data-magnet="10">
              <div className="edu-top">
                <div className="edu-mark" aria-hidden="true">JNTU</div>

                <div className="edu-head">
                  <h3 className="edu-school">Jawaharlal Nehru Technological University</h3>
                  <p className="edu-location">Anantapur, India</p>
                </div>

                <div className="edu-badges">
                  <span className="badge">July 2018 – May 2022</span>
                  <span className="badge badge-solid">Bachelor's</span>
                </div>
              </div>

              <p className="edu-degree">Bachelors in Computer Science</p>
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
              Looking for a Machine Learning Engineer or AI Engineer for your team? Reach out and let's talk.
            </p>

            <ul className="contact-list">
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:iamtarunemmanuel@gmail.com">iamtarunemmanuel@gmail.com</a>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:7742325627">(774) 232-5627</a>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
                <a href="https://www.linkedin.com/in/tarun-emmanuel-m/" target="_blank" rel="noreferrer">
                  linkedin.com/in/tarun-emmanuel-m
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

              window.location.href = `mailto:iamtarunemmanuel@gmail.com?subject=${subject}&body=${body}`;
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
        </div>
      </footer>
    </>
  );
}


