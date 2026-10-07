#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const GAMES_DIR = __dirname;

function findHtml(dir) {
  let r = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules') r = r.concat(findHtml(p));
    else if (e.name.endsWith('.html')) r.push(p);
  }
  return r;
}

const VIEWPORT = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">';

const CSS = `
/* ===== MOBILE LANDSCAPE FIX ===== */
html,body{width:100vw!important;height:100vh!important;height:100dvh!important;max-height:100vh!important;max-height:100dvh!important;overflow:hidden!important;margin:0!important;padding:0!important;touch-action:manipulation!important;-webkit-user-select:none!important;user-select:none!important;overscroll-behavior:none!important}


@media(orientation:landscape){
  /* --- Global Resets --- */
  body{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:min(4px,1vh)!important}
  body>*,#app,.screen,.game,.game-container,#scene-container,.game-area{max-height:100vh!important;max-height:100dvh!important}
  body>div,body>section,body>main{max-height:100vh!important;max-height:100dvh!important;overflow:hidden!important}
  
  /* --- Typography --- */
  h1{font-size:clamp(.85rem,3vh,1.6rem)!important;margin:min(2px,.5vh) 0!important}
  h2{font-size:clamp(.8rem,2.5vh,1.3rem)!important;margin:min(2px,.5vh) 0!important}
  p{font-size:clamp(.65rem,1.8vh,.95rem)!important;margin:min(2px,.4vh) 0!important}
  
  /* --- Buttons --- */
  button,.btn,.answer-btn{padding:min(6px,1.5vh) min(16px,3vw)!important;font-size:clamp(.7rem,2vh,1.1rem)!important}
  
  /* --- Score/Header --- */
  .score-board,#score-board,[class*="score"]{padding:min(4px,1vh) min(12px,2vw)!important;font-size:clamp(.7rem,1.8vh,1rem)!important;margin:min(2px,.5vh) 0!important}
  #header,.header,[id*="header"]{padding:min(4px,1vh) min(10px,2vw)!important}
  
  /* --- App container (dinohatch etc) --- */
  #app{max-height:100vh!important;max-height:100dvh!important;height:100vh!important;height:100dvh!important;max-width:100vw!important;width:100vw!important}
  
  /* --- Menu screens --- */
  .menu{padding:min(8px,2vh)!important;gap:min(4px,1vh)!important}
  .menu-e{font-size:clamp(1.2rem,5vh,2rem)!important}
  .menu h1{font-size:clamp(.9rem,3.5vh,1.5rem)!important}
  .menu p{font-size:clamp(.6rem,1.6vh,.85rem)!important}
  .menu-row{margin:min(2px,.5vh) 0!important;gap:min(6px,1.5vw)!important}
  .menu-row span{font-size:clamp(.8rem,2.5vh,1.2rem)!important}
  
  /* --- Progress dots --- */
  .dots{padding:min(4px,1vh) 0!important;gap:min(4px,1vw)!important}
  .pd{width:min(26px,6vh)!important;height:min(26px,6vh)!important;font-size:clamp(.55rem,1.4vh,.75rem)!important}
  
  /* --- Dig/Rock games --- */
  .dig-t{font-size:clamp(.7rem,2vh,1rem)!important;margin-top:min(2px,.5vh)!important}
  .dig-m{font-size:clamp(.6rem,1.6vh,.85rem)!important;margin:0!important;min-height:auto!important}
  .rock{width:min(120px,28vh)!important;height:min(120px,28vh)!important}
  .hdots{padding:min(4px,1vh) 0!important;gap:min(4px,1vw)!important}
  .hd{width:min(14px,3.5vh)!important;height:min(14px,3.5vh)!important}
  
  /* --- Reveal/Victory --- */
  .rev,.vic{padding:min(8px,2vh)!important;gap:min(4px,1vh)!important}
  .rev .re{font-size:clamp(2rem,10vh,4rem)!important}
  .rev .rn,.vic h1{font-size:clamp(.9rem,3vh,1.4rem)!important}
  .rev .rs,.vic p{font-size:clamp(.6rem,1.6vh,.85rem)!important}
  .vic .vt{font-size:clamp(1.8rem,8vh,3rem)!important}
  .vic-r span{font-size:clamp(1rem,4vh,1.8rem)!important}
  .vic-s{font-size:clamp(.7rem,2.5vh,1.1rem)!important;margin:0!important}
  
  /* --- Learn/Facts --- */
  .l-top{padding:min(4px,1vh) 0 0!important}
  .l-top .le{font-size:clamp(1.2rem,5vh,2rem)!important}
  .l-top .ln{font-size:clamp(.7rem,2vh,.95rem)!important;margin-top:0!important}
  .l-top .lf{font-size:clamp(.55rem,1.4vh,.75rem)!important}
  .l-facts{padding:min(4px,1vh) min(12px,2vw)!important;gap:min(4px,1vh)!important}
  .ft{padding:min(6px,1.5vh) min(8px,1.5vw)!important;font-size:clamp(.6rem,1.6vh,.85rem)!important;line-height:1.3!important}
  .l-btn{padding:min(4px,1vh)!important}
  
  /* --- Quiz screens --- */
  .q-em{font-size:clamp(1.2rem,5vh,2rem)!important;margin-top:min(4px,1vh)!important}
  .q-tx{font-size:clamp(.7rem,2vh,.95rem)!important;margin:min(4px,1vh) 0!important;padding:0 min(12px,2vw)!important}
  .q-opts{gap:min(6px,1.5vh)!important;padding:0 min(16px,3vw)!important}
  .q-o{font-size:clamp(.65rem,1.8vh,.9rem)!important;padding:min(8px,2vh) min(14px,2.5vw)!important;border-width:2px!important;border-radius:min(10px,2.5vh)!important}
  .q-fb{font-size:clamp(.6rem,1.6vh,.85rem)!important;padding:min(4px,1vh)!important;min-height:auto!important}
  .q-btn{padding:min(4px,1vh) 0!important}
  
  /* --- Game container (pizza etc) --- */
  .game-container{padding:min(8px,2vh) min(14px,2.5vw)!important;max-height:96vh!important;border-radius:min(12px,3vh)!important;max-width:92vw!important}
  .instructions{font-size:clamp(.65rem,1.6vh,.9rem)!important;margin-bottom:min(4px,1vh)!important}
  .fraction{font-size:clamp(.9rem,2.5vh,1.3rem)!important}
  svg#pizza-svg,#pizza-svg{max-width:min(200px,42vh)!important;margin:min(4px,1vh) auto!important}
  #message-area{height:auto!important;min-height:auto!important;margin-top:min(4px,1vh)!important;font-size:clamp(.65rem,1.8vh,.9rem)!important}
  #message{font-size:clamp(.7rem,1.8vh,1rem)!important;margin:min(4px,1vh) 0!important;min-height:auto!important}
  
  /* --- Traffic lights --- */
  .sequence-container{gap:min(8px,2vw)!important;margin-bottom:min(6px,1.5vh)!important;min-height:auto!important;max-height:55vh!important}
  .traffic-light{padding:min(4px,1vh)!important;border-radius:min(14px,3.5vh)!important;gap:min(3px,.8vh)!important}
  .light{width:min(26px,7vh)!important;height:min(26px,7vh)!important}
  .question-mark{font-size:clamp(1.2rem,6vh,2.5rem)!important}
  .controls{gap:min(10px,2vw)!important;padding:min(8px,2vh) min(14px,2.5vw)!important;border-radius:min(12px,3vh)!important;margin-top:0!important}
  .btn-red,.btn-yellow,.btn-green{width:min(44px,11vh)!important;height:min(44px,11vh)!important;border-width:min(3px,.8vh)!important}
  .feedback{height:auto!important;min-height:auto!important;margin-top:min(4px,1vh)!important;font-size:clamp(.7rem,2vh,1.1rem)!important}
  
  /* --- Spelling master --- */
  .screen{padding-top:min(4px,1vh)!important}
  .submarine{width:min(100px,22vh)!important;margin-bottom:min(4px,1vh)!important}
  .progress-bar{width:min(220px,35vw)!important;height:min(12px,3vh)!important;margin-bottom:min(4px,1vh)!important}
  .clue-box{padding:min(6px,1.5vh) min(16px,3vw)!important;margin-bottom:min(6px,1.5vh)!important;gap:min(8px,2vw)!important}
  .emoji-display{font-size:clamp(1.5rem,8vh,3rem)!important}
  .audio-btn{width:min(36px,8vh)!important;height:min(36px,8vh)!important;font-size:clamp(.8rem,2.5vh,1.2rem)!important}
  .slots-container{gap:min(5px,1.2vw)!important;margin-bottom:min(6px,1.5vh)!important;height:auto!important}
  .slot{width:min(36px,8vh)!important;height:min(44px,10vh)!important;font-size:clamp(1rem,4vh,1.6rem)!important;border-bottom-width:min(3px,.8vh)!important}
  .letters-container{gap:min(6px,1.5vw)!important;max-width:85vw!important}
  .letter-bubble{width:min(40px,9vh)!important;height:min(40px,9vh)!important;font-size:clamp(.9rem,3vh,1.3rem)!important}
  .clear-btn{font-size:clamp(.6rem,1.6vh,.9rem)!important;padding:min(4px,1vh) min(10px,2vw)!important;margin-top:min(4px,1vh)!important}
  
  /* --- Monster/plates --- */
  #monster-container svg,#monster-svg{width:min(100px,22vh)!important;height:min(100px,22vh)!important}
  .plate{width:min(80px,18vh)!important;height:min(100px,22vh)!important}
  .game-area,.plates-container,.equation-area{gap:min(8px,2vw)!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important}
  
  /* --- Balloons --- */
  .balloons-area,.balloons-container,.balloon-area{margin-top:min(6px,1.5vh)!important;max-height:55vh!important}
  .cloud-svg{width:min(80px,18vh)!important}
  .balloon-svg,.balloon,.balloon-wrapper{max-height:min(80px,18vh)!important;width:min(60px,14vh)!important}
  .operator{font-size:clamp(1rem,3.5vh,1.6rem)!important}
  
  /* --- Train game --- */
  #platform{padding:min(4px,1vh)!important;min-height:auto!important}
  .crate,.loaded-crate{width:min(70px,14vh)!important;height:min(35px,8vh)!important;font-size:clamp(.6rem,1.6vh,.85rem)!important}
  #engine{width:min(80px,18vh)!important;height:min(65px,15vh)!important}
  .flatbed{width:min(75px,16vh)!important;height:min(16px,4vh)!important}
  #ground{height:min(50px,12vh)!important}
  #thought-bubble{width:min(65px,14vh)!important;height:min(50px,11vh)!important;bottom:min(80px,18vh)!important}
  #target-image svg{width:min(40px,9vh)!important;height:min(40px,9vh)!important}
  #mountains{height:min(80px,18vh)!important}
  
  /* --- Firefly/catch game --- */
  .instruction{font-size:clamp(.7rem,1.8vh,1rem)!important;padding:min(4px,1vh) min(10px,2vw)!important}
  #math-panel{padding:min(8px,2vh) min(14px,2.5vw)!important}
  .equation{font-size:clamp(1rem,3.5vh,1.6rem)!important;margin-bottom:min(6px,1.5vh)!important}
  .answer-btn{width:min(42px,10vh)!important;height:min(42px,10vh)!important;font-size:clamp(.85rem,2.5vh,1.2rem)!important;border-radius:min(10px,2.5vh)!important}
  .welcome-emoji{font-size:clamp(1.5rem,8vh,3rem)!important}
  .welcome-title{font-size:clamp(.9rem,4vh,1.6rem)!important}
  .welcome-subtitle,.welcome-sub{font-size:clamp(.6rem,1.6vh,.85rem)!important}
  .welcome-jar{width:min(60px,13vh)!important;height:min(80px,17vh)!important;margin-bottom:min(6px,1.5vh)!important}
  .catch-jar-body,.jar-body{width:min(70px,15vh)!important;height:min(95px,21vh)!important}
  .catch-title{font-size:clamp(.7rem,1.8vh,.95rem)!important}
  .catch-counter{font-size:clamp(.6rem,1.4vh,.8rem)!important}
  .complete-badge{width:min(70px,16vh)!important;height:min(70px,16vh)!important}
  .complete-title{font-size:clamp(.85rem,3vh,1.4rem)!important}
  .complete-sub{font-size:clamp(.6rem,1.4vh,.8rem)!important}
  
  /* --- Body parts --- */
  .character-container{width:min(140px,35vh)!important}
  .prompt{padding:min(4px,1vh) min(10px,2vw)!important;font-size:clamp(.7rem,2vh,1rem)!important;min-height:auto!important}
  .score-bar{padding:min(3px,.8vh) min(8px,1.5vw)!important}
  .score-star{width:min(16px,4vh)!important;height:min(16px,4vh)!important;font-size:min(12px,3vh)!important}
  .body-container,.body-svg-container{max-height:65vh!important}
  
  /* --- Senses hover game --- */
  .grid{flex-wrap:nowrap!important;gap:min(6px,1.5vw)!important;margin-top:min(4px,1vh)!important}
  .card{width:min(100px,20vh)!important;height:min(120px,32vh)!important;border-radius:min(14px,3.5vh)!important}
  .card svg{width:min(50px,13vh)!important;height:min(50px,13vh)!important}
  .card p{font-size:clamp(.55rem,1.4vh,.85rem)!important;margin:min(2px,.5vh) 0 0!important}
  #sense-text{font-size:clamp(.7rem,1.8vh,1rem)!important;margin-top:min(6px,1.5vh)!important;padding:min(6px,1.5vh) min(12px,2vw)!important;min-height:auto!important}
  .sense-card,.sense-option{max-height:18vh!important}
  
  /* --- Drag/drop garden --- */
  .garden-bed{flex-wrap:nowrap!important;gap:min(6px,1.5vw)!important;margin-bottom:min(6px,1.5vh)!important}
  .drop-zone{width:min(65px,15vh)!important;height:min(65px,15vh)!important}
  .drop-zone::before{font-size:min(2em,7vh)!important}
  .items-container{min-height:auto!important;padding:min(6px,1.5vh)!important;gap:min(6px,1.5vw)!important;max-width:none!important}
  .draggable{width:min(55px,13vh)!important;height:min(55px,13vh)!important}
  
  /* --- Dominos --- */
  .top-section,.bottom-section{height:auto!important;min-height:auto!important;max-height:42vh!important}
  .domino-display{height:auto!important;max-height:28vh!important}
  
  /* --- Puzzle --- */
  .puzzle-container,.puzzle-grid{height:auto!important;max-height:58vh!important}
  .puzzle-cell{width:min(55px,13vh)!important;height:min(55px,13vh)!important}
  .canvas-container,#dotCanvas{max-height:62vh!important}
  
  /* --- Egg hatch --- */
  .egg-container,.egg,.egg-wrapper,.color-egg-container{height:min(170px,48vh)!important;width:auto!important;max-height:50vh!important}
  .color-buttons,.color-picker{gap:min(5px,1.2vw)!important;margin-top:min(4px,1vh)!important}
  .color-btn{width:min(34px,8vh)!important;height:min(34px,8vh)!important}
  
  /* --- Face builder --- */
  .face-canvas,.face-area,.build-area,.face-builder-container{height:min(250px,65vh)!important;max-height:68vh!important}
  .parts-grid{gap:min(4px,1vh)!important}
  .face-part{width:min(42px,10vh)!important;height:min(42px,10vh)!important}
  
  /* --- Geography --- */
  .card-scene{height:min(85px,22vh)!important}
  .scene-wrap{min-height:auto!important}
  .quiz-container,.quiz-card{max-height:88vh!important;overflow-y:auto!important}
  
  /* --- Animals --- */
  .animal-grid,.options-grid{grid-template-columns:repeat(4,1fr)!important;gap:min(5px,1.2vw)!important}
  .animal-option,.option-card{max-height:20vh!important}
  .animal-image,.main-image{max-height:32vh!important}
  .animal-card{padding:min(3px,.8vh)!important}
  .animal-card .a-emoji{font-size:clamp(.85rem,3.5vh,1.4rem)!important}
  .fact-card{padding:min(6px,1.5vh) min(10px,2vw)!important;min-height:auto!important}
  .facts-jar{width:min(55px,13vh)!important;height:min(80px,18vh)!important}
  .quiz-grid{gap:min(5px,1.2vw)!important}
  
  /* --- Bowling/Bath/Fish --- */
  .bowling-lane,.lane-container,#bowling-canvas{max-height:80vh!important}
  .bath-container,.tub,#bath-canvas{max-height:70vh!important}
  .water,.pond,#pond-canvas,.fishing-area{max-height:65vh!important}
  
  /* --- Whack-a-mole --- */
  .mole-grid,.holes-container{max-height:68vh!important}
  .hole,.mole-hole{width:min(65px,15vh)!important;height:min(65px,15vh)!important}
  
  /* --- Pizza/fractions --- */
  .pizza-container,.pizza{width:min(200px,45vh)!important;height:min(200px,45vh)!important}
  .lab-container,.beakers{max-height:58vh!important}
  
  /* --- Frog/lily pad --- */
  .pond-area,.lily-pads{max-height:62vh!important}
  .frog{width:min(50px,12vh)!important;height:min(50px,12vh)!important}
  
  /* --- Word/spelling tiles --- */
  .word-display,.letter-tiles,.word-area{max-height:22vh!important}
  .tile,.letter-tile{width:min(38px,9vh)!important;height:min(46px,10vh)!important;font-size:clamp(.85rem,2.5vh,1.4rem)!important}
  
  /* --- Reading --- */
  .reading-area,.text-display,.story-area{max-height:48vh!important;overflow-y:auto!important}
  .ocean,.ocean-container{max-height:58vh!important}
  .space,.cosmos-area{max-height:68vh!important}
  .hit-zone,.rhythm-track{max-height:58vh!important}
  .garden,.shape-garden{max-height:68vh!important}
  .dig-area,.fossil-container,.fossil-area{max-height:55vh!important}
  .tool-bar{padding:min(4px,1vh)!important;gap:min(5px,1.2vw)!important}
}
/* ===== END MOBILE LANDSCAPE FIX ===== */
`;

