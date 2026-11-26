// ============================================
// PORTFOLIO DATA — Edit this file to update your site!
// ============================================

export const personalInfo = {
  name: "Betül",
  lastName: "Cetintas",
  tagline: "Computer Engineering (PEY Co-op) · University of Toronto · 5x Hackathon Winner",
  role: "Computer Engineering @ UofT",
  degree: "BASc CompEng PEY",

  photo: "./headshot-2026.jpg",
  github: "https://github.com/betulcetintas2706",
  devpost: "https://devpost.com/betulcetintas2706",
  resume: "./BetulCetintas-Resume.pdf?v=2029",
  headline: "I build where hardware, AI and people meet: from 80 ns ASIC chips to iOS apps real people use.",
  status: [
    "Software, AI and hardware engineer in training",
    "6 internships and roles across fintech, health tech, data and startups",
    "Shipped iOS, React Native, full-stack, ML and Verilog/ASIC projects",
    "5 hackathon awards, including 1st at Harvard HSIL 2026",
    "Open to Summer 2027 software, AI and hardware internships",
  ],
  focusAreas: ["Applied AI & Agents", "Mobile (iOS / React Native)", "Full-Stack", "FPGA & ASIC", "Data Pipelines", "Health Tech", "Accessibility"],
  education: {
    school: "University of Toronto",
    degree: "B.A.Sc. Computer Engineering, PEY Co-op",
    awards: ["Full Scholarship", "Edward L. Donegan Scholarship in Engineering", "Dean's Merit Award"],
    coursework: ["Software Design", "Data Structures (C++)", "Computer Organization", "Digital Systems", "C Programming"],
  },
  nowBuilding: ["Meducine (HSIL)", "Comfy Cakes FPGA"],
};

export const awards = [
  { emoji: "🥇", title: "First Place", year: "2026", where: "Harvard Health Systems Innovation Lab Hackathon, Toronto Hub", project: "Meducine" },
  { emoji: "🎓", title: "HSIL Venture Building Bootcamp (Top 120 Globally)", year: "2026", where: "Harvard Health Systems Innovation Lab", project: "Meducine" },
  { emoji: "🥈", title: "Second Place", year: "2026", where: "Hackville", project: "VYBE" },
  { emoji: "🥉", title: "Third Place (600+ participants)", year: "2026", where: "Hack Canada", project: "49th" },
  { emoji: "🏅", title: "Google Build with AI Winner", year: "2026", where: "Hack Canada", project: "49th" },
  { emoji: "🥉", title: "Third Place, ASIC", year: "2026", where: "UofT IEEE IC Hackathon", project: "NanoTrade" },
  { emoji: "⚖️", title: "Judge", year: "2026", where: "Youth Impact Challenge Summer Challenge", project: null },
  { emoji: "🎖️", title: "Dean's Merit Award", year: "UofT", where: "University of Toronto", project: null },
  { emoji: "🎓", title: "Edward L. Donegan Scholarship in Engineering", year: "UofT", where: "University of Toronto", project: null },
  { emoji: "🎓", title: "Full Scholarship", year: "UofT", where: "University of Toronto, Computer Engineering", project: null },
];

export const about = {
  kicker: "Betül Cetintas / About",
  title: ["From silicon", "to software."],
  intro: "I'm a Computer Engineering student at the University of Toronto. I build across hardware, AI, and mobile apps, with a focus on making them useful to the people using them.",
  drawsMe: [
    "As a kid, I dreamed of becoming a scientist. I wanted to understand how things worked and be part of creating something new. I grew up in Turkey, and moved to Canada when I was 13. Moving between countries meant getting used to change early in life, and it's a big part of the perspective I bring to what I do.",
    "I still have that curiosity, whether I'm working on a circuit, building an app, or exploring an AI idea. I'm drawn to projects that make something difficult a little easier for someone else to understand or use.",
  ],
  areas: [
    { title: "AI & mobile products", tags: ["Agents", "SwiftUI", "React Native"] },
    { title: "Digital hardware", tags: ["Verilog", "FPGA", "ASIC"] },
    { title: "Accessible technology", tags: ["Voice", "Haptics", "Health literacy"] },
  ],
  building: [
    { name: "Meducine", note: "health literacy", project: "Meducine" },
    { name: "Comfy Cakes", note: "FPGA game", project: "Comfy Cakes" },
  ],
  hello: "I'm a computer engineering student at the University of Toronto who loves building products where hardware, AI and people meet, from ASIC chips to iOS apps used by real people.",
  drives: "I ship fast and care deeply about impact. Whether it's helping newcomers navigate Canada, making music accessible through haptics, or detecting market anomalies in 80 ns, I build things that matter.",
  stats: [
    { num: "10+", label: "Projects Shipped" },
    { num: "6", label: "Internships & Roles" },
    { num: "5", label: "Hackathon Awards" },
    { num: "1st", label: "Harvard HSIL 2026", sub: "Toronto Hub" },
  ],
};

