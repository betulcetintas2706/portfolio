// ============================================
// PORTFOLIO DATA — Edit this file to update your site!
// ============================================

export const personalInfo = {
  name: "Betul",
  lastName: "Cetintas",
  tagline: "3rd Year Computer Engineering (PEY Co-op) · University of Toronto · 5x Hackathon Winner",
  role: "Computer Engineering @ UofT",
  degree: "BASc CompEng PEY",
  years: "2024 – 2028",

  photo: "./photo.jpg",
  github: "https://github.com/betulcetintas2706",
  devpost: "https://devpost.com/betulcetintas2706",
};

export const about = {
  hello: "I'm an engineering student at the University of Toronto who loves building products that sit at the intersection of hardware, AI, and human experience — from ASIC chips to iOS apps used by real people.",
  drives: "I ship fast and care deeply about impact. Whether it's helping newcomers navigate Canada, making music accessible through haptics, or detecting market anomalies at 80ns — I build things that matter.",
  stats: [
    { num: "10+", label: "Projects Shipped" },
    { num: "6", label: "Internships & Roles" },
    { num: "5", label: "Hackathon Awards" },
    { num: "1st", label: "Harvard HSIL 2026" },
  ],
};

export const experiences = [
  {
    role: "Software & FinTech Intern",
    date: "Sep 2026 – Nov 2026",
    company: "Kavodax · Toronto, ON",
    desc: "Built an agentic payments prototype in React/Vite where an AI agent parses natural-language payments and a policy engine with 7 configurable rules across 3 currencies executes, escalates to human approval, or blocks them. Tested 7 operations of the Bloquo payments REST API in a reusable Postman workspace built from its OpenAPI spec, and built a mock payment API (~450 ms simulated latency) with 7 edge-case test scenarios using Claude Code.",
    tags: ["React", "Vite", "AI Agents", "Postman", "OpenAPI", "Claude Code"],
  },
  {
    role: "Full Stack Engineer",
    date: "Apr 2026 – Present",
    company: "Meducine · Toronto, ON · 1st Place, Harvard HSIL Hackathon 2026",
    desc: "Building the React Native (Expo) frontend of an AI health literacy app as 1 of 2 engineers (35+ commits, 6 iOS builds on TestFlight), with a 60+ term medical dictionary, 26 specialty filters and text-to-speech. Won a top 120 global venture spot and demoed live to leaders at AstraZeneca and Plan International.",
    tags: ["React Native", "Expo", "TypeScript", "TestFlight", "Text-to-Speech"],
  },
  {
    role: "Founding Engineer",
    date: "May 2026 – Sep 2026",
    company: "Praevo (Wearable Athlete Injury Prediction) · Toronto, ON",
    desc: "Built the Next.js landing page (praevo.band) with a WebGL ripple background, scroll storytelling and a waitlist with a referral system, plus the SwiftUI iOS app with role-based Coach, Athlete and Clinic views for readiness and injury risk.",
    tags: ["Next.js", "WebGL", "SwiftUI", "iOS"],
  },
  {
    role: "Data Engineering Intern",
    date: "Jan 2026 – Sep 2026",
    company: "Alephic Labs · San Francisco, CA (Remote)",
    desc: "Architected a centralized monetization data pipeline integrating RevenueCat, GCS, and Looker Studio across 10+ mobile apps. Built automated ETL workflows reducing manual reporting by 80% and improved portfolio-level subscription LTV visibility by 30%.",
    tags: ["GCS", "Google Apps Script", "Looker Studio", "OAuth 2.0", "ETL", "RevenueCat"],
  },
  {
    role: "Machine Learning Intern",
    date: "Feb 2026 – Jul 2026",
    company: "SaHera · Montreal, QC (Remote)",
    desc: "Built an XGBoost hot flash detection model on minute-level wrist temperature data with 12 engineered time-series features, then replaced the app's placeholder backend with a FastAPI endpoint returning a probability, 3 risk levels and personalized alerts inside the team's React Native app.",
    tags: ["Python", "XGBoost", "FastAPI", "Time Series"],
  },
  {
    role: "Full Stack Engineer Intern",
    date: "Mar 2026 – May 2026",
    company: "UNUHR Inc. · Toronto, ON",
    desc: "Built frontend and backend features for a healthcare job-seeking app for health workers, taking features from idea and mockup to working code in a small startup team.",
    tags: ["Full Stack", "Startup"],
  },
  {
    role: "Web Developer",
    date: "Feb 2026 – Present",
    company: "Re:Pair Genomics Inc. · Vaughan, ON (Remote)",
    desc: "Re-architecting the company's WordPress site for improved performance and responsive layouts. Designed and implemented a Products page and inquiry workflow, and resolved frontend rendering bugs while maintaining consistent UI/UX across the site.",
    tags: ["WordPress", "HTML/CSS", "Frontend", "UI/UX"],
  },
  {
    role: "Software Team Member — Robotics",
    date: "Jan 2025 – Present",
    company: "UofT Underwater Exploration (UTUX) · Toronto, ON",
    desc: "Contributing to onboard robotics software for an autonomous underwater vehicle using ROS 2 on Ubuntu Linux. Developed and tested ROS 2 nodes for sensor integration and telemetry, and debugged deployment issues across Linux-based environments.",
    tags: ["ROS 2", "Ubuntu Linux", "C++", "Sensor Integration"],
  },
];

