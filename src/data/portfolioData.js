// ============================================
// PORTFOLIO DATA — Edit this file to update your site!
// ============================================

export const personalInfo = {
  name: "Betul",
  lastName: "Cetintas",
  tagline: "2nd Year Electrical & Computer Engineering (PEY Co-op) · University of Toronto",
  role: "Computer Engineering @ UofT",
  degree: "BASc CompEng PEY",
  years: "2024 – 2029",

  photo: "./photo.jpg",
};

export const about = {
  hello: "I'm an engineering student at the University of Toronto who loves building products that sit at the intersection of hardware, AI, and human experience — from ASIC chips to iOS apps used by real people.",
  drives: "I ship fast and care deeply about impact. Whether it's helping newcomers navigate Canada, making music accessible through haptics, or detecting market anomalies at 80ns — I build things that matter.",
  stats: [
    { num: "8+", label: "Projects Shipped" },
    { num: "7", label: "Hackathons" },
    { num: "4", label: "Awards Won" },
    { num: "3", label: "Tech Domains" },
  ],
};

export const experiences = [
  {
    role: "DevOps & Revenue Infrastructure Engineer",
    date: "Jan 2026 – Present",
    company: "Alephic Labs · San Francisco, CA (Remote)",
    desc: "Architected a centralized monetization data pipeline integrating RevenueCat, GCS, and Looker Studio across 10+ mobile apps. Built automated ETL workflows reducing manual reporting by 80% and improved portfolio-level subscription LTV visibility by 30%.",
    tags: ["GCS", "Google Apps Script", "Looker Studio", "OAuth 2.0", "ETL", "RevenueCat"],
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
    title: "OSIRIS",
    desc: "Supply chain risk intelligence platform using a multi-agent system (Google ADK) with Gemini-powered LLM agents. Parallel signal ingestion from GDELT, GNews, NASA FIRMS & ACLED for real-time geopolitical and logistics data.",
    tags: ["React", "Google ADK", "Gemini", "Multi-Agent Systems"],
    award: null,
    icon: "globe",
  },
  {
    title: "IRIS",
    desc: "Real-time AI lab assistant combining ESP32-S3 smart glasses + SwiftUI iOS app for live, context-aware STEM experiment guidance with ~2–3s latency via ESP32 → FastAPI → Vision API → Gemini → ElevenLabs pipeline.",
    tags: ["SwiftUI", "ESP32", "FastAPI", "Gemini", "ElevenLabs"],
    award: null,
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
    desc: "FPGA/ASIC hardware anomaly detection engine for real-time financial market monitoring. Achieves ~80 ns detection latency via fully parallel Verilog logic.",
    tags: ["Verilog", "ASIC", "SKY130", "Icarus"],
    award: "🥉 UofT IC Hackathon",
    image: "./nanotrade.png",
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
    { name: "Java", pct: 70 },
    { name: "MATLAB", pct: 65 },
  ],
  categories: [
    {
      title: "// Platforms & iOS",
      chips: ["SwiftUI", "React", "FastAPI", "SFSpeechRecognizer", "AVFoundation", "Core Haptics", "MapKit", "ARKit (TrueDepth)", "ROS 2", "Linux (Ubuntu)", "Gemini API", "ElevenLabs", "Vision API", "Multimodal AI", "OCR Pipelines", "Text-to-Speech"],
    },
    {
      title: "// Cloud & Data",
      chips: ["Google Cloud Storage", "Google Apps Script", "Looker Studio", "OAuth 2.0", "ETL Pipeline Design", "Signal Ingestion", "GDELT", "NASA FIRMS", "ACLED", "RevenueCat", "REST / JSON", "Mobile Monetization"],
    },
    {
      title: "// Fundamentals",
      chips: ["Multi-Agent Systems", "Human-in-the-Loop (HITL)", "Computer Vision", "Data Structures & Algorithms", "OOP", "Version Control (Git)", "Real-Time Systems", "Client–Server Workflows", "Event-Driven Systems", "Unit Testing", "Prompt Design", "SDLC"],
    },
    {
      title: "// Hardware",
      chips: ["FPGA (DE1-SoC)", "ESP32-S3", "Microcontrollers (Micro:bit)", "Digital Logic", "FSMs", "Sensors", "Serial Debugging"],
    },
    {
      title: "// Tools",
      chips: ["Google ADK", "Xcode", "GitHub", "VS Code", "Linux/Unix CLI", "Bash", "Node-RED", "ModelSim", "Logic Simulation", "Figma", "Lovable"],
    },
  ],
};

export const contact = {
  email: "betul.cetintas@mail.utoronto.ca",
  phone: "437-608-2327",
  linkedin: "linkedin.com/in/betul-cetintas",
  linkedinUrl: "https://linkedin.com/in/betul-cetintas",
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