function process(fp) {
  let c = fs.readFileSync(fp, 'utf8');
  const rel = path.relative(GAMES_DIR, fp);

  // 1. Strip previous landscape fixes (v1, v2, v3, and earlier final pass)
  c = c.replace(/\n?\/\* =+ LANDSCAPE MODE FIX[\s\S]*?\/\* =+ END LANDSCAPE MODE FIX =+ \*\//g, '');
  c = c.replace(/\n?\/\* =+ LANDSCAPE PLAYABILITY FIX V2[\s\S]*?\/\* =+ END LANDSCAPE PLAYABILITY FIX V2 =+ \*\//g, '');
  c = c.replace(/\n?\/\* =+ LANDSCAPE PLAYABILITY FIX V3[\s\S]*?\/\* =+ END LANDSCAPE PLAYABILITY FIX V3 =+ \*\//g, '');
  c = c.replace(/\n?\/\* =+ MOBILE LANDSCAPE FIX =+ \*\/[\s\S]*?\/\* =+ END MOBILE LANDSCAPE FIX =+ \*\//g, '');

  // 2. Strip rotation overlay HTML
  c = c.replace(/\n?<!-- Landscape rotation overlay \(auto-injected\) -->\n<div id="landscape-rotate-overlay">[\s\S]*?<\/div>\n/g, '');
  c = c.replace(/\n?<!-- Landscape rotation overlay -->\n<div id="landscape-rotate-overlay">[\s\S]*?<\/div>\n/g, '');
  c = c.replace(/\n?<div id="landscape-rotate-overlay">[\s\S]*?<\/div>\n/g, '');

  // 3. Fix viewport meta
  const vpRe = /<meta\s+name=["']viewport["'][^>]*>/i;
  if (vpRe.test(c)) c = c.replace(vpRe, VIEWPORT);
  else {
    const csRe = /(<meta\s+charset=["'][^"']*["'][^>]*>)/i;
    if (csRe.test(c)) c = c.replace(csRe, `$1\n    ${VIEWPORT}`);
  }

  // 4. Inject CSS before last </style>
  const si = c.lastIndexOf('</style>');
  if (si !== -1) {
    c = c.slice(0, si) + CSS + '\n    </style>' + c.slice(si + 8);
  } else {
    const hi = c.indexOf('</head>');
    if (hi !== -1) c = c.slice(0, hi) + `<style>${CSS}</style>\n` + c.slice(hi);
  }

  fs.writeFileSync(fp, c, 'utf8');
  console.log('  FIXED: ' + rel);
  return true;
}

console.log('🔧 Applying final landscape fix (clean)...\n');
const files = findHtml(GAMES_DIR);
let fixed = 0, skipped = 0;
for (const f of files) { if (process(f)) fixed++; else skipped++; }
console.log(`\n✅ Done! Fixed: ${fixed}, Skipped: ${skipped}, Total: ${files.length}`);