export const projects = [
  {
    title: "Meducine",
    desc: "AI health literacy app that turns confusing medical language into plain words, with a 60+ term dictionary, 26 specialty filters and text-to-speech. Shipped 6 iOS builds and demoed to AstraZeneca and Plan International.",
    tags: ["React Native", "Expo", "AI", "Health Tech"],
    award: "🥇 Harvard HSIL 2026",
    icon: "chat",
  },
  {
    title: "OSIRIS",
    desc: "Supply chain risk intelligence platform using a multi-agent system (Google ADK) with Gemini-powered LLM agents. Parallel signal ingestion from GDELT, GNews, NASA FIRMS & ACLED for real-time geopolitical and logistics data.",
    tags: ["React", "Google ADK", "Gemini", "Multi-Agent Systems"],
    award: "Hack the Future 2026",
    icon: "globe",
  },
  {
    title: "IRIS",
    desc: "Real-time AI lab assistant combining ESP32-S3 smart glasses + SwiftUI iOS app for live, context-aware STEM experiment guidance with ~2–3s latency via ESP32 → FastAPI → Vision API → Gemini → ElevenLabs pipeline.",
    tags: ["SwiftUI", "ESP32", "FastAPI", "Gemini", "ElevenLabs"],
    award: "YHack 2026",
    image: "./iris.png",
  },
  {
    title: "RearView",
    desc: "iOS app simulating real driving test routes with AI examiner feedback. Uses ARKit camera input, Gemini API summaries & ElevenLabs voice guidance.",
    tags: ["SwiftUI", "ARKit", "MapKit", "Gemini API"],
    award: "🏆 Hackathon MVP",
    image: "./rearview.png",
  },
  {
    title: "49th",
    desc: "WhatsApp AI settlement assistant for newcomers to Canada. Handles healthcare registration, gov forms & banking via conversational AI + browser automation.",
    tags: ["Node.js", "Twilio", "Playwright", "React"],
    award: "🥉 Hack Canada 2026",
    image: "./49th.png",
  },
  {
    title: "SideQuest",
    desc: "Discovery-first navigation iOS app generating scenic, themed routes (Adventure, Foodie, Nature, Culture) with AI narration and gamified challenges.",
    tags: ["SwiftUI", "Google Maps API", "Supabase", "Gemini"],
    award: "🏆 DeerHacks V",
    image: "./sidequest.png",
  },
  {
    title: "NanoTrade",
    desc: "Tiny Tapeout ASIC in Verilog with 5 RTL modules running 8 parallel market anomaly checks at 50 MHz with ~80 ns latency. Fit into 9,800 of 10,000 cells and cut false positives from 40% to 0.5% across 10,000+ simulations.",
    tags: ["Verilog", "ASIC", "SKY130", "Icarus"],
    award: "🥉 UofT IC Hackathon",
    image: "./nanotrade.png",
  },
  {
    title: "Comfy Cakes",
    desc: "Recreation of the Purble Place Comfy Cakes game on a DE1-SoC FPGA in Verilog for ECE241. I own the game logic and control: FSMs, order generation and checking, scoring, timing and difficulty.",
    tags: ["Verilog", "FPGA", "DE1-SoC", "FSMs"],
    award: "🛠 In Progress",
    icon: "chip",
  },
  {
    title: "VYBE",
    desc: "Accessibility iOS app translating live music into real-time haptic feedback for users with hearing impairments. Includes Apple Watch companion app.",
    tags: ["SwiftUI", "Core Haptics", "AVFoundation", "watchOS"],
    award: "🥈 Hackville 2026",
    image: "./vybe.png",
  },
  {
    title: "AI Trash Bin Sorter",
    desc: "Computer vision system trained on 50k images achieving 70% sorting accuracy. Real-time object recognition with camera integration and voice instructions.",
    tags: ["Python", "Computer Vision", "CV2"],
    award: null,
    icon: "eye",
  },
];

