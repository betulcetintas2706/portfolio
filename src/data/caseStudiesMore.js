// Case studies for the rest of the projects. Only real facts: Devpost pages,
// her repos, her own project notes. Sections without known facts are left out.
export const moreCases = {
  kavodax: {
    id: 'kavodax',
    title: 'Kavodax Agentic Payments',
    tagline: 'A sandbox where an AI agent makes payments, and a policy engine decides if it is allowed to.',
    award: 'Kavodax internship · Fall 2026',
    image: './kavodax-preview.jpg',
    live: './kavodax-demo/',
    meta: [
      { k: 'My role', v: 'Built it on my own as a Software & FinTech Intern' },
      { k: 'For', v: 'Kavodax, cross border payments' },
      { k: 'When', v: 'Sep 2026 to Nov 2026' },
      { k: 'Stack', v: 'React, Vite, ethers.js, Base Sepolia testnet, mock APIs' },
    ],
    stats: [
      { n: '7', l: 'configurable policy rules' },
      { n: '3', l: 'currencies: CAD, USDC, CADK' },
      { n: '~450 ms', l: 'simulated payment API latency' },
      { n: '$0', l: 'real money touched' },
    ],
    problem: [
      'AI agents are starting to act for people, and payments are where one wrong move costs real money.',
      'Kavodax wanted to see how an agent could fit into stablecoin and treasury work without handing it a blank cheque.',
    ],
    built: [
      'You type a payment in plain words, like "pay Supplier A 300 USDC". The agent reads it, and a policy engine checks it against spending limits, allowed currencies and a recipient allowlist.',
      'Then it either pays it right away, sends it to a human for approval, or blocks it. Every decision and its reason lands in an audit log.',
    ],
    flow: ['Payment in plain words', 'Parser reads intent, amount, recipient', 'Policy engine checks the rules', 'Pay, ask a human, or block', 'Mock payment API', 'Audit log'],
    myPart: [
      'Built the whole prototype myself in React and Vite.',
      'Wrote the plain language parser and the policy engine, with a permissions page where every limit and rule can be changed live.',
      'Built the human approval queue, the transaction log and the audit trail.',
      'Added an optional testnet settlement page on Base Sepolia with ethers.js, keeping the AI decision separate from the wallet signing.',
      'Built a mock payment API with simulated delay and edge case scenarios, so the full flow works without any live system.',
    ],
    hard: [
      { t: 'Trust without friction', d: 'If every payment needs a human, the agent is useless. If none do, it is dangerous. The thresholds and allowlist are what make it both useful and safe.' },
      { t: 'Safe by design', d: 'Simulated balances, mock APIs and testnet only. No private keys in the app, and the agent never signs anything itself.' },
    ],
    results: [
      'A working sandbox anyone can try, with one click to reset it.',
      'Shows the full loop end to end: instruction, policy check, approval, execution and audit.',
    ],
    links: [{ label: 'Live demo', url: 'https://betulcetintas.com/kavodax-demo/' }, { label: 'kavodax.com', url: 'https://kavodax.com/' }],
  },

  praevo: {
    id: 'praevo',
    title: 'Praevo iOS App',
    tagline: 'An iOS app that shows coaches, athletes and clinics who is at risk, before an injury happens.',
    award: 'Praevo · Founding Engineer',
    icon: 'chip',
    demo: { src: './praevo/demo.mp4', poster: './praevo/demo-poster.jpg' },
    meta: [
      { k: 'My role', v: 'Frontend, SwiftUI' },
      { k: 'Team', v: 'Built the frontend with Louise' },
      { k: 'When', v: 'Summer 2026' },
      { k: 'Stack', v: 'SwiftUI, iOS' },
    ],
    stats: [
      { n: '3', l: 'role based views: coach, athlete, clinic' },
      { n: '4', l: 'body signals: pressure, recovery, movement, temperature' },
      { n: '1', l: 'daily readiness score out of 100' },
    ],
    problem: [
      'Most athletes only find out something is wrong once it already hurts.',
      'Coaches look after a whole roster and cannot see who is wearing down until someone gets injured.',
    ],
    built: [
      'Praevo is a wearable that predicts athlete injuries. The app turns its signals into something each person can act on.',
      'Coaches see their team at a glance and who needs attention today. Athletes see a daily readiness score with their signals and simple guidance. Clinics track visits, patients and outcomes over time.',
    ],
    flow: ['Wearable band', 'Body signals', 'Readiness score', 'Coach, athlete or clinic view'],
    myPart: [
      'Built the SwiftUI frontend of the app.',
      'Onboarding, the coach team overview, alerts and team reports.',
      'The athlete readiness screen with signal patterns and guidance, and the clinic views for visits and care history.',
      'We went back and forth between React Native with Expo and SwiftUI, and rebuilt it natively in the end.',
    ],
    hard: [
      { t: 'Three users, one app', d: 'A coach, an athlete and a clinic need very different things, so each role gets its own home screen instead of one crowded dashboard.' },
      { t: 'Picking the stack', d: 'Switching between React Native and SwiftUI cost time, but native felt right for a health app people open every day.' },
    ],
    links: [{ label: 'praevo.band', url: 'https://praevo.band' }],
  },

  osiris: {
    id: 'osiris',
    title: 'OSIRIS',
    tagline: 'A team of AI agents that watches world news and logistics data for supply chain risk.',
    award: 'Hack the Future 2026',
    icon: 'globe',
    meta: [
      { k: 'Built at', v: 'Hack the Future 2026' },
      { k: 'Stack', v: 'React, Google ADK, Gemini' },
    ],
    stats: [
      { n: '4', l: 'live data sources' },
      { n: 'Multi agent', l: 'system on Google ADK' },
    ],
    problem: [
      'Supply chains break because of things happening far away: a fire, a conflict, a port slowing down. By the time a buyer hears about it, it is often too late.',
    ],
    built: [
      'OSIRIS pulls signals from GDELT, GNews, NASA FIRMS and ACLED in parallel, and Gemini powered agents built on Google ADK read them for geopolitical and logistics risk in real time.',
    ],
    flow: ['GDELT, GNews, NASA FIRMS, ACLED', 'Parallel signal ingestion', 'Gemini agents on Google ADK', 'Risk insights in React'],
  },

  rearview: {
    id: 'rearview',
    title: 'RearView',
    tagline: 'Practice your road test before the real one, with an examiner in your phone.',
    award: 'ConUHacks X',
    image: './rearview.png',
    video: 'https://player.vimeo.com/video/1158143118',
    meta: [
      { k: 'Team', v: 'Sehreen Basara, Amine Arrachid and me' },
      { k: 'Built at', v: 'ConUHacks X, Montreal' },
      { k: 'Stack', v: 'Swift, SwiftUI, MapKit, CoreLocation, ARKit, AVFoundation, Vapor, Gemini, ElevenLabs' },
    ],
    stats: [
      { n: 'Class 5', l: 'Quebec road test, simulated' },
      { n: '4', l: 'iOS frameworks in one system' },
      { n: 'iOS 17+', l: 'native app' },
    ],
    problem: [
      'A lot of people fail the driving test not because they drive badly, but because the test is stressful and unfamiliar.',
      'Instructors are expensive and hard to book, and there is almost no way to practice under real test conditions.',
    ],
    built: [
      'RearView builds an exam style route from where you are and gives neutral, examiner style voice directions, with no coaching.',
      'It tracks your speed, full versus rolling stops, staying on route, lane changes, and shoulder checks using TrueDepth head tracking. At the end you get pass or fail, a list of mistakes and a heatmap of where they happened.',
    ],
    flow: ['Your location', 'Vapor backend builds the route', 'Examiner voice from ElevenLabs', 'MapKit, GPS and ARKit tracking', 'Gemini evaluates', 'Pass or fail with heatmap'],
    hard: [
      { t: 'Rules change by region', d: 'Driving tests are different everywhere, so we scoped it to one city and its rules, and kept the rules separate so it can grow.' },
      { t: 'Catching shoulder checks', d: 'Head movement is noisy. Phone placement, posture and lighting all get in the way.' },
      { t: 'Real but not stressful', d: 'It had to feel like a real test without adding distraction while driving, so the screen stays almost empty.' },
    ],
    learned: 'The tone of the voice matters as much as the code. A neutral examiner with no hints is what makes it feel like the real test.',
    links: [
      { label: 'GitHub', url: 'https://github.com/SehreenB/RearView' },
      { label: 'Devpost', url: 'https://devpost.com/software/rearview-gy51t3' },
      { label: 'Demo', url: 'https://vimeo.com/1158143118' },
    ],
  },

  '49th': {
    id: '49th',
    title: '49th',
    tagline: 'An AI settlement assistant that helps newcomers to Canada, right in WhatsApp.',
    award: 'Third Place, Hack Canada 2026 · Google Build with AI winner',
    image: './49th.png',
    video: 'https://player.vimeo.com/video/1171501862',
    meta: [
      { k: 'Team', v: 'ezpz: Akash Nagabhirava, Sehreen Basara, Seeron Sivashankar and me' },
      { k: 'Built at', v: 'Hack Canada 2026' },
      { k: 'Stack', v: 'Node.js, Express, Twilio, Gemini 2.5 Flash, Claude Vision, Playwright, ElevenLabs, Auth0, Cloudinary, React, TypeScript' },
    ],
    stats: [
      { n: '600+', l: 'participants' },
      { n: '200+', l: 'projects' },
      { n: '3rd', l: 'place overall' },
      { n: '5 to 7', l: 'task personal roadmap' },
    ],
    problem: [
      'Newcomers to Canada miss small steps that matter, like the OHIP waiting period that starts the day they land.',
      'We built it around WhatsApp because that is where newcomers already talk. No new app, no new account.',
    ],
    built: [
      'A chat on WhatsApp asks about your city, status, language, job and family, then builds a personal roadmap of what to do first.',
      'It remembers you across weeks, replies with voice notes in your language, shows progress in a dashboard, and has a browser agent that reads real government sites like Canada.ca and fills in steps for you.',
    ],
    flow: ['WhatsApp chat', 'Gemini builds your roadmap', 'Memory per person', 'Voice notes in your language', 'Browser agent on government sites', 'React dashboard'],
    hard: [
      { t: 'Websites that keep changing', d: 'Instead of brittle CSS selectors, the agent reads screenshots with Claude Vision and decides what to click.' },
      { t: 'One person, two logins', d: 'WhatsApp and the Auth0 dashboard had to be linked both ways with a phone linking step.' },
      { t: 'Questions mid setup', d: 'An intent check answers side questions without losing your place in onboarding.' },
    ],
    results: [
      'Third Place Overall at Hack Canada 2026.',
      'Winner of the Google Build with AI track.',
      'A full loop working end to end, from WhatsApp onboarding to the browser agent updating the dashboard.',
    ],
    learned: 'Designing for newcomers means not assuming a data plan, a laptop or English. Meeting people where they already are changes everything.',
    links: [
      { label: 'GitHub', url: 'https://github.com/akashngb/roots' },
      { label: 'Devpost', url: 'https://devpost.com/software/hack-canada-2026' },
      { label: 'Demo', url: 'https://vimeo.com/1171501862' },
    ],
  },

  sidequest: {
    id: 'sidequest',
    title: 'SideQuest',
    tagline: 'A navigation app that plans the scenic way, not the fastest one.',
    award: 'DeerHacks V',
    image: './sidequest.png',
    video: 'https://player.vimeo.com/video/1169233848',
    meta: [
      { k: 'Team', v: 'Sehreen Basara, Seeron Sivashankar and me' },
      { k: 'Built at', v: 'DeerHacks V, 2026' },
      { k: 'Stack', v: 'SwiftUI, Node.js, Express, Google Maps APIs, Gemini, ElevenLabs, Supabase, Solana, Auth0' },
    ],
    stats: [
      { n: '6', l: 'navigator modes' },
      { n: '3', l: 'detour levels' },
      { n: '5', l: 'tabs in the app' },
      { n: '1', l: 'weekend' },
    ],
    problem: [
      'Navigation apps have chased the fastest arrival time for years, so getting somewhere feels like a race.',
      'We wanted the slower route to be the point: discovery, mood and memories.',
    ],
    built: [
      'Pick a mode like Adventure, Foodie, Nature or Culture, and how bold the detour should be. SideQuest builds a themed route with stops, and an AI voice guide tells you about each one.',
      'You can save geo tagged photos to a Memory Vault, do scavenger style challenges, and earn points, streaks and badges.',
    ],
    flow: ['Pick a mode and detour level', 'Gemini and Google Places find stops', 'Route with turn by turn', 'ElevenLabs narrates', 'Memories, challenges, badges'],
    hard: [
      { t: 'Never an empty map', d: 'Discovery chains Gemini, Google Places, MapKit and seed data, then removes duplicates, so there are always stops even if an API fails.' },
      { t: 'Messy AI output', d: 'Gemini JSON was not always clean, so we parse it defensively.' },
      { t: 'Two teams, one app', d: 'Backend and iOS agreed on API contracts first, so the pieces merged cleanly.' },
    ],
    learned: 'Agree on the data shape before writing code, and always have a fallback. APIs fail at the worst time, like during a demo.',
    links: [
      { label: 'GitHub', url: 'https://github.com/SehreenB/SideQuest' },
      { label: 'Devpost', url: 'https://devpost.com/software/sidequest-0iysgt' },
      { label: 'Demo', url: 'https://vimeo.com/1169233848' },
    ],
  },

  vybe: {
    id: 'vybe',
    title: 'VYBE',
    tagline: 'Feel music through vibration, made for Deaf and hard of hearing people.',
    award: '2nd Place, Hackville 2026',
    image: './vybe.png',
    meta: [
      { k: 'Team', v: 'Sehreen Basara, Teresa Akinbodun, Vidhi Kalal and me' },
      { k: 'Built at', v: 'Hackville 2026' },
      { k: 'Stack', v: 'Swift, SwiftUI, AVFoundation, Core Haptics, watchOS' },
    ],
    stats: [
      { n: '2nd', l: 'place at Hackville' },
      { n: '3', l: 'things mapped: bass, tempo, volume' },
    ],
    problem: [
      'Most music accessibility tools are captions or visualizers. Very few make touch the main way to experience sound.',
    ],
    built: [
      'VYBE listens through the iPhone microphone and turns music into vibration. Bass makes it stronger and deeper, tempo sets how fast it pulses, and volume changes the intensity.',
      'There is also an Apple Watch companion so you can feel it on your wrist.',
    ],
    flow: ['Live music', 'AVFoundation captures audio', 'Measure bass, tempo, volume', 'Core Haptics vibration', 'iPhone and Apple Watch'],
    hard: [
      { t: 'Core Haptics', d: 'Keeping vibration in sync with live audio took a lot of tuning.' },
      { t: 'Real devices only', d: 'You cannot feel vibration in the simulator, so every change had to be tested on a real iPhone.' },
    ],
    results: ['Won 2nd Place at Hackville 2026.'],
    learned: 'Accessibility works best when it is the starting point, not something added at the end. iOS was new for most of us, and we shipped anyway.',
    links: [
      { label: 'GitHub', url: 'https://github.com/Vidhikalal/VYBE' },
      { label: 'Devpost', url: 'https://devpost.com/software/vybe-l3ua1m' },
    ],
  },

  cakes: {
    id: 'cakes',
    title: 'Comfy Cakes',
    tagline: 'The Purble Place cake game, rebuilt in hardware on an FPGA.',
    award: 'ECE241 · Fall 2026',
    image: './games/cakes/preview.png',
    play: 'cakes',
    meta: [
      { k: 'My role', v: 'Game logic and control' },
      { k: 'Team', v: 'Sehreen Basara (VGA graphics and input) and me' },
      { k: 'When', v: 'Fall 2026' },
      { k: 'Stack', v: 'Verilog, DE1-SoC FPGA' },
    ],
    problem: [
      'For our digital systems course project, we wanted to rebuild a real game with no CPU at all, only logic we designed ourselves.',
    ],
    built: [
      'Orders come in, you build the cake on the conveyor, and the game checks it, scores it and speeds up as you go. All of it is hardware written in Verilog.',
    ],
    flow: ['Random order (LFSR)', 'Game FSM', 'Build the cake', 'Check against the order', 'Score, time, difficulty', 'VGA screen'],
    myPart: [
      'Own the game logic and control: the FSMs, order generation and checking, scoring, timing and difficulty.',
      'Sehreen owns the VGA graphics and the input.',
      'Ported it to the browser for this site, so you can play it and watch the FSM run.',
    ],
    links: [],
  },

  goldminer: {
    id: 'goldminer',
    title: 'Gold Miner',
    tagline: 'A Minecraft themed Gold Miner arcade game, built fully in hardware.',
    award: 'FPGA final project',
    image: './games/goldminer-preview.png',
    play: 'goldminer',
    meta: [
      { k: 'Platform', v: 'DE1-SoC FPGA' },
      { k: 'Stack', v: 'Verilog, FSMs, VGA, PS/2, HEX displays' },
    ],
    stats: [
      { n: '31', l: 'state control FSM' },
      { n: '5', l: 'custom RAM modules' },
      { n: '320×240', l: 'VGA graphics' },
      { n: '45 s', l: 'HEX timer' },
    ],
    built: [
      'Swing the hook, grab gold and rocks, and reach $200 before the 45 second timer runs out. No processor, only hardware.',
      'A 31 state control FSM plus sub FSMs for the hook, five custom RAM modules, pixel level collision detection, PS/2 keyboard controls, LFSR object placement and win or fail audio.',
    ],
    flow: ['PS/2 keyboard', 'Control FSM', 'Hook sub FSMs', 'Pixel collision', 'Score and timer on HEX', 'VGA output'],
    links: [],
  },

  mentalhealth: {
    id: 'mentalhealth',
    title: 'Mental Health Pop-up Space',
    tagline: 'A mental health pop up space for students, designed for the UofT Engineering Library.',
    award: 'UofT · Engineering Strategies & Practice II',
    icon: 'globe',
    meta: [
      { k: 'Course', v: 'APS112, Engineering Strategies & Practice II' },
      { k: 'Client', v: 'UofT Engineering Library' },
      { k: 'Type', v: 'Team client design project' },
    ],
    built: [
      'Our team worked with the Engineering Library as a real client to design a pop up space focused on student mental health.',
    ],
    flow: ['Meet the client', 'Find the need', 'Design options', 'Pick and refine', 'Present to the client'],
    links: [],
  },

  bahen: {
    id: 'bahen',
    title: 'Bahen Courtyard Food Initiative',
    tagline: 'Sustainable food options for the Bahen Courtyard at UofT.',
    award: 'UofT · Engineering Strategies & Practice I · Team lead',
    icon: 'globe',
    meta: [
      { k: 'My role', v: 'Team lead' },
      { k: 'Course', v: 'Engineering Strategies & Practice I' },
    ],
    built: [
      'A team design project on sustainable food solutions for the Bahen Courtyard, one of the busiest spots for engineering students.',
    ],
    myPart: ['Led the team through the design process, from understanding the problem to the final proposal.'],
    links: [],
  },

  microbit: {
    id: 'microbit',
    title: 'Micro:bit Heartbeat Monitor',
    tagline: 'A wearable heartbeat monitor that alerts your phone when something looks wrong.',
    award: 'Project lead',
    icon: 'music',
    meta: [
      { k: 'My role', v: 'Project lead, coded the system' },
      { k: 'Stack', v: 'Micro:bit, heart rate sensor, phone notifications' },
    ],
    built: [
      'A Micro:bit based heartbeat monitor built into a wearable watch. It gives real time feedback and sends a phone notification when a reading looks abnormal.',
    ],
    flow: ['Sensor on the wrist', 'Micro:bit reads heartbeat', 'Check for abnormal readings', 'Alert on your phone'],
    myPart: [
      'Led the project and coded the monitoring system.',
      'Designed and tested it for reliability and accuracy, with user safety in mind.',
      'Delivered a fully working prototype.',
    ],
    links: [],
  },

  trash: {
    id: 'trash',
    title: 'AI Trash Bin Sorter',
    tagline: 'A camera that tells you which bin your trash goes in.',
    award: 'Computer vision project',
    icon: 'eye',
    meta: [{ k: 'Stack', v: 'Python, computer vision, OpenCV' }],
    stats: [
      { n: '50k', l: 'training images' },
      { n: '70%', l: 'sorting accuracy' },
    ],
    problem: ['People throw things in the wrong bin all the time, and one wrong item can ruin a whole batch of recycling.'],
    built: ['A computer vision system with a camera that recognizes objects in real time and gives voice instructions on where they go.'],
    flow: ['Camera', 'Real time object recognition', 'Pick the bin', 'Voice instruction'],
    links: [],
  },
};

// project title → case id
export const moreCaseForProject = {
  'Kavodax Agentic Payments': 'kavodax',
  'Praevo iOS App': 'praevo',
  OSIRIS: 'osiris',
  RearView: 'rearview',
  '49th': '49th',
  SideQuest: 'sidequest',
  VYBE: 'vybe',
  'Comfy Cakes': 'cakes',
  'Gold Miner (FPGA Game)': 'goldminer',
  'Mental Health Pop-up Space': 'mentalhealth',
  'Bahen Courtyard Food Initiative': 'bahen',
  'Micro:bit Heartbeat Monitor': 'microbit',
  'AI Trash Bin Sorter': 'trash',
};