export const experiences = [
  {
    role: "Software & FinTech Intern",
    date: "Sep 2026 – Present",
    company: "Kavodax · Toronto, ON",
    desc: "Built an agentic payments prototype in React/Vite where an AI agent parses natural-language payments and a policy engine with 7 configurable rules across 3 currencies executes, escalates to human approval, or blocks them. Tested 7 operations of the Bloquo payments REST API in a reusable Postman workspace built from its OpenAPI spec, and built a mock payment API (~450 ms simulated latency) with 7 edge-case test scenarios.",
    tags: ["React", "Vite", "AI Agents", "Postman", "OpenAPI"],
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
    links: [{ label: "praevo.band", url: "https://praevo.band" }],
  },
  {
    role: "Distributor & Operations Lead",
    date: "Nov 2025 – Present",
    company: "Eruslu Sağlık Ürünleri · Toronto, ON",
    desc: "Leading distribution and operations in Canada for the Sleepy Easy Clean household cleaning brand, including building and running the Sleepy Easy Clean website.",
    tags: ["Operations", "Business Development", "Web"],
  },
  {
    role: "Judge",
    date: "Summer 2026",
    company: "Youth Impact Challenge (YIC) 2026 Summer Challenge",
    desc: "Reviewed and judged youth-led startup ideas tackling social and environmental challenges.",
    tags: ["Judging", "Entrepreneurship", "Social Impact"],
  },
  {
    role: "Data Engineering Intern",
    date: "Jan 2026 – Oct 2026",
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
    links: [{ label: "sahera.ca", url: "https://sahera.ca/en" }],
  },
  {
    role: "Full Stack Engineer Intern",
    date: "Mar 2026 – May 2026",
    company: "UNUHR Inc. · Toronto, ON",
    desc: "Built frontend and backend features for a healthcare job-seeking app for health workers, taking features from idea and mockup to working code in a small startup team.",
    tags: ["Full Stack", "Startup"],
    links: [{ label: "unuhr.com", url: "https://unuhr.com" }],
  },
  {
    role: "Web Developer",
    date: "Feb 2026 – May 2026",
    company: "Re:Pair Genomics Inc. · Vaughan, ON (Remote)",
    desc: "Re-architected the company's WordPress site for improved performance and responsive layouts. Designed and implemented a Products page and inquiry workflow, and resolved frontend rendering bugs while maintaining consistent UI/UX across the site.",
    tags: ["WordPress", "HTML/CSS", "Frontend", "UI/UX"],
    links: [{ label: "repairgenomics.com", url: "https://repairgenomics.com" }],
  },
  {
    role: "Software Team Member",
    date: "Jan 2025 – Present",
    company: "UofT Underwater Exploration (UTUX) · Toronto, ON",
    desc: "Contributing to onboard robotics software for an autonomous underwater vehicle using ROS 2 on Ubuntu Linux. Developed and tested ROS 2 nodes for sensor integration and telemetry, and debugged deployment issues across Linux-based environments.",
    tags: ["ROS 2", "Ubuntu Linux", "C++", "Sensor Integration"],
  },
];

