Tarun Emmanuel Majhi — Portfolio

Machine Learning Engineer with around 4 years of experience designing, deploying, and maintaining production ML platforms and streaming infrastructure across banking and insurance.

This repository contains my personal portfolio website built using React + TypeScript (Vite), showcasing my experience in real-time inference pipelines, graph neural networks, MLOps, and enterprise GenAI systems.

👋 About Me

I am a Machine Learning Engineer with around 4 years of experience building and deploying production-ready machine learning and streaming platforms across banking and insurance.

My work focuses on:
- Real-Time Inference & Streaming Feature Pipelines (Kafka, PySpark, Redis)
- Graph Neural Networks & Similarity Frameworks (PyTorch Geometric)
- Gradient Boosting & Time-Series Modeling (LightGBM, XGBoost, CatBoost)
- Enterprise GenAI & Retrieval-Augmented Generation (RAG)
- Cloud-Native MLOps & Distributed Computing (AWS SageMaker/EKS, Ray, Docker)
- BFSI Domain Systems (Trade Settlement, Fraud Detection, AML, Credit Risk)

🧠 Experience Highlights

💼 State Street — Machine Learning Engineer
Sep 2025 – Present
- Engineered a low-latency T+1 settlement fail prediction system on AWS EKS using LightGBM and ONNX Runtime to intercept high-risk trade exceptions, cutting manual investigations by 32% and mitigating $3.2M in annual penalty fees.
- Constructed sub-50ms streaming feature pipelines via Apache Kafka, PySpark, and Redis Enterprise to ingest Swift ISO 20022 message flows and custodian balance feeds, achieving an 89% precision rate prior to market cutoffs.
- Deployed multi-task neural network models within Ray Serve to simultaneously forecast settlement failure probabilities and estimate overnight cash buffer requirements, automating risk-prioritized ticket queues inside State Street Alpha.
- Architected a fixed-income similarity framework using PyTorch Geometric Graph Neural Networks to model corporate bond capital structures, generating 256-d embeddings for 1.2M+ instruments (improving missing price estimation accuracy by 24% RMSE).
- Scaled a high-throughput Qdrant vector search infrastructure on Ray clusters to execute sub-10ms nearest-neighbor queries across illiquid assets, accelerating factor-risk calculations from 45 minutes down to 4.
- Formulated sparse regularized ensemble algorithms paired with Kalman Filtering for dynamic factor risk attribution matrices across 5,000+ institutional client accounts.

💼 Happiest Minds Technologies — Machine Learning Engineer
Apr 2021 – Dec 2023
- Accelerated Scikit-Learn and TensorFlow model-training workflows by optimizing Pandas transformations and feature-matrix construction, reducing experimentation runtime by 31% across 20+ iterations.
- Engineered an end-to-end P&C claims fraud detection model on AWS SageMaker using XGBoost and CatBoost, handling extreme class imbalance with SMOTE-Tomek, cutting manual reviews by 35% and saving $1.8M annually.
- Integrated NLP sentiment analysis on FNOL adjuster notes using BERT embeddings, accelerating straight-through processing for clean claims while increasing early fraud capture by 18%.
- Architected a real-time credit underwriting pipeline using PySpark, Azure Databricks, and Feast feature store, boosting default prediction accuracy by 12%.
- Implemented SHAP explainability frameworks at inference to generate dynamic regulatory reason codes for automated loan decisions, streamlining FCRA compliance and reducing false-positive AML alerts by 28%.
- Built a Hybrid-RAG document retrieval system using LangChain, Pinecone, and Azure OpenAI to parse complex commercial insurance policy PDFs, reducing search times from 15 minutes to under 10 seconds.
- Designed a cross-encoder reranking pipeline with strict system guardrails to prevent LLM hallucinations, improving agent resolution rates by 40% with 100% factual accuracy.

🛠 Tech Stack
- **Machine Learning & AI**: Machine Learning Systems Design, Gradient Boosting (XGBoost, LightGBM, CatBoost), Graph Neural Networks (PyTorch Geometric), NLP, Transformers (BERT, Sentence-Transformers), RAG, Anomaly Detection, Time-Series & Sequence Modeling, Feature Engineering, SHAP, Cost-Sensitive Learning, SMOTE
- **MLOps & Lifecycle**: Model Deployment, Streaming & Batch Inference, Model Monitoring (Evidently AI, TruLens), Experiment Tracking (MLflow), Model Optimization (ONNX Runtime, AWQ Quantization), Vector Search Infrastructure, Feature Stores (Feast, Redis Enterprise), CI/CD for ML, Drift Detection
- **Languages & Frameworks**: Python, PySpark, Polars, Scikit-learn, PyTorch, LangChain, LlamaIndex, NetworkX, NumPy, Pandas, FastAPI
- **Distributed Computing & Cloud**: AWS (SageMaker, EKS, S3, Lambda, EventBridge, Redshift), Azure (Azure ML, Databricks, Event Hubs, CosmosDB), Ray (Ray Serve, Ray Cluster), Docker
- **Data Engineering & Streaming**: Apache Kafka, Snowflake (Iceberg Tables), Apache Airflow, PostgreSQL (pgvector), SQL, Vector Databases (Pinecone, Qdrant, FAISS, Milvus)
- **Domain Knowledge (BFSI)**: P&C Insurance Claims Fraud, Credit Risk Underwriting, AML Anomaly Detection, T+1 Trade Settlement Operations, Fixed Income Risk Attribution, Financial Document Parsing (ISO 20022, Swift)

🎓 Education
- **Clark University, Worcester, MA**
  MS in Computer Science, GPA: 3.9/4.0 | Jan 2024 – Dec 2025
- **Jawaharlal Nehru Technological University, Anantapur, India**
  B.Tech in Computer Science and Engineering | July 2018 – May 2022

🌐 Live Site
tarunemmanuel.github.io