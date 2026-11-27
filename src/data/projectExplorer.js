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
  'Kavodax Agentic Payments': {
    kicker: 'AI · Fintech', sub: 'Agentic payments',
    summary: 'A sandbox where an AI agent makes payments, and a policy engine decides if it can.',
    headline: 'Let the agent pay, safely.',
    points: ['Plain words in, payment out', '7 policy rules across CAD, USDC and CADK', 'Pay, ask a human, or block'],
  },
  Praevo: {
    kicker: 'Web · iOS · Health', sub: 'Landing page + iOS app',
    summary: 'The landing page at praevo.band and the iOS app for a wearable that predicts athlete injuries.',
    headline: 'Before athletes become patients.',
    points: ['Next.js landing page with WebGL and scroll storytelling', 'Waitlist with a referral system', 'SwiftUI app for coaches, athletes and clinics'],
  },
  UNUHR: {
    kicker: 'Full stack · Health', sub: 'Health job matching',
    summary: 'A mobile app that matches health workers with healthcare employers.',
    headline: 'The right nurse, faster.',
    points: ['Candidate pool with AI suggestions', 'Job posting and messaging', 'Placements tracked from start to filled'],
  },
  OSIRIS: {
    kicker: 'AI · Supply chain', sub: 'Supply chain risk',
    summary: 'An AI co-pilot that spots global supply chain disruptions early and plans the response.',
    headline: 'Risk, spotted early.',
    points: ['11-step Gemini agent on Google ADK', 'Risk score, scenarios and a ranked playbook', 'Human approval before anything is sent'],
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
    summary: 'A private pop-up space for the peer-support program in the UofT Engineering Library.',
    headline: 'A quiet place on campus.',
    points: ['SmartTint glass turns opaque when in use', 'Soundproof to STC 40', '89 ideas narrowed to 1'],
  },
  'Bahen Courtyard Food Initiative': {
    kicker: 'Design · Sustainability', sub: 'Sustainable gathering space',
    summary: 'A sustainable gathering space for Bahen after the Cube food outlet closed.',
    headline: 'Greener food on campus.',
    points: ['Client: UofT Sustainability Office', '64 ideas, 3 concepts, 1 exhibition space', 'Zero waste and year round use'],
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