export const skills = {
  languages: [
    { name: "Swift", pct: 90 },
    { name: "Python", pct: 85 },
    { name: "C / C++", pct: 78 },
    { name: "JavaScript", pct: 75 },
    { name: "Verilog", pct: 72 },
    { name: "TypeScript / SQL", pct: 70 },
    { name: "Java", pct: 70 },
    { name: "MATLAB", pct: 65 },
  ],
  categories: [
    {
      title: "// Platforms & iOS",
      chips: ["SwiftUI", "React", "React Native (Expo)", "Next.js", "Vite", "FastAPI", "SFSpeechRecognizer", "AVFoundation", "Core Haptics", "MapKit", "ARKit (TrueDepth)", "ROS 2", "Linux (Ubuntu)", "Gemini API", "ElevenLabs", "Vision API", "Multimodal AI", "OCR Pipelines", "Text-to-Speech"],
    },
    {
      title: "// Cloud & Data",
      chips: ["Google Cloud Storage", "Google Apps Script", "Looker Studio", "OAuth 2.0", "ETL Pipeline Design", "Signal Ingestion", "GDELT", "NASA FIRMS", "ACLED", "RevenueCat", "REST / JSON", "Mobile Monetization"],
    },
    {
      title: "// Fundamentals",
      chips: ["Multi-Agent Systems", "Human-in-the-Loop (HITL)", "Computer Vision", "Data Structures & Algorithms", "OOP", "Version Control (Git)", "Real-Time Systems", "Client–Server Workflows", "Event-Driven Systems", "Unit Testing", "API Testing", "Prompt Design", "SDLC", "XGBoost", "Time-Series Features"],
    },
    {
      title: "// Hardware",
      chips: ["FPGA (DE1-SoC)", "ASIC Flow (SKY130)", "Verilog Testbenches", "ESP32-S3", "Microcontrollers (Micro:bit)", "Digital Logic", "FSMs", "Sensors", "Serial Debugging"],
    },
    {
      title: "// Tools",
      chips: ["Claude Code", "Postman", "Playwright", "Google ADK", "Xcode", "GitHub", "VS Code", "Linux/Unix CLI", "Bash", "Node-RED", "ModelSim", "Logic Simulation", "Figma", "Lovable"],
    },
  ],
};

export const contact = {
  email: "betul.cetintas@mail.utoronto.ca",
  phone: "437-608-2327",
  linkedin: "linkedin.com/in/betul-cetintas",
  linkedinUrl: "https://linkedin.com/in/betul-cetintas",
  github: "github.com/betulcetintas2706",
  githubUrl: "https://github.com/betulcetintas2706",
  devpost: "devpost.com/betulcetintas2706",
  devpostUrl: "https://devpost.com/betulcetintas2706",
  location: "Toronto / Vaughan, ON",
};

export const pageTitles = {
  home: "Welcome",
  about: "About Me",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills & Tools",
  contact: "Contact",
};
