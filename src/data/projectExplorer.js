// Extra copy for the project explorer, keyed by project title.
// kicker: small label above the title · sub: line under the name in the list
// summary: one sentence · headline + points: the preview panel
export const explorer = {
  Meducine: {
    kicker: 'AI · Health', sub: 'Health literacy',
    summary: 'An AI app that turns complex medical information into plain, personal guidance.',
    headline: 'Medicine, in plain words.',
    points: ['60+ term medical dictionary', '26 specialty filters', '1st at Harvard HSIL Toronto Hub'],
  },
  OSIRIS: {
    kicker: 'AI · Supply chain', sub: 'Supply chain risk',
    summary: 'A multi-agent AI that watches world news and logistics data for supply chain risk.',
    headline: 'Risk, spotted early.',
    points: ['Multi-agent system on Google ADK', 'Gemini-powered agents', 'GDELT, GNews, NASA FIRMS and ACLED signals'],
  },
  IRIS: {
    kicker: 'Hardware · AI · iOS', sub: 'AI lab assistant',
    summary: 'Safety glasses that follow a lab experiment and guide students through it, hands free.',
    headline: 'A second pair of eyes.',
    points: ['ESP32-S3 camera watches the bench', 'Gemini confirms steps and flags errors', 'ElevenLabs voice answers questions'],
  },
  RearView: {
    kicker: 'iOS · AR', sub: 'Road test practice',
    summary: "An iOS app that simulates a Quebec Class 5 road test with an examiner's voice.",
    headline: 'Practice the road test.',
    points: ['Examiner-style voice directions', 'ARKit head tracking for shoulder checks', 'Pass or fail, mistake list and heatmap'],
  },
  '49th': {
    kicker: 'AI · Full stack', sub: 'Newcomer support',
    summary: 'An AI settlement assistant that helps newcomers to Canada, right in WhatsApp.',
    headline: 'Settling in, one step at a time.',
    points: ['Voice-note replies in your language', 'Personal task roadmap and dashboard', 'Agent that navigates government sites for you'],
  },
  SideQuest: {
    kicker: 'iOS · AI', sub: 'Scenic navigation',
    summary: 'A navigation app that plans scenic, themed routes instead of the fastest one.',
    headline: 'Take the long way.',
    points: ['Adventure, Foodie, Nature and Culture routes', 'Gemini and ElevenLabs narration', 'Geo-tagged memories and badges'],
  },
  NanoTrade: {
    kicker: 'Hardware · ASIC', sub: 'Market surveillance',
    summary: 'A tiny ASIC chip that flags market anomalies in about 80 ns.',
    headline: 'Market checks at chip speed.',
    points: ['8 parallel anomaly checks at 50 MHz', '9,800 of 10,000 cells used', 'False positives cut from 40% to 0.5%'],
  },
  'Comfy Cakes': {
    kicker: 'Hardware · FPGA', sub: 'FPGA cake game',
    summary: 'Our Purble Place Comfy Cakes recreation, running on a DE1-SoC FPGA.',
    headline: 'Baked in Verilog.',
    points: ['Game FSM, datapath and scoring', 'PS/2 keyboard and VGA graphics', 'Playable right here'],
  },
  VYBE: {
    kicker: 'iOS · Accessibility', sub: 'Feel the music',
    summary: 'An iOS app that lets Deaf and hard-of-hearing users feel live music as vibration.',
    headline: 'Music you can feel.',
    points: ['Bass drives intensity, tempo drives pulse', 'Core Haptics and AVFoundation', 'Apple Watch companion app'],
  },
  'Gold Miner (FPGA Game)': {
    kicker: 'Hardware · FPGA', sub: 'FPGA arcade game',
    summary: 'A Gold Miner arcade game built fully in hardware on a DE1-SoC FPGA.',
    headline: 'Mining in hardware.',
    points: ['Control FSM with hook sub-FSMs', '320×240 VGA and a 45 second HEX timer', 'Playable right here'],
  },
  'Mental Health Pop-up Space': {
    kicker: 'Design · Client project', sub: 'Engineering Library',
    summary: 'A mental health pop-up space for students, designed for the UofT Engineering Library.',
    headline: 'A quiet place on campus.',
    points: ['Client project with the Engineering Library', 'Engineering Strategies & Practice II', 'Team design process'],
  },
  'Bahen Courtyard Food Initiative': {
    kicker: 'Design · Sustainability', sub: 'Sustainable food',
    summary: 'I led a team designing sustainable food options for the Bahen Courtyard at UofT.',
    headline: 'Greener food on campus.',
    points: ['Team lead', 'Engineering Strategies & Practice I', 'Sustainability-focused design'],
  },
  'Micro:bit Heartbeat Monitor': {
    kicker: 'Hardware · Wearables', sub: 'Heartbeat monitor',
    summary: 'A wearable heartbeat monitor built on the Micro:bit, a project I led.',
    headline: 'A heartbeat you can wear.',
    points: ['Built on the Micro:bit', 'Heart rate sensing', 'Project lead'],
  },
  'AI Trash Bin Sorter': {
    kicker: 'AI · Computer vision', sub: 'Waste sorting',
    summary: 'A computer vision system that sorts trash in real time, with voice instructions.',
    headline: 'Sorting trash with vision.',
    points: ['Trained on 50k images', '70% sorting accuracy', 'Camera and voice instructions'],
  },
};
