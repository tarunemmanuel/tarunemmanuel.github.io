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
            Building production ML platforms, real-time streaming pipelines, and enterprise GenAI systems.
          </h1>

          <p className="hero-subtitle hero-subtitle-center reveal">
            Machine Learning Engineer with around 4 years of experience designing, deploying, and maintaining production ML platforms and streaming infrastructure across banking and insurance. Specialized in real-time inference pipelines, graph neural networks, MLOps, and enterprise GenAI systems using Python, PySpark, PyTorch, AWS SageMaker/EKS, and vector databases.
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
              Machine Learning Engineer with around 4 years of experience designing, deploying, and maintaining production ML platforms and
              streaming infrastructure across banking and insurance. Specialized in real-time inference pipelines, graph neural networks, MLOps, and
              enterprise GenAI systems using Python, PySpark, PyTorch, AWS SageMaker/EKS, and vector databases.
            </p>
            <br></br>
            <p className="section-text">
              Proven track record of delivering high-impact financial systems, including cutting annual trade fail penalties by $3.2M at State Street
              and reducing manual insurance claim review times by 35%.
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
              <p className="about-value">+17742325627</p>
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
              <h3>Programming Languages & Frameworks</h3>
              <div className="skills-icons">
                <span><i className="fa-brands fa-python"></i> Python</span>
                <span><i className="fa-solid fa-bolt"></i> PySpark</span>
                <span><i className="fa-solid fa-table"></i> Polars</span>
                <span><i className="fa-solid fa-chart-line"></i> Scikit-learn</span>
                <span><i className="fa-solid fa-fire"></i> PyTorch</span>
                <span><i className="fa-solid fa-link"></i> LangChain</span>
                <span><i className="fa-solid fa-layer-group"></i> LlamaIndex</span>
                <span><i className="fa-solid fa-circle-nodes"></i> NetworkX</span>
                <span><i className="fa-solid fa-calculator"></i> NumPy</span>
                <span><i className="fa-solid fa-table-cells"></i> Pandas</span>
                <span><i className="fa-solid fa-server"></i> FastAPI</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Machine Learning & AI</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-diagram-project"></i> ML Systems Design</span>
                <span><i className="fa-solid fa-sitemap"></i> XGBoost & LightGBM</span>
                <span><i className="fa-solid fa-sitemap"></i> CatBoost</span>
                <span><i className="fa-solid fa-circle-nodes"></i> PyTorch Geometric</span>
                <span><i className="fa-solid fa-circle-nodes"></i> Graph Neural Networks</span>
                <span><i className="fa-solid fa-language"></i> NLP</span>
                <span><i className="fa-solid fa-brain"></i> Transformers & BERT</span>
                <span><i className="fa-solid fa-brain"></i> Sentence-Transformers</span>
                <span><i className="fa-solid fa-book-open"></i> RAG Systems</span>
                <span><i className="fa-solid fa-triangle-exclamation"></i> Anomaly Detection</span>
                <span><i className="fa-solid fa-chart-line"></i> Time-Series Modeling</span>
                <span><i className="fa-solid fa-sliders"></i> Feature Engineering</span>
                <span><i className="fa-solid fa-magnifying-glass-chart"></i> SHAP Explainability</span>
                <span><i className="fa-solid fa-scale-balanced"></i> Cost-Sensitive Learning</span>
                <span><i className="fa-solid fa-filter"></i> SMOTE (Imbalance)</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>MLOps & Lifecycle</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-rocket"></i> Model Deployment</span>
                <span><i className="fa-solid fa-stream"></i> Streaming Inference</span>
                <span><i className="fa-solid fa-layer-group"></i> Batch Inference</span>
                <span><i className="fa-solid fa-heart-pulse"></i> Evidently AI & TruLens</span>
                <span><i className="fa-solid fa-flask"></i> MLflow Tracking</span>
                <span><i className="fa-solid fa-microchip"></i> ONNX Runtime</span>
                <span><i className="fa-solid fa-compress"></i> AWQ Quantization</span>
                <span><i className="fa-solid fa-magnifying-glass"></i> Vector Search Infra</span>
                <span><i className="fa-solid fa-database"></i> Feast Feature Store</span>
                <span><i className="fa-solid fa-memory"></i> Redis Enterprise</span>
                <span><i className="fa-solid fa-arrows-rotate"></i> CI/CD for ML</span>
                <span><i className="fa-solid fa-chart-pie"></i> Data & Drift Detection</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Distributed Computing & Cloud</h3>
              <div className="skills-icons">
                <span><i className="fa-brands fa-aws"></i> AWS SageMaker</span>
                <span><i className="fa-brands fa-aws"></i> AWS EKS & S3</span>
                <span><i className="fa-brands fa-aws"></i> Lambda & EventBridge</span>
                <span><i className="fa-brands fa-aws"></i> AWS Redshift</span>
                <span><i className="fa-solid fa-cloud"></i> Azure ML & Databricks</span>
                <span><i className="fa-solid fa-cloud"></i> Event Hubs & CosmosDB</span>
                <span><i className="fa-solid fa-network-wired"></i> Ray Serve & Cluster</span>
                <span><i className="fa-brands fa-docker"></i> Docker</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Data Engineering & Streaming</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-stream"></i> Apache Kafka</span>
                <span><i className="fa-solid fa-snowflake"></i> Snowflake & Iceberg</span>
                <span><i className="fa-solid fa-wind"></i> Apache Airflow</span>
                <span><i className="fa-solid fa-database"></i> PostgreSQL (pgvector)</span>
                <span><i className="fa-solid fa-table"></i> SQL</span>
                <span><i className="fa-solid fa-cubes"></i> Pinecone & Qdrant</span>
                <span><i className="fa-solid fa-cubes"></i> FAISS & Milvus</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Domain Knowledge (BFSI)</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-shield-halved"></i> P&C Insurance Fraud</span>
                <span><i className="fa-solid fa-credit-card"></i> Credit Risk Underwriting</span>
                <span><i className="fa-solid fa-user-shield"></i> AML Anomaly Detection</span>
                <span><i className="fa-solid fa-money-bill-transfer"></i> T+1 Trade Settlement</span>
                <span><i className="fa-solid fa-chart-pie"></i> Fixed Income Attribution</span>
                <span><i className="fa-solid fa-file-invoice-dollar"></i> ISO 20022 & Swift Parsing</span>
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
            Selected projects showcasing high-frequency deep learning forecasting, risk scoring anomaly detection, and RAG troubleshooting engines.
          </p>

          <div className="projects-grid">
            <article className="project-card reveal">
              <div className="project-header">
                <span className="project-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </span>
                <h3>Stock Market Trend Prediction Analysis with Deep Learning and ML</h3>
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
                  • Engineered a low-latency T+1 settlement fail prediction system on AWS EKS using LightGBM and ONNX Runtime to intercept high-risk trade exceptions. Streamlined intraday routing for custody operations, cutting manual investigations by 32% and mitigating $3.2M in annual penalty fees.
                  <br />
                  • Constructed sub-50ms streaming feature pipelines via Apache Kafka, PySpark, and Redis Enterprise to ingest Swift ISO 20022 message flows and custodian balance feeds. Enabled real-time liquidity exposure scoring that achieved an 89% precision rate prior to market cutoffs.
                  <br />
                  • Deployed multi-task neural network models within Ray Serve to simultaneously forecast settlement failure probabilities and estimate overnight cash buffer requirements. Automated risk-prioritized ticket queues inside the State Street Alpha middle-office platform.
                  <br />
                  • Architected a fixed-income similarity framework using PyTorch Geometric Graph Neural Networks to model complex corporate bond capital structures. Generated 256-dimensional embeddings for 1.2M+ instruments, improving missing price estimation accuracy by 24% RMSE.
                  <br />
                  • Scaled a high-throughput Qdrant vector search infrastructure on Ray clusters to execute sub-10ms nearest-neighbor queries across illiquid municipal and corporate assets. Accelerated quantitative factor-risk calculations for SSGA portfolio managers from 45 minutes down to 4.
                  <br />
                  • Formulated sparse regularized ensemble algorithms paired with Kalman Filtering to deliver dynamic factor risk attribution matrices for non-liquid securities. Enhanced portfolio stress-testing capabilities across 5,000+ institutional client accounts.
                </p>
              </div>
            </div>

            <div className="timeline-item reveal">
              <span className="timeline-dot"></span>
              <div className="timeline-content">
                <p className="timeline-period">Apr 2021 – Dec 2023</p>
                <h3>Happiest Minds Technologies · Machine Learning Engineer</h3>
                <p>
                  • Accelerated Scikit-Learn and TensorFlow model-training workflows by optimizing Pandas transformations and feature-matrix construction, reducing average experimentation runtime by 31% across 20+ model iterations.
                  <br />
                  • Engineered an end-to-end P&C claims fraud detection model on AWS SageMaker using XGBoost and CatBoost to replace legacy rule-based intake. Handled extreme class imbalance with SMOTE-Tomek, cutting manual reviews by 35% and saving $1.8M annually.
                  <br />
                  • Integrated NLP sentiment analysis on First Notice of Loss (FNOL) adjuster notes using BERT embeddings, feeding risk signals directly into the scoring engine. Accelerated straight-through processing for clean claims while increasing early fraud capture by 18%.
                  <br />
                  • Architected a real-time credit underwriting pipeline using PySpark, Azure Databricks, and Feast feature store to analyze streaming transaction velocity. Boosted default prediction accuracy by 12% over traditional scoring methods.
                  <br />
                  • Implemented SHAP explainability frameworks at inference to generate dynamic regulatory reason codes for automated loan decisions. Streamlined FCRA compliance workflows and reduced false-positive AML transaction alerts by 28%.
                  <br />
                  • Built a Hybrid-RAG document retrieval system using LangChain, Pinecone, and Azure OpenAI to parse complex commercial insurance policy PDFs. Reduced underwriter search times from 15 minutes to under 10 seconds per query.
                  <br />
                  • Designed a cross-encoder reranking pipeline with strict system guardrails to prevent LLM hallucinations during customer support interactions. Improved agent issue resolution rates by 40% while ensuring 100% factual accuracy against policy documents.
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

              <p className="edu-degree">B.Tech in Computer Science and Engineering</p>
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
                <a href="tel:+17742325627">+17742325627</a>
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


