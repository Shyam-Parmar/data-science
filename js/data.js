/* ============================================================
   SITE DATA — single source of truth.
   Update this file when your resume changes. Nothing else
   needs to be touched. Every section of the site renders
   from the objects below.
   ============================================================ */

const SITE = {
  meta: {
    name: "Shyam Parmar",
    role: "Data Scientist",
    tagline: "Sports Analytics · Machine Learning · Revenue Science · NLP/LLM",
    location: "Tampa, FL",
    modelVersion: "shyam-parmar-v4.2", // just for the hero flavor text
  },

  contact: {
    email: "shyam@parmar.com",
    github: "https://github.com/Shyam-Parmar",
    githubUser: "Shyam-Parmar",
    linkedin: "https://www.linkedin.com/in/shyambparmar/",
    medium: "https://medium.com/@shyamparmar_88281",
    resume: "assets/Shyam_Parmar_Resume.pdf",
  },

  about: {
    heading: "About",
    paragraphs: [
      "I'm a data scientist at University of South Florida Athletics, where I own the pipeline from raw ticketing data to executive decisions across 9 ticketed sports. My day-to-day spans dynamic pricing engines, attendance forecasting, buyer segmentation, and the dashboards leadership actually opens every morning.",
      "I like problems where a model's output has a dollar sign or a seat number attached to it. Recently that has meant ML-powered pricing that lifted revenue 36%, renewal models holding 90%+ retention, and LLM automation that turned hours of survey processing into minutes.",
      "Off the clock I chase the same instincts through football data, Formula 1 telemetry, and whatever else can be scraped, modeled, and charted."
    ],
    facts: [
      { label: "based_in", value: "Tampa, FL" },
      { label: "focus", value: "Pricing · Forecasting · CRM" },
      { label: "education", value: "M.S. Business Analytics, USF" },
      { label: "stack", value: "Python · SQL · R · Azure" },
    ],
  },

  /* KPI band — animated counters. `value` is the number counted to,
     prefix/suffix wrap it, `decimals` controls formatting. */
  kpis: [
    { value: 36, suffix: "%", label: "Revenue lift from ML pricing", decimals: 0 },
    { value: 800, suffix: "K+", label: "Fans segmented across channels", decimals: 0 },
    { value: 90, suffix: "%+", label: "Season ticket retention (renewal models)", decimals: 0 },
    { value: 9, suffix: "", label: "Ticketed sports covered end to end", decimals: 0 },
    { value: 15, suffix: "K+", label: "Leads captured via embedded forms", decimals: 0 },
    { value: 96, suffix: "%", label: "Survey processing time cut by NLP + LLMs", decimals: 0 },
  ],

  experience: [
    {
      role: "Data Scientist",
      org: "University of South Florida Athletics",
      location: "Tampa, FL",
      period: "Jan 2022 – Present",
      current: true,
      bullets: [
        "Architected a unified pricing engine across 9 ticketed sports; ML-powered pricing and demand forecasting drove a 36% revenue increase.",
        "Built attendance, ticket sales, and renewal models (boosting, logistic regression) informing inventory, pricing, and staffing; renewal models sustain 90%+ retention.",
        "Administer the CRM stack (Salesforce, FanThreeSixty): segmentation of an 800K+ audience, 15+ lead capture forms, 15,000+ leads generated.",
        "Shipped NLP and LLM automation (Llama 3, OpenAI) cutting survey processing from hours to minutes and powering staff-facing ticketing chatbots.",
        "Maintain the executive dashboard suite for pricing, sales, attendance, and marketing attribution used daily by leadership.",
      ],
      tags: ["Python", "XGBoost", "Salesforce", "LLMs", "Pricing"],
    },
    {
      role: "Data Analytics Intern",
      org: "Publix Super Markets",
      location: "Lakeland, FL",
      period: "Jan 2022 – May 2022",
      current: false,
      bullets: [
        "Built a supervised recommender system in Python improving inventory accuracy by 5% across 1,300+ stores.",
        "Extracted and analyzed 1M+ records via complex SQL in Teradata for predictive modeling and outlier detection.",
      ],
      tags: ["Python", "SQL", "Teradata"],
    },
    {
      role: "Data Analyst",
      org: "National Senior Games Association",
      location: "Tampa, FL",
      period: "Oct 2021 – Mar 2022",
      current: false,
      bullets: [
        "Analyzed COVID-19 impact on 6,000+ members using Python and R (Chi-Square, logistic regression, ANOVA).",
        "Built Power BI KPI dashboards and published findings in a research article.",
      ],
      tags: ["R", "Power BI", "Statistics"],
    },
  ],

  education: [
    { degree: "M.S. Business Analytics & Information Systems", school: "University of South Florida", year: "2023" },
    { degree: "B.S. Business Analytics & Information Systems", school: "University of South Florida", year: "2021" },
  ],

  /* Skills — one radar chart per category. Scores are 0–100,
     self-assessed. Add/remove axes freely; charts adapt. */
  skills: [
    {
      category: "Programming, ML & AI",
      axes: [
        { name: "Python", score: 95 },
        { name: "SQL", score: 92 },
        { name: "R", score: 80 },
        { name: "ML / Boosting", score: 90 },
        { name: "NLP / LLMs", score: 85 },
        { name: "Deep Learning", score: 75 },
      ],
    },
    {
      category: "Analytics & BI",
      axes: [
        { name: "Power BI", score: 92 },
        { name: "Tableau", score: 85 },
        { name: "Excel Modeling", score: 90 },
        { name: "Google Analytics", score: 75 },
        { name: "Storytelling", score: 88 },
      ],
    },
    {
      category: "Engineering & Infrastructure",
      axes: [
        { name: "Azure", score: 78 },
        { name: "Apache Spark", score: 72 },
        { name: "Flask / Streamlit", score: 80 },
        { name: "Snowflake", score: 75 },
        { name: "PostgreSQL", score: 82 },
        { name: "Hadoop", score: 65 },
      ],
    },
    {
      category: "CRM & Data Platforms",
      axes: [
        { name: "Salesforce", score: 88 },
        { name: "FanThreeSixty", score: 90 },
        { name: "Qualtrics", score: 85 },
        { name: "Archtics", score: 80 },
        { name: "Data Governance", score: 82 },
      ],
    },
  ],

  /* Projects — curated featured repos. The site also calls the
     GitHub API at runtime to refresh descriptions/stars and to
     append any newer public repos not listed here.
     Set `fetchLive: false` to disable the API call entirely. */
  projects: {
    fetchLive: true,
    maxLive: 6, // how many extra live repos to append
    excludeRepos: [
      "Shyam-Parmar", "data-science", "data-scientist", "data-analyst",
      "SDM-Assignment-1", "SDM-Assignment-2", "SDM-Assignment-3",
      "SDM-Assignment-4", "SDM-Assignment-5", "SDM-Assignment-6",
      "SDM-Assignment-7", "SDM-Assignment-8", "Boston-Housing",
    ],
    featured: [
      {
        repo: "World-Cup-2026-Predictions",
        title: "World Cup 2026 Predictions",
        blurb: "Match winner prediction model for the 2026 World Cup built from historical international results.",
        tags: ["Python", "Modeling", "Football"],
      },
      {
        repo: "Heartbeat-Predictions-RNN",
        title: "Heartbeat Predictions with RNNs",
        blurb: "Sequential modeling with recurrent neural networks to classify heart rate health from heartbeat signals.",
        tags: ["Deep Learning", "RNN", "Health"],
      },
      {
        repo: "Job-Application-Text-Mining",
        title: "Job Application Text Mining",
        blurb: "Predicting job salaries from descriptions using NLP feature extraction alongside structured features.",
        tags: ["NLP", "Regression"],
      },
      {
        repo: "Topic-Modeling",
        title: "Newspaper Topic Modeling",
        blurb: "Unsupervised topic extraction across a large corpus of newspaper articles.",
        tags: ["NLP", "Unsupervised"],
      },
      {
        repo: "Question-Topic-Classifcation",
        title: "Question Topic Classification",
        blurb: "TF-IDF and word vectorizer pipelines with LIME and SHAP model explanations.",
        tags: ["NLP", "Explainability"],
      },
      {
        repo: "COVID-19",
        title: "COVID-19 SQL Analysis",
        blurb: "Exploratory analysis of global COVID-19 data in SQL, visualized in Tableau.",
        tags: ["SQL", "Tableau"],
      },
    ],
  },
};
