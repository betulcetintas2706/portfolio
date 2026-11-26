// Case studies for the featured projects. Facts come from Devpost,
// LinkedIn posts and the resume, so keep numbers in sync with those.

export const caseStudies = {
  meducine: {
    id: 'meducine',
    title: 'Meducine',
    tagline: 'An AI health literacy app that explains your health in plain words, before it is too late.',
    award: '1st Place · Harvard HSIL 2026 (Toronto Hub)',
    icon: 'chat',
    meta: [
      { k: 'My role', v: 'Frontend engineer, 1 of 2 engineers' },
      { k: 'Team', v: 'Sehreen Basara (backend), Tami Vasanthakumaran (founder), Sangkavi Kuhan' },
      { k: 'When', v: 'Apr 2026 to now' },
      { k: 'Stack', v: 'React Native, Expo, TypeScript, Claude AI, TestFlight' },
    ],
    stats: [
      { n: '~7.2%', l: 'hackathon acceptance' },
      { n: 'Top 120', l: 'teams worldwide in the HSIL bootcamp' },
      { n: '6', l: 'iOS builds shipped on TestFlight' },
      { n: '35+', l: 'commits from me' },
    ],
    problem: [
      "Most people don't really understand their health until something goes wrong. Medical words are confusing, so people don't know when or why to get care, and small problems grow.",
      'Our founder, Tami, had pitched this idea to other developers before. They told her it was too complex and not technically possible.',
    ],
    built: [
      'Meducine turns complex medical information into personal, plain language guidance, so people know when and why to seek care before problems escalate.',
    ],
    flow: ['Medical term or question', 'Claude AI explains it simply', 'Personal guidance in the app', 'Read aloud with text to speech'],
    myPart: [
      'Built the React Native (Expo) frontend of the app as 1 of 2 engineers, with 35+ commits.',
      'Built a medical dictionary of 60+ terms with 26 specialty filters, plus text to speech so people can listen instead of read.',
      'Turned a non-technical founder\'s vision into clear product requirements we could actually build.',
      'Shipped 6 iOS builds to real testers through TestFlight.',
    ],
    hard: [
      { t: 'Scoping a big idea', d: 'The vision was huge, so we split it into what had to work for the demo and what could wait.' },
      { t: 'Making medical info feel friendly', d: 'Filters, a dictionary and audio made dense content easy to browse instead of a wall of text.' },
    ],
    results: [
      'Won 1st Place at the Harvard Health Systems Innovation Lab Hackathon 2026, Toronto Hub.',
      'Advanced to the HSIL Venture Building Bootcamp, one of 120 teams selected globally.',
      'Showcased at the AstraZeneca and Plan International Canada "Faces of the Future" reception.',
    ],
    learned: 'Building for a non-technical founder taught me to ask "what does the user need to feel?" before "what should I code?". Shipping real TestFlight builds also showed me how much polish matters once real people use your app.',
    links: [],
  },

  nanotrade: {
    id: 'nanotrade',
    title: 'NanoTrade',
    tagline: 'A computer chip that spots a market crash in 80 nanoseconds.',
    award: '3rd Place · UofT IEEE IC Hackathon (ASIC)',
    image: './nanotrade.png',
    video: 'https://player.vimeo.com/video/1167116687',
    meta: [
      { k: 'My role', v: 'ML classification block and physical design flow' },
      { k: 'Team', v: 'Seeron Sivashankar, Sehreen Basara' },
      { k: 'When', v: 'Feb 2026 · hackathon' },
      { k: 'Stack', v: 'Verilog, Cognichip, Tiny Tapeout, SkyWater 130 nm' },
    ],
    stats: [
      { n: '80 ns', l: 'to detect a crash pattern' },
      { n: '9,800', l: 'of 10,000 cells used' },
      { n: '40% → 0.5%', l: 'false positives' },
      { n: '8', l: 'anomaly checks in parallel' },
    ],
    problem: [
      'In 2010, the Flash Crash wiped out $1 trillion in 36 minutes. Software was watching, but it reacted too slowly to stop it.',
      'Market surveillance still mostly runs in software, which loses time to OS scheduling, cache misses and about 40 µs of jitter per trade. We asked: what if the circuit breaker lived directly in the silicon?',
    ],
    built: [
      'NanoTrade is a custom chip (ASIC) written in Verilog and taped out through Tiny Tapeout on SkyWater 130 nm. Running at 50 MHz, it watches market data and flags anomalies like price spikes, volume surges, liquidity crises and quote stuffing, all at once.',
      'It can trigger a hardware circuit breaker in 20 ns and detect a full cascade pattern in 80 ns. That is over 27 billion times faster than the 2010 crash unfolded.',
    ],
    flow: ['Order book', 'Rule detector (8 checks)', 'Feature extractor', 'ML classifier', 'Cascade detector', 'Circuit breaker'],
    myPart: [
      'Worked on the ML classification block: replaced a ~3,000 cell neural network with a 200 cell threshold classifier that still scores confidence.',
      'Worked on the physical design flow with Cognichip to get the design to fit the chip.',
      'Swapped 500+ cell dividers for shift approximations to save space.',
      'Helped bring false positives down from 40% to 0.5% across 10,000+ simulations.',
    ],
    hard: [
      { t: 'A strict 10,000 cell budget', d: 'Every gate counted. We finished at 9,800 cells, so a full neural network simply did not fit.' },
      { t: 'Speed', d: 'The priority encoder first had a 12 ns delay. Rebuilding it as a balanced tree brought it to 8 ns.' },
      { t: 'Too many false alarms', d: 'At first 40% of alerts were wrong. Tuning thresholds over 10,000+ simulations got it to 0.5%.' },
    ],
    results: [
      'Placed 3rd Overall at the UofT IEEE IC Hackathon.',
      'Featured by Cognichip, whose AI tools we used for the chip flow.',
    ],
    learned: 'Hardware forces discipline. In software you can add one more library. On a chip, every idea has to earn its gates, which made me think much harder about what really matters in a design.',
    links: [
      { label: 'GitHub', url: 'https://github.com/betulcetintas2706/ttsky-nanotrades' },
      { label: 'Website', url: 'https://betulcetintas2706.github.io/websitenanotrade/' },
      { label: 'Devpost', url: 'https://devpost.com/software/nanotrade' },
      { label: 'Demo', url: 'https://vimeo.com/1167116687' },
    ],
  },

  iris: {
    id: 'iris',
    title: 'IRIS',
    tagline: 'Smart safety glasses that watch your lab experiment and tell you, out loud, if a step is wrong.',
    award: 'YHack Spring 2026 · Yale',
    image: './iris.png',
    video: 'https://player.vimeo.com/video/1178189406',
    meta: [
      { k: 'My role', v: 'Built the SwiftUI iOS app' },
      { k: 'Team', v: 'Sreekar Kakumani, Sehreen Basara, Sami Maghnaoui' },
      { k: 'When', v: 'Spring 2026 · 24 hours' },
      { k: 'Stack', v: 'SwiftUI, ESP32-S3, FastAPI, Overshoot, Gemini 2.5 Flash, ElevenLabs, Auth0' },
    ],
    stats: [
      { n: '24 h', l: 'from idea to working system' },
      { n: '3', l: 'parts: glasses, backend, iOS app' },
      { n: 'YC W26', l: 'sponsor: Overshoot' },
      { n: '1', l: 'company offered to keep building it' },
    ],
    problem: [
      "In a lab there is always a moment where you're not sure if you're doing it right, and by the time you find out, it's too late.",
      'TAs can\'t watch every student at once, so mistakes get caught after the experiment is already ruined.',
    ],
    built: [
      'IRIS puts a small camera on regular safety glasses. It sees what the student sees, understands the experiment in real time, and gives instant voice guidance when a step is done or something goes wrong.',
    ],
    flow: ['ESP32-S3 camera on glasses', 'Live video over WiFi', 'FastAPI backend', 'Overshoot vision + Gemini', 'ElevenLabs voice', 'iOS app'],
    myPart: [
      'Built the SwiftUI iOS app that students use during the lab.',
      'Live step tracking, so students see which steps are done and what comes next.',
      'Audio playback of the voice guidance and voice Q&A with SFSpeechRecognizer, so students can ask questions hands free.',
      'Sign in with Auth0.',
    ],
    hard: [
      { t: 'Hardware, AI and mobile in 24 hours', d: 'Three very different parts had to talk to each other live, with almost no time to debug.' },
      { t: 'Real-time feel', d: 'Guidance is only useful if it arrives while the student is still on that step, so every hop had to stay fast.' },
    ],
    results: [
      'Got early guidance and sponsored Overshoot credits from Overshoot\'s founder (YC W26).',
      'ActualFood offered to support IRIS after the hackathon, with a follow-up meeting planned.',
      'Saw the whole system work end to end for the first time at Yale, which felt unreal.',
    ],
    learned: 'Building the app side of a hardware product taught me to design for hands that are busy. Voice first, big clear states, nothing to tap mid-experiment.',
    links: [
      { label: 'Devpost', url: 'https://devpost.com/software/iris-de1z3t' },
      { label: 'Demo', url: 'https://vimeo.com/1178189406' },
    ],
  },
};

export const caseOrder = ['meducine', 'nanotrade', 'iris'];

// Map featured project titles to their case study.
export const caseForProject = { Meducine: 'meducine', NanoTrade: 'nanotrade', IRIS: 'iris' };
