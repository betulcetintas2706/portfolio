// Case studies for the rest of the projects. Only real facts: Devpost pages,
// her repos, her own project notes. Sections without known facts are left out.
export const moreCases = {
  kavodax: {
    id: 'kavodax',
    title: 'Kavodax Agentic Payments',
    tagline: 'A sandbox where an AI agent makes payments, and a policy engine decides if it is allowed to.',
    award: 'Kavodax internship · Fall 2026',
    image: './kavodax-preview.jpg',
    logo: './kavodax-icon.png',
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
    title: 'Praevo',
    tagline: 'A wearable that predicts athlete injuries. I coded the landing page at praevo.band and the iOS app.',
    award: 'Praevo · Founding Engineer',
    icon: 'chip',
    logo: './praevo/icon.png',
    demo: { src: './praevo/demo.mp4', poster: './praevo/demo-poster.jpg' },
    web: {
      url: 'https://praevo.band',
      shots: [
        { src: './praevo/web/hero.jpg', label: 'Hero with the WebGL ripple' },
        { src: './praevo/web/signal.jpg', label: 'Scroll story with live stats' },
        { src: './praevo/web/band.jpg', label: 'The band' },
        { src: './praevo/web/athletes.jpg', label: 'Before athletes become patients' },
        { src: './praevo/web/waitlist.jpg', label: 'Waitlist' },
      ],
    },
    meta: [
      { k: 'My role', v: 'Founding Engineer' },
      { k: 'Team', v: 'Built the app frontend with Louise' },
      { k: 'When', v: 'May 2026 to Sep 2026' },
      { k: 'Stack', v: 'Next.js, WebGL, SwiftUI, iOS' },
    ],
    stats: [
      { n: '2', l: 'products: landing page and iOS app' },
      { n: '3', l: 'role based app views: coach, athlete, clinic' },
      { n: '4', l: 'body signals: pressure, recovery, movement, temperature' },
      { n: '1', l: 'daily readiness score out of 100' },
    ],
    problem: [
      'Most athletes only find out something is wrong once it already hurts.',
      'Coaches look after a whole roster and cannot see who is wearing down until someone gets injured.',
    ],
    built: [
      'Praevo is a wearable that predicts athlete injuries. The landing page tells that story and collects a waitlist. The app turns the signals into something each person can act on.',
      'Coaches see their team at a glance and who needs attention today. Athletes see a daily readiness score with their signals and simple guidance. Clinics track visits, patients and outcomes over time.',
    ],
    flow: ['Wearable band', 'Body signals', 'Readiness score', 'Coach, athlete or clinic view'],
    myPart: [
      { t: 'Landing page', d: 'Coded praevo.band in Next.js: a WebGL ripple background, scroll storytelling that types out each line with big live stats, a signal strength scroll meter and sound.' },
      { t: 'Waitlist and referrals', d: 'A waitlist with a referral system, so early sign ups can bring in more people.' },
      { t: 'iOS app', d: 'Built the SwiftUI frontend: onboarding, the coach team overview, alerts and reports, the athlete readiness screen, and the clinic views.' },
      { t: 'Picking the stack', d: 'We went back and forth between React Native with Expo and SwiftUI, and rebuilt the app natively in the end.' },
    ],
    hard: [
      { t: 'A page that feels like the product', d: 'A wearable that reads signals should feel alive, so the page moves, types and reacts as you scroll instead of being a static template.' },
      { t: 'Three users, one app', d: 'A coach, an athlete and a clinic need very different things, so each role gets its own home screen instead of one crowded dashboard.' },
    ],
    links: [{ label: 'praevo.band', url: 'https://praevo.band' }],
  },

  unuhr: {
    id: 'unuhr',
    logo: './logos/unuhr.png',
    title: 'UNUHR',
    tagline: 'A mobile app that connects health workers with healthcare employers.',
    award: 'UNUHR · Full Stack Engineer Intern',
    icon: 'globe',
    demo: { src: './unuhr/demo.mp4', poster: './unuhr/demo-poster.jpg' },
    screens: [
      ['s01', 'Welcome'], ['s02', 'Log in'], ['s03', 'Home'], ['s04', 'Candidate profile'], ['s05', 'Certifications'],
      ['s06', 'Messaging'], ['s07', 'Job pool'], ['s08', 'AI candidate suggestions'], ['s09', 'New job posting'], ['s10', 'Catalog'], ['s11', 'In progress'],
    ].map(([f, l]) => ({ src: `./unuhr/${f}.jpg`, label: l })),
    meta: [
      { k: 'My role', v: 'Full Stack Engineer Intern' },
      { k: 'When', v: 'Mar 2026 to May 2026' },
      { k: 'Where', v: 'UNUHR Inc., Toronto' },
    ],
    problem: [
      'Healthcare employers need qualified people fast, and health workers need jobs that match their certifications. Matching them by hand is slow.',
    ],
    built: [
      'UNUHR is a job app made for healthcare. Recruiters browse a candidate pool, get AI candidate suggestions for a job, check certifications and legal documents, view resumes and message candidates.',
      'They post jobs, save candidates and jobs into a catalog, and track every placement from in progress to filled, with labels for what is due or overdue.',
    ],
    flow: ['Health worker signs up', 'Profile, resume, certifications', 'Recruiter posts a job', 'AI suggests candidates', 'Message and place'],
    myPart: [
      { t: 'Frontend and backend', d: 'Built features on both sides in a small startup team, taking them from idea and mockup to working code.' },
      { t: 'Accounts and profiles', d: 'Registration, profiles and resume uploads.' },
      { t: 'Jobs and matching', d: 'Job discovery, and how employers and candidates find and interact with each other.' },
      { t: 'App Store readiness', d: 'Helped review the app to get it ready for the App Store.' },
    ],
    links: [{ label: 'unuhr.com', url: 'https://unuhr.com' }],
  },

  osiris: {
    id: 'osiris',
    logo: './logos/osiris.png',
    title: 'OSIRIS',
    tagline: 'An AI supply chain co-pilot that spots global disruptions early and plans what to do about them.',
    award: 'Hack the Future 2026',
    icon: 'globe',
    image: './osiris/risk-map.jpg',
    embed: 'https://drive.google.com/file/d/1HkIpK71xP0PUbO6-Wj8pGv1H6KMbrSzS/preview',
    meta: [
      { k: 'Built at', v: 'Hack the Future 2026' },
      { k: 'Stack', v: 'React, TypeScript, Vite, Google ADK, Gemini 2.5 Flash, Supabase, MapLibre, Three.js' },
    ],
    stats: [
      { n: '11', l: 'step agent analysis' },
      { n: '4', l: 'live signal sources' },
      { n: '3', l: 'scenarios: base, stress, shock' },
      { n: '$10K', l: 'playbooks above this need a human' },
    ],
    problem: [
      'Supply chain teams make huge routing decisions from slow, scattered news. By the time a port strike or a plant fire reaches them, the damage is done.',
    ],
    built: [
      'OSIRIS watches GDELT, GNews, NASA FIRMS and ACLED for disruptions like Red Sea rerouting or a plant explosion, and puts them in a live disruption inbox ranked by severity.',
      'For each one, a Google ADK agent with Gemini 2.5 Flash runs an 11-step analysis against your own company profile: risk score, revenue at risk, days to stockout, base, stress and shock scenarios, and a ranked playbook. It then drafts the supplier email and the ERP change, with the full reasoning trace and sources.',
    ],
    flow: ['Live world signals', 'Disruption inbox', 'Gemini agent scores the risk', 'Scenarios and playbook', 'Human approves', 'Supplier email and ERP flag'],
    hard: [
      { t: 'AI that never acts alone', d: 'The agent can never place orders. Supplier emails wait for approval, ERP changes stay simulated, and any playbook over $10K needs a human.', decision: 'Human in the loop by default.' },
      { t: 'Fewer false alarms', d: 'It only escalates when the risk score is over 65, confidence is over 70 and the false positive rate is under 20%.', decision: 'Escalate only when all three agree.' },
      { t: 'Specific, not generic', d: 'Every analysis is tied to the company profile, like an automotive parts maker in Germany, so the advice fits that business.', decision: 'Context first.' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/SehreenB/Hack-the-Future' },
      { label: 'Demo video', url: 'https://drive.google.com/file/d/1HkIpK71xP0PUbO6-Wj8pGv1H6KMbrSzS/view' },
    ],
  },

  rearview: {
    id: 'rearview',
    logo: './logos/rearview.png',
    title: 'RearView',
    tagline: 'Practice your road test before the real one, with an examiner in your phone.',
    award: 'ConUHacks X',
    image: './rearview.png',
    video: 'https://player.vimeo.com/video/1158143118',
    videoPortrait: true,
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
    logo: './logos/49th.png',
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
      { icon: 'medal', h: '3rd Place', d: 'Overall at Hack Canada 2026, against 600+ participants' },
      { icon: 'laurel', h: 'Winner', d: 'Google Build with AI track' },
      { icon: 'star', h: 'End to end', d: 'From WhatsApp onboarding to the browser agent updating the dashboard' },
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
    logo: './logos/sidequest.png',
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
    logo: './logos/vybe.png',
    title: 'VYBE',
    tagline: 'Feel music through vibration, made for Deaf and hard of hearing people.',
    award: '2nd Place, Hackville 2026',
    image: './vybe.png',
    demo: { src: './vybe/demo.mp4', poster: './vybe/demo-poster.jpg' },
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
    results: [{ icon: 'medal', h: '2nd Place', d: 'Hackville 2026' }],
    learned: 'Accessibility works best when it is the starting point, not something added at the end. iOS was new for most of us, and we shipped anyway.',
    links: [
      { label: 'GitHub', url: 'https://github.com/Vidhikalal/VYBE' },
      { label: 'Devpost', url: 'https://devpost.com/software/vybe-l3ua1m' },
    ],
  },

  cakes: {
    id: 'cakes',
    logo: './logos/cakes.png',
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
    logo: './logos/goldminer.png',
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
    tagline: 'A private space for the peer-support program in the UofT Engineering and Computer Science Library.',
    award: 'UofT · APS112 Engineering Strategies & Practice II',
    icon: 'globe',
    image: './popup/smarttint.jpg',
    gallery: {
      title: 'The designs',
      caption: 'Concept images and site photos from our design report.',
      shots: [
        { src: './popup/smarttint.jpg', label: 'SmartTint Glass Pod (chosen)' },
        { src: './popup/foldaway.jpg', label: 'FoldAway Retractable Walls' },
        { src: './popup/flexicurtain.jpg', label: 'FlexiCurtain Acoustic Pod' },
        { src: './popup/library.jpg', label: 'The space behind the circulation desk' },
        { src: './popup/entrance.jpg', label: 'Library entrance' },
      ],
    },
    meta: [
      { k: 'Client', v: 'Dr. Tracy Zahradnik, Engineering and Computer Science Library' },
      { k: 'Course', v: 'APS112, Winter 2025' },
      { k: 'Team', v: 'Muhiedin Omar, Eric Wang, Nia Constantine, Rakin Choudhury, Ian Khadra and me' },
    ],
    stats: [
      { n: '89', l: 'ideas generated' },
      { n: 'STC 40', l: 'sound privacy target' },
      { n: '<4%', l: 'light let through when in use' },
      { n: '$5,000', l: 'budget' },
    ],
    problem: [
      'The library runs a peer-support program for student mental health, but it was held once a week in a crowded office.',
      'The client wanted a semi-permanent space so it could run Tuesday to Friday, with real privacy: soundproofing, walls you cannot see through, and a way to walk in without being noticed.',
    ],
    built: [
      'The SmartTint Glass Pod sits behind the circulation desk. Its glass panels are clear when empty and turn opaque when someone is inside, on a soundproof wooden frame with a lockable door, ventilation and built-in lights.',
      'It is 9.3 square metres, 2.8 metres tall to reach the ceiling, fits two people plus a wheelchair, and has a 1.25 metre door.',
    ],
    flow: ['89 ideas', 'Feasibility check', 'Multi-voting to top 10', 'Graphical decision chart to top 3', 'Pugh chart', 'SmartTint Glass Pod'],
    hard: [
      { t: 'Privacy you can measure', d: 'We turned privacy into numbers: a sound rating of STC 40 or more and less than 4% of light passing through the glass.', decision: 'Smart glass over curtains or walls.' },
      { t: 'Accessible and safe', d: 'The second floor was out of scope because wheelchair users would need to enter through a fire exit. The pod could not block exits or fire extinguishers.', decision: 'First floor, behind the desk.' },
      { t: 'A real budget', d: 'Everything had to fit in $5,000 while still meeting every function, objective and constraint.', decision: 'Stay under $5,000.' },
    ],
    links: [],
  },

  bahen: {
    id: 'bahen',
    title: 'Bahen Courtyard Food Initiative',
    tagline: 'A sustainable gathering space for Bahen after the Cube food outlet closed.',
    award: 'UofT · APS111 Engineering Strategies & Practice I',
    icon: 'globe',
    image: './bahen/exhibition.jpg',
    gallery: {
      title: 'The designs',
      caption: 'Sketches and site photos from our design report.',
      shots: [
        { src: './bahen/exhibition.jpg', label: 'Exhibition space (chosen)' },
        { src: './bahen/exhibition-plan.jpg', label: 'Exhibition space plan' },
        { src: './bahen/restaurant.jpg', label: 'Restaurant concept' },
        { src: './bahen/library.jpg', label: 'Library concept' },
        { src: './bahen/cube.jpg', label: 'The old Cube space' },
      ],
    },
    meta: [
      { k: 'My role', v: 'Team lead' },
      { k: 'Client', v: 'UofT Sustainability Office' },
      { k: 'Course', v: 'APS111, Fall 2024' },
      { k: 'Team', v: 'Roshan Yan, Damita Sethi, Michael Grant, Jiaxu Wang and me' },
    ],
    stats: [
      { n: '7 h', l: 'of site observation' },
      { n: '64', l: 'ideas generated' },
      { n: '3', l: 'concepts compared' },
      { n: '1.1 m', l: 'minimum accessible pathways' },
    ],
    problem: [
      'When the Cube food outlet closed, the Bahen Centre lost its food option and its place to gather.',
      'The Sustainability Office wanted a welcoming, accessible space that also fits the UN Sustainable Development Goals, like Zero Hunger and Climate Action.',
    ],
    built: [
      'We proposed turning the courtyard and the old Cube space into an exhibition space: a modular venue for art, workshops, live performances and demos of sustainable tech, with a stage and digital screens.',
      'It also hosts food events like community potlucks and can include a community garden, with sorted waste for zero waste, AODA pathways, tactile floor markings and adjustable height displays.',
    ],
    flow: ['7 hours on site', '64 ideas', 'Morph charts and voting', 'Library, restaurant, exhibition', 'Pugh chart', 'Exhibition space'],
    myPart: [
      { t: 'Led the team', d: 'Kept the team moving from understanding the client to the final proposal.' },
      { t: 'Ideas and selection', d: 'Worked on idea generation and the idea selection process and appendix.' },
      { t: 'Designs and stakeholders', d: 'Wrote the stakeholders section and the alternative design descriptions for the proposed design.' },
      { t: 'Final proofread', d: 'Proofread and edited the whole report for flow and consistency.' },
    ],
    hard: [
      { t: 'Something new for campus', d: 'A library or restaurant would work, but campus already has those. The client wanted something innovative.', decision: 'An exhibition space that keeps changing.' },
      { t: 'Food versus flexibility', d: 'The trade off is that it cannot serve food like a full restaurant, so food comes through events, potlucks and a garden.', decision: 'Flexibility first.' },
    ],
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
  Praevo: 'praevo',
  UNUHR: 'unuhr',
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
