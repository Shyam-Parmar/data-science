/*
  CONTENT.JS
  Every piece of text on the site lives here. To update the portfolio:
  - Add a job: push a new object to the top of `timeline` (newest first)
  - Add a project: push a new object to `projects`
  - Add/remove a skill: edit the `items` and matching `levels` array inside `skills` (levels are 0 to 100 proficiency scores used for the radar charts)
  - Add/remove a KPI: edit the `kpis` array
  - Add a contact link: push to `contacts`
  No HTML, CSS, or JS editing required for normal content updates.
*/

const PORTFOLIO_DATA = {

  navName: "Shyam Parmar",

  hero: {
    eyebrow: "Data Scientist · Tampa, FL",
    headline: 'I turn raw data into <em>decisions people act on</em>.',
    sub: "Building pricing engines, recommender systems, forecasting models, and BI reports. I like solving problems that help stakeholders make decisions or building systems that increase efficiency."
  },

  kpis: [
    { target: 61, suffix: "%", label: "Revenue growth driven by ML pricing strategy" },
    { target: 40, suffix: "%", label: "Increase in ticket sales across 9 sports" },
    { target: 800, suffix: "K+", label: "Fans segmented across email, app, SMS, sales" },
    { target: 90, suffix: "%+", label: "Retention from renewal probability models" },
    { target: 15, suffix: "K+", label: "Leads generated from embedded lead capture forms" },
    { target: 98, suffix: "%", label: "Cut in survey feedback prep time via NLP and LLM automation" }
  ],

  about: {
    heading: "My passion lies at the intersection of business, data, and technology. I specialize in data science to uncover insights, solve complex problems, and drive impactful decisions.",
    body: [
      "At USF Athletics I run pricing, forecasting, and CRM for nine ticketed sports and an audience of 800K+ fans, building the dashboards executives check every Monday. Work spans a unified pricing engine with elasticity coefficients shared across leadership, geospatial heat maps for sales and staffing, fan persona clustering adopted by marketing, season ticket loyalty analysis, and two AI chatbots that help staff make faster decisions. Before that I built recommender systems at Publix and studied COVID-19 impact on senior athletes with the National Senior Games Association. I hold an M.S. in Business Analytics and a B.S. in Business Analytics with a Cyber Security focus, both from USF.",
      "Beyond my professional work, I enjoy exploring real-world datasets to sharpen my skills and stay up to date with advancements in data science. My goal is to make a meaningful impact as a data scientist by transforming raw data into actionable insights and strategies."
    ]
  },

  // Newest role first
  timeline: [
    {
      date: "JAN 2022 — PRESENT",
      role: "Data Scientist",
      org: "University of South Florida Athletics, Tampa FL",
      desc: "Architected a unified pricing engine across 9 ticketed sports, drove 61% revenue growth, built the department's executive Power BI reporting, and shipped LLM tools including two ticketing chatbots and an NLP survey classifier."
    },
    {
      date: "JAN 2022 — MAY 2022",
      role: "Data Analytics Intern",
      org: "Publix Super Markets, Lakeland FL",
      desc: "Built a supervised recommender system that improved inventory accuracy by 5% across 1,300+ stores, and mined 1M+ Teradata records for outlier detection."
    },
    {
      date: "OCT 2021 — MAR 2022",
      role: "Data Analyst",
      org: "National Senior Games Association, Tampa FL",
      desc: "Analyzed COVID-19 impact on 6,000+ members using Python and R, chi-square, logistic regression, and ANOVA, then published findings in a research article."
    }
  ],

  skills: [
    { category: "CRM & Data", items: ["Salesforce", "FanThreeSixty", "Snowflake", "PostgreSQL", "Qualtrics"], levels: [90, 90, 80, 80, 85] },
    { category: "Analytics & BI", items: ["Power BI", "Tableau", "Google Analytics", "Excel"], levels: [95, 80, 80, 90] },
    { category: "Programming & ML", items: ["Python", "R", "SQL", "Deep Learning", "NLP & LLMs", "Pyodide", "HTML", "CSS", "JavaScript"], levels: [95, 80, 90, 75, 85, 65, 70, 65, 70] },
    { category: "Engineering", items: ["Apache Spark", "Hadoop", "Flask", "Azure", "Streamlit"], levels: [75, 65, 75, 80, 85] }
  ],

  projects: [
    { name: "World Cup 2026 Predictions", desc: "A model that predicts match winners for the 2026 World Cup from historical and squad data.", tag: "Python" },
    { name: "Job Application Text Mining", desc: "Predicts salary from job description text using NLP feature extraction and regression.", tag: "NLP · Python" },
    { name: "Heartbeat Predictions RNN", desc: "Sequential modeling with recurrent neural networks to classify heart rate health from beat patterns.", tag: "Deep Learning" },
    { name: "Topic Modeling", desc: "Unsupervised topic extraction across a large corpus of newspaper articles.", tag: "NLP" },
    { name: "Question Topic Classification", desc: "TF-IDF and word vectorization for text classification, explained with LIME and SHAP.", tag: "NLP · Explainability" },
    { name: "COVID-19 Analysis", desc: "SQL based exploration of COVID-19 case data, visualized end to end in Tableau.", tag: "SQL · Tableau" }
  ],

  projectsLink: { label: "View all repositories →", href: "https://github.com/Shyam-Parmar?tab=repositories" },

  contact: {
    heading: "Have a dataset with a story stuck inside it? Let's talk.",
    links: [
      { label: "shyam@parmar.com", href: "mailto:shyam@parmar.com" },
      { label: "GitHub", href: "https://github.com/Shyam-Parmar", external: true },
      { label: "Medium", href: "https://medium.com/@shyamparmar_88281", external: true },
      { label: "LinkedIn", href: "#", external: true }
    ]
  },

  footer: {
    left: "© 2026 Shyam Parmar",
    right: "Tampa, FL"
  }
};
