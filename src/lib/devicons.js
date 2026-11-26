// Small map from skill names to Devicon logos (served from jsDelivr).
const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const MAP = {
  swift: 'swift/swift-original', swiftui: 'swift/swift-original', python: 'python/python-original',
  'c / c++': 'cplusplus/cplusplus-original', javascript: 'javascript/javascript-original',
  'typescript / sql': 'typescript/typescript-original', typescript: 'typescript/typescript-original',
  java: 'java/java-original', matlab: 'matlab/matlab-original', verilog: 'verilog/verilog-plain',
  react: 'react/react-original', 'react native (expo)': 'react/react-original', 'next.js': 'nextjs/nextjs-original',
  vite: 'vitejs/vitejs-original', fastapi: 'fastapi/fastapi-original', 'linux (ubuntu)': 'linux/linux-original',
  'google cloud storage': 'googlecloud/googlecloud-original', 'version control (git)': 'git/git-original',
  github: 'github/github-original', 'vs code': 'vscode/vscode-original', bash: 'bash/bash-original',
  xcode: 'xcode/xcode-original', figma: 'figma/figma-original', postman: 'postman/postman-original',
  'linux/unix cli': 'linux/linux-original', 'ros 2': 'ros/ros-original', playwright: 'playwright/playwright-original',
};
export function devicon(name) {
  const k = MAP[name.toLowerCase()];
  return k ? `${BASE}/${k.split('/')[0]}/${k.split('/')[1]}.svg` : null;
}