export const projects = [
  {
    title: "Meducine",
    featured: true,
    desc: "AI health literacy platform that turns complex medical information into plain, personal guidance, with a 60+ term dictionary, 26 specialty filters and text-to-speech. Won 1st at Harvard HSIL Toronto Hub (~7.2% acceptance), advanced to the HSIL Venture Building Bootcamp (top 120 teams globally), and was showcased at the AstraZeneca and Plan International Canada Faces of the Future reception.",
    tags: ["React Native", "Expo", "AI", "Health Tech"],
    award: "Harvard HSIL 2026",
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
    featured: true,
    links: [{ label: "Devpost", url: "https://devpost.com/software/iris-de1z3t" }, { label: "Demo", url: "https://vimeo.com/1178189406" }],
    desc: "AI lab assistant on safety glasses: an ESP32-S3 camera watches the experiment, confirms finished steps and flags errors, while students ask questions by voice. Python FastAPI backend with Gemini 2.5 Flash, Overshoot vision and ElevenLabs voice, plus a SwiftUI iOS app with Auth0. Sponsored by Overshoot (YC W26); ActualFood offered to support it after the hackathon.",
    tags: ["SwiftUI", "ESP32-S3", "FastAPI", "Gemini", "ElevenLabs", "Auth0"],
    award: "YHack Spring 2026",
    image: "./iris.png",
  },
  {
    title: "RearView",
    links: [{ label: "GitHub", url: "https://github.com/SehreenB/RearView" }, { label: "Devpost", url: "https://devpost.com/software/rearview-gy51t3" }, { label: "Demo", url: "https://vimeo.com/1158143118" }],
    desc: "iOS app that simulates a Quebec Class 5 road test: examiner-style voice directions, speed and stop tracking, and ARKit TrueDepth head tracking for shoulder checks. Ends with pass or fail, a mistake list and an error heatmap.",
    tags: ["SwiftUI", "ARKit", "MapKit", "Vapor", "Gemini API", "ElevenLabs"],
    award: "ConUHacks X",
    image: "./rearview.png",
  },
  {
    title: "49th",
    featured: true,
    links: [{ label: "GitHub", url: "https://github.com/akashngb/roots" }, { label: "Devpost", url: "https://devpost.com/software/hack-canada-2026" }, { label: "Demo", url: "https://vimeo.com/1171501862" }],
    desc: "AI settlement assistant for newcomers to Canada. WhatsApp onboarding, a personal task roadmap, voice-note replies in their language, a React dashboard, and a Playwright + Claude Vision agent that navigates government websites for the user. Placed against 600+ participants and 200+ projects.",
    tags: ["Node.js", "Twilio", "Gemini", "Playwright", "Claude Vision", "React", "TypeScript"],
    award: "Hack Canada 2026 + Google Build with AI",
    image: "./49th.png",
  },
  {
    title: "SideQuest",
    links: [{ label: "GitHub", url: "https://github.com/SehreenB/SideQuest" }, { label: "Devpost", url: "https://devpost.com/software/sidequest-0iysgt" }, { label: "Demo", url: "https://vimeo.com/1169233848" }],
    desc: "Discovery-first navigation iOS app generating scenic, themed routes (Adventure, Foodie, Nature, Culture) with Gemini and ElevenLabs voice narration, geo-tagged memories, challenges and Solana NFT badges.",
    tags: ["SwiftUI", "Node.js", "Google Maps API", "Supabase", "Gemini", "Solana"],
    award: "DeerHacks V",
    image: "./sidequest.png",
  },
  {
    title: "NanoTrade",
    featured: true,
    links: [{ label: "GitHub", url: "https://github.com/betulcetintas2706/ttsky-nanotrades" }, { label: "Website", url: "https://betulcetintas2706.github.io/websitenanotrade/" }, { label: "Devpost", url: "https://devpost.com/software/nanotrade" }, { label: "Demo", url: "https://vimeo.com/1167116687" }],
    desc: "Tiny Tapeout ASIC in Verilog with 5 RTL modules running 8 parallel market anomaly checks at 50 MHz with ~80 ns latency. Fit into 9,800 of 10,000 cells and cut false positives from 40% to 0.5% across 10,000+ simulations.",
    tags: ["Verilog", "ASIC", "SKY130", "Tiny Tapeout", "Cognichip"],
    award: "UofT IC Hackathon (ASIC)",
    image: "./nanotrade.png",
  },
  {
    title: "Comfy Cakes",
    desc: "Recreation of the Purble Place Comfy Cakes game on a DE1-SoC FPGA in Verilog. I own the game logic and control: FSMs, order generation and checking, scoring, timing and difficulty.",
    tags: ["Verilog", "FPGA", "DE1-SoC", "FSMs"],
    award: "In Progress",
    image: "./games/cakes/preview.png",
  },
  {
    title: "VYBE",
    links: [{ label: "GitHub", url: "https://github.com/Vidhikalal/VYBE" }, { label: "Devpost", url: "https://devpost.com/software/vybe-l3ua1m" }],
    desc: "iOS app for Deaf and hard-of-hearing users that turns live music into real-time vibration: bass drives intensity, tempo drives pulse speed. Built with AVFoundation audio capture and Core Haptics, plus an Apple Watch companion app so you can feel it on your wrist.",
    tags: ["Swift", "SwiftUI", "Core Haptics", "AVFoundation", "watchOS"],
    award: "Hackville 2026",
    image: "./vybe.png",
  },
  {
    title: "Gold Miner (FPGA Game)",
    desc: "Minecraft-themed Gold Miner arcade game built fully in hardware in Verilog on the DE1-SoC. 31-state control FSM plus sub-FSMs, five custom RAM modules, pixel-level collision detection, 320×240 VGA graphics, a 45-second HEX timer, PS/2 keyboard controls, LFSR object placement and win/fail audio.",
    tags: ["Verilog", "FPGA", "DE1-SoC", "FSMs", "VGA"],
    award: "FPGA Final Project",
    image: "./games/goldminer-preview.png",
  },
  {
    title: "Mental Health Pop-up Space",
    desc: "Client-focused design project for the UofT Engineering Library: designing a mental health pop-up space for students (APS112, Engineering Strategies & Practice II).",
    tags: ["Engineering Design", "Client Project", "Teamwork"],
    award: "UofT ESP II",
    icon: "globe",
  },
  {
    title: "Bahen Courtyard Food Initiative",
    desc: "Led a team designing sustainable food solutions for the Bahen Courtyard at UofT (Engineering Strategies & Practice I).",
    tags: ["Sustainability", "Project Lead", "Design"],
    award: "UofT ESP I · Lead",
    icon: "globe",
  },
  {
    title: "Micro:bit Heartbeat Monitor",
    desc: "Led a project building a wearable heartbeat monitor on the Micro:bit.",
    tags: ["Micro:bit", "Sensors", "Wearables"],
    award: "Project Lead",
    icon: "music",
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
    { name: "Swift", usedIn: ["IRIS", "VYBE", "RearView", "SideQuest"] },
    { name: "Python", usedIn: ["SaHera ML model", "IRIS backend", "AI Trash Bin Sorter"] },
    { name: "C / C++", usedIn: ["Data Structures (C++)", "C Programming"] },
    { name: "JavaScript", usedIn: ["Kavodax", "OSIRIS", "SideQuest", "This website"] },
    { name: "HTML", usedIn: ["Re:Pair Genomics", "Praevo landing page", "This website"] },
    { name: "CSS", usedIn: ["Re:Pair Genomics", "Praevo landing page", "This website"] },
    { name: "Verilog", usedIn: ["NanoTrade", "Comfy Cakes", "Gold Miner"] },
    { name: "TypeScript / SQL", usedIn: ["Meducine", "49th"] },
    { name: "Java", usedIn: [] },
    { name: "MATLAB", usedIn: [] },
  ],
  categories: [
    {
      title: "// Web",
      chips: ["HTML5", "CSS3", "Responsive Design", "React", "Next.js", "Vite", "WebGL", "WordPress", "Canvas API", "Web Audio API", "GitHub Pages", "Accessibility (ARIA)"],
    },
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
      chips: ["Postman", "Playwright", "Google ADK", "Xcode", "GitHub", "VS Code", "Linux/Unix CLI", "Bash", "Node-RED", "ModelSim", "Logic Simulation", "Figma", "Lovable"],
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
  awards: "Awards",
  "case-meducine": "Meducine · case study",
  "case-nanotrade": "NanoTrade · case study",
  "case-iris": "IRIS · case study",
};
