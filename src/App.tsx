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
          <p className="hero-tag reveal">AI SOFTWARE ENGINEER</p>

          <h1 className="hero-title reveal">
            Building scalable AI systems with LLMs, data pipelines, and cloud-native infrastructure.
          </h1>

          <p className="hero-subtitle hero-subtitle-center reveal">
            AI/ML Software Engineer with 3+ years of experience delivering production systems across
            RAG, distributed data pipelines, and end-to-end deployment using Python, AWS, and Kubernetes.
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
            <a href="mailto:tarunemmanuelx@gmail.com" aria-label="Email">
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
              I am an AI/ML Software Engineer with 3+ years of experience building scalable,
              production-grade systems. My work focuses on LLM applications, distributed data
              pipelines, and cloud-native infrastructure that improve model performance and create
              measurable business impact.
            </p>
            <br></br>
            <p className="section-text">
              I enjoy owning systems end to end, from data processing and model development to API
              design, deployment, monitoring, and optimization across modern ML and software stacks.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card reveal">
              <p className="about-label">Location</p>
              <p className="about-value">MA 01603, USA</p>
            </div>
            <div className="about-card reveal">
              <p className="about-label">Email</p>
              <p className="about-value">tarunemmanuelx@gmail.com</p>
            </div>
            <div className="about-card reveal">
              <p className="about-label">Open To</p>
              <p className="about-value">AI Software Engineer / ML Engineer roles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section alt" id="skills">
        <div className="container">
          <h2 className="section-title reveal">Technical Expertise</h2>

          <div className="skills-grid">
            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Programming & Core Tools</h3>
              <div className="skills-icons">
                <span><i className="fa-brands fa-python"></i> Python</span>
                <span><i className="fa-brands fa-java"></i> Java</span>
                <span><i className="fa-solid fa-database"></i> SQL</span>
                <span><i className="fa-solid fa-terminal"></i> Bash</span>
                <span><i className="fa-solid fa-bolt"></i> FastAPI</span>
                <span><i className="fa-solid fa-flask"></i> Flask</span>
                <span><i className="fa-solid fa-leaf"></i> Spring Boot</span>
                <span><i className="fa-solid fa-plug"></i> REST APIs</span>
                <span><i className="fa-solid fa-circle-nodes"></i> GraphQL</span>
                <span><i className="fa-solid fa-server"></i> Django</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Machine Learning</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-chart-line"></i> Regression</span>
                <span><i className="fa-solid fa-layer-group"></i> Classification</span>
                <span><i className="fa-solid fa-sitemap"></i> XGBoost</span>
                <span><i className="fa-solid fa-sitemap"></i> LightGBM</span>
                <span><i className="fa-solid fa-wave-square"></i> LSTM</span>
                <span><i className="fa-solid fa-wave-square"></i> ARIMA</span>
                <span><i className="fa-solid fa-magnifying-glass-chart"></i> Anomaly Detection</span>
                <span><i className="fa-solid fa-wand-magic-sparkles"></i> Feature Engineering</span>
                <span><i className="fa-solid fa-compress"></i> PCA</span>
                <span><i className="fa-solid fa-sliders"></i> Hyperparameter Tuning</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>NLP & Generative AI</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-robot"></i> LLM Development</span>
                <span><i className="fa-solid fa-diagram-project"></i> Transformers</span>
                <span><i className="fa-solid fa-font"></i> BERT</span>
                <span><i className="fa-solid fa-book-open"></i> RAG</span>
                <span><i className="fa-solid fa-pen-nib"></i> Prompt Engineering</span>
                <span><i className="fa-solid fa-link"></i> LangChain</span>
                <span><i className="fa-solid fa-sitemap"></i> Agentic Workflows</span>
                <span><i className="fa-solid fa-database"></i> Embeddings</span>
                <span><i className="fa-solid fa-magnifying-glass"></i> Semantic Search</span>
                <span><i className="fa-solid fa-face-smile"></i> Sentiment Analysis</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>ML Libraries & Frameworks</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-network-wired"></i> PyTorch</span>
                <span><i className="fa-solid fa-cubes"></i> TensorFlow</span>
                <span><i className="fa-solid fa-chart-line"></i> Scikit-learn</span>
                <span><i className="fa-solid fa-brain"></i> Hugging Face</span>
                <span><i className="fa-solid fa-square-root-variable"></i> Statsmodels</span>
                <span><i className="fa-solid fa-chart-area"></i> Matplotlib</span>
                <span><i className="fa-solid fa-chart-column"></i> Seaborn</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Cloud, DevOps & MLOps</h3>
              <div className="skills-icons">
                <span><i className="fa-brands fa-aws"></i> AWS</span>
                <span><i className="fa-brands fa-docker"></i> Docker</span>
                <span><i className="fa-solid fa-network-wired"></i> Kubernetes</span>
                <span><i className="fa-solid fa-arrows-rotate"></i> GitHub Actions</span>
                <span><i className="fa-solid fa-gears"></i> Jenkins</span>
                <span><i className="fa-solid fa-chart-line"></i> MLflow</span>
                <span><i className="fa-solid fa-heart-pulse"></i> Model Monitoring</span>
                <span><i className="fa-solid fa-chart-simple"></i> Drift Detection</span>
                <span><i className="fa-solid fa-code-branch"></i> Terraform</span>
                <span><i className="fa-solid fa-chart-column"></i> Grafana</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Data Engineering & Databases</h3>
              <div className="skills-icons">
                <span><i className="fa-solid fa-database"></i> PostgreSQL</span>
                <span><i className="fa-solid fa-database"></i> MySQL</span>
                <span><i className="fa-solid fa-database"></i> FAISS</span>
                <span><i className="fa-solid fa-database"></i> Pinecone</span>
                <span><i className="fa-solid fa-database"></i> Snowflake</span>
                <span><i className="fa-solid fa-leaf"></i> MongoDB</span>
                <span><i className="fa-solid fa-memory"></i> Redis</span>
                <span><i className="fa-solid fa-stream"></i> Apache Kafka</span>
                <span><i className="fa-solid fa-bolt"></i> PySpark</span>
              </div>
            </div>

            <div className="skills-card reveal glass-card" data-magnet="10">
              <h3>Frontend & Visualization</h3>
              <div className="skills-icons">
                <span><i className="fa-brands fa-react"></i> React.js</span>
                <span><i className="fa-solid fa-forward"></i> Next.js</span>
                <span><i className="fa-brands fa-js"></i> TypeScript</span>
                <span><i className="fa-brands fa-html5"></i> HTML</span>
                <span><i className="fa-brands fa-css3-alt"></i> CSS</span>
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
            Selected work in machine learning systems, forecasting, and anomaly detection.
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
                Engineered a scalable fraud detection system using Random Forest Classifier to flag
                anomalous transactions across a dataset of 984,000+ records.
              </p>

              <ul className="project-tags">
                <li>Python</li>
                <li>Random Forest</li>
                <li>Anomaly Detection</li>
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
                <h3>Stock Market Trend Prediction Analysis</h3>
              </div>

              <p className="project-desc">
                Led a 4-member team to design and deploy a full-stack stock prediction web app using
                Python, Flask, HTML, and CSS with dynamic data visualization for real-time insights.
              </p>

              <ul className="project-tags">
                <li>Python</li>
                <li>LSTM / GRU</li>
                <li>Flask</li>
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
                A web application for managing and archiving documents and files with a focus on
                structured storage, secure access, and modern user workflows.
              </p>

              <ul className="project-tags">
                <li>Web App</li>
                <li>Document Management</li>
                <li>Full Stack</li>
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
                <h3>State Street, USA · AI Software Engineer</h3>
                <p>
                  • Spearheaded development of a RAG-based investment copilot using LangChain,
                  OpenAI APIs, and FAISS, enhancing retrieval quality with re-ranking and cutting
                  analyst research time by 50%.
                  <br />
                  • Developed predictive models with Scikit-learn and vector databases for anomaly
                  detection in transaction data, incorporating feature engineering to reduce false
                  alerts by 20% in early-stage projects.
                  <br />
                  • Implemented secure, low-latency APIs using FastAPI, GraphQL, JWT, and Redis
                  caching, supporting high-concurrency financial queries while strengthening access
                  control and response efficiency.
                  <br />
                  • Orchestrated event-driven data pipelines with Kafka and Celery, applying
                  fault-tolerant streaming and partitioning strategies to accelerate multi-source
                  data ingestion by 35%.
                  <br />
                  • Established LLMOps workflows with LangChain and MLflow, incorporating prompt
                  versioning, evaluation pipelines, and monitoring to improve response reliability
                  and manage inference costs.
                </p>
              </div>
            </div>

            <div className="timeline-item reveal">
              <span className="timeline-dot"></span>
              <div className="timeline-content">
                <p className="timeline-period">Apr 2021 – Dec 2023</p>
                <h3>Happiest Minds Technologies, India · Machine Learning Engineer</h3>
                <p>
                  • Engineered a predictive analytics platform for financial forecasting using
                  Transformers and fine-tuning techniques with PyTorch on time-series data,
                  achieving 22% better accuracy in market volatility prediction for investment
                  clients.
                  <br />
                  • Collaborated with data science and DevOps teams to develop and tune churn
                  prediction models using XGBoost, PySpark, and Optuna, improving recall-driven
                  performance and reducing customer churn by 18% within six months.
                  <br />
                  • Architected an end-to-end document intelligence platform using BERT, AWS
                  Textract, and Kafka, designing scalable pipelines that reduced manual processing
                  by 65% and improved throughput by 3x.
                  <br />
                  • Built and optimized NLP extraction models with Python and FastAPI, applying
                  feature engineering and validation logic to achieve 92%+ accuracy across diverse
                  financial document formats.
                  <br />
                  • Designed containerized microservices with Docker, Kubernetes, and CI/CD
                  pipelines, enabling automated model deployment, versioning, and reducing release
                  cycles by 40%.
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

              <p className="edu-degree">Master in Computer Science</p>
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
              Hiring for AI software engineering, machine learning, or intelligent systems roles?
              Reach out.
            </p>

            <ul className="contact-list">
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:tarunemmanuelx@gmail.com">tarunemmanuelx@gmail.com</a>
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

              window.location.href = `mailto:tarunemmanuelx@gmail.com?subject=${subject}&body=${body}`;
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
