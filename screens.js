/* ═══════════════════════════════════════════
   mnmoo — Splash, Showcase & Game Gallery
   ═══════════════════════════════════════════ */

/* ═══ GAME CATALOG (51 games) ═══ */
const GAME_CATALOG = [
  // MATH — Add & Subtract
  {id:'m1',name:'Sunny Meadow Addition',path:'games/grade1_math/addsubtract/addsubtract_opus.html',subj:'math',icon:'🌻',bg:'#fff3e0'},
  {id:'m2',name:'Penguin Bowling',path:'games/grade1_math/addsubtract/bowling_opus.html',subj:'math',icon:'🐧',bg:'#e3f2fd'},
  {id:'m3',name:'Bubble Bath Splash',path:'games/grade1_math/addsubtract/bubblebath_opus.html',subj:'math',icon:'🛁',bg:'#e8f5e9'},
  {id:'m4',name:'Fishing Addition',path:'games/grade1_math/addsubtract/catchfish_opus.html',subj:'math',icon:'🐟',bg:'#e0f7fa'},
  // MATH — Compare
  {id:'m5',name:'Catch the Heavier Fish',path:'games/grade1_math/compare/catchfish_opus.html',subj:'math',icon:'⚖️',bg:'#e0f7fa'},
  {id:'m6',name:'Feed the Monster',path:'games/grade1_math/compare/feedmonster_opus.html',subj:'math',icon:'👾',bg:'#fce4ec'},
  {id:'m7',name:'Whack-a-Mole',path:'games/grade1_math/compare/whackmole_opus.html',subj:'math',icon:'🔨',bg:'#f3e5f5'},
  // MATH — Fractions
  {id:'m8',name:'Fraction Mix Lab',path:'games/grade1_math/fractions/mixlab_opus.html',subj:'math',icon:'🧪',bg:'#ede7f6'},
  {id:'m9',name:'Pizza Fractions',path:'games/grade1_math/fractions/pizzafraction_opus.html',subj:'math',icon:'🍕',bg:'#fff8e1'},
  // MATH — Ordering
  {id:'m10',name:'Catch Falling Stars',path:'games/grade1_math/ordering/catchthestar_opus.html',subj:'math',icon:'⭐',bg:'#fff9c4'},
  {id:'m11',name:'Connect the Dots',path:'games/grade1_math/ordering/connectdots_opus.html',subj:'math',icon:'🔗',bg:'#e8eaf6'},
  {id:'m12',name:'Feed My Garden',path:'games/grade1_math/ordering/feedgarden_opus.html',subj:'math',icon:'🌱',bg:'#e8f5e9'},
  {id:'m13',name:'Magic Number Slider',path:'games/grade1_math/ordering/magicpuzzle_opus.html',subj:'math',icon:'🧩',bg:'#f3e5f5'},
  // MATH — Pattern Match
  {id:'m14',name:'Bubble Pop Frenzy',path:'games/grade1_math/patternmatch/ballonpop_opus.html',subj:'math',icon:'🫧',bg:'#e0f7fa'},
  {id:'m15',name:'Domino Patterns',path:'games/grade1_math/patternmatch/dominos_opus.html',subj:'math',icon:'🁫',bg:'#efebe9'},
  {id:'m16',name:'Color Rhythm',path:'games/grade1_math/patternmatch/rhythm_opus.html',subj:'math',icon:'🎵',bg:'#fce4ec'},
  {id:'m17',name:'Pattern Garden',path:'games/grade1_math/patternmatch/shapegarden_opus.html',subj:'math',icon:'🌸',bg:'#e8f5e9'},
  {id:'m18',name:'Traffic Light Patterns',path:'games/grade1_math/patternmatch/trafficlights_opus.html',subj:'math',icon:'🚦',bg:'#fff3e0'},
  // MATH — Skip Counting
  {id:'m19',name:'Catch the Stars',path:'games/grade1_math/skipcounting/catchstars_opus.html',subj:'math',icon:'🌟',bg:'#fffde7'},
  {id:'m20',name:'Lily Pad Jump',path:'games/grade1_math/skipcounting/lilypadjump_opus.html',subj:'math',icon:'🐸',bg:'#e8f5e9'},
  // LANGUAGE
  {id:'l1',name:'Compound Word Express',path:'games/grade1_language/compound_words/train_word_opus.html',subj:'lang',icon:'🚂',bg:'#e3f2fd'},
  {id:'l2',name:'Word Factory',path:'games/grade1_language/compound_words/word_factory_opus.html',subj:'lang',icon:'🏭',bg:'#f3e5f5'},
  {id:'l3',name:'Contraction Clouds',path:'games/grade1_language/contractions/balloon_pop_opus.html',subj:'lang',icon:'☁️',bg:'#e8eaf6'},
  {id:'l4',name:'Hungry Contraction Monster',path:'games/grade1_language/contractions/monster_opus.html',subj:'lang',icon:'🦖',bg:'#fce4ec'},
  {id:'l5',name:'Cosmic Cargo Sorting',path:'games/grade1_language/nouns_adjectives/cosmos_opus.html',subj:'lang',icon:'🚀',bg:'#ede7f6'},
  {id:'l6',name:'Whack-a-Word',path:'games/grade1_language/nouns_adjectives/whack_a_mole_opus.html',subj:'lang',icon:'📖',bg:'#fff8e1'},
  {id:'l7',name:'Plural Picker',path:'games/grade1_language/plurals/guess_opus.html',subj:'lang',icon:'🎯',bg:'#e0f7fa'},
  {id:'l8',name:'Ocean Plurals',path:'games/grade1_language/plurals/ocean_opus.html',subj:'lang',icon:'🐙',bg:'#e0f7fa'},
  {id:'l9',name:'Reading Stars',path:'games/grade1_language/reading_basics/readingbasic_opus.html',subj:'lang',icon:'📚',bg:'#fff3e0'},
  {id:'l10',name:'Reading Adventure',path:'games/grade1_language/reading_basics/readingbasics2_opus.html',subj:'lang',icon:'📖',bg:'#e8f5e9'},
  {id:'l11',name:'Balloon Pop Sight Words',path:'games/grade1_language/sight_words/balloon_pop_opus.html',subj:'lang',icon:'🎈',bg:'#fce4ec'},
  {id:'l12',name:'Sight Word Whack',path:'games/grade1_language/sight_words/sighword_pop_opus.html',subj:'lang',icon:'👁️',bg:'#f3e5f5'},
  {id:'l13',name:'Egg Basket Verbs',path:'games/grade1_language/verbs/frog_hopper_opus.html',subj:'lang',icon:'🥚',bg:'#fff8e1'},
  {id:'l14',name:'Magic Verb Potion',path:'games/grade1_language/verbs/magic_potion_opus.html',subj:'lang',icon:'🧙',bg:'#ede7f6'},
  {id:'l15',name:'Frog Hopper Spelling',path:'games/grade1_language/word_spelling/frog_hopper_spelling_opus.html',subj:'lang',icon:'🐸',bg:'#e8f5e9'},
  {id:'l16',name:'Pop Balloon Spelling',path:'games/grade1_language/word_spelling/pop_balloon_opus.html',subj:'lang',icon:'🎈',bg:'#fce4ec'},
  {id:'l17',name:'Spelling Bee',path:'games/grade1_language/word_spelling/spelling_bee_opus.html',subj:'lang',icon:'🐝',bg:'#fff8e1'},
  {id:'l18',name:'Deep Sea Spelling Dive',path:'games/grade1_language/word_spelling/spelling_master_opus.html',subj:'lang',icon:'🤿',bg:'#e0f7fa'},
  // SCIENCE
  {id:'s1',name:'Firefly Jar',path:'games/grade1_science/animals/catchfireflies_opus.html',subj:'sci',icon:'✨',bg:'#fffde7'},
  {id:'s2',name:'Guess the Animal',path:'games/grade1_science/animals/identify_opus.html',subj:'sci',icon:'🦁',bg:'#fff3e0'},
  {id:'s3',name:'My Body',path:'games/grade1_science/Bodyparts/bodyparts_opus.html',subj:'sci',icon:'🫀',bg:'#fce4ec'},
  {id:'s4',name:'My Body 2',path:'games/grade1_science/Bodyparts/bodyparts2_opus.html',subj:'sci',icon:'🧠',bg:'#f3e5f5'},
  {id:'s5',name:'Face Builder',path:'games/grade1_science/Bodyparts/facebuilder_opus.html',subj:'sci',icon:'😊',bg:'#fff8e1'},
  {id:'s6',name:'Dino Dig Adventure',path:'games/grade1_science/dinosaurs_fossils/dinohatch_opus.html',subj:'sci',icon:'🦕',bg:'#efebe9'},
  {id:'s7',name:'Fossil Explorer',path:'games/grade1_science/dinosaurs_fossils/fossils_opus.html',subj:'sci',icon:'🦴',bg:'#efebe9'},
  {id:'s8',name:'Hatch the Dino Egg',path:'games/grade1_science/dinosaurs_fossils/hatcheggcolor_opus.html',subj:'sci',icon:'🥚',bg:'#e8f5e9'},
  {id:'s9',name:'Animal Home Explorer',path:'games/grade1_science/geography/geozones_opus.html',subj:'sci',icon:'🌍',bg:'#e0f7fa'},
  {id:'s10',name:'Habitat Match Quiz',path:'games/grade1_science/geography/quiz_opus.html',subj:'sci',icon:'🗺️',bg:'#e3f2fd'},
  {id:'s11',name:'Grow a Plant',path:'games/grade1_science/photosynthesis/plants_opus.html',subj:'sci',icon:'🌿',bg:'#e8f5e9'},
  {id:'s12',name:'My 5 Senses',path:'games/grade1_science/senses/hover_opus.html',subj:'sci',icon:'👃',bg:'#fff3e0'},
  {id:'s13',name:'Sense Explorer',path:'games/grade1_science/senses/senses_opus.html',subj:'sci',icon:'👂',bg:'#ede7f6'},
];

/* ═══ SVG CARD GENERATOR ═══ */
function gameCardSVG(game) {
  const colors = { math:'#ff6b4a', lang:'#4a90ff', sci:'#22c997' };
  const accent = colors[game.subj] || '#8b6cff';
  const bgLight = game.bg || '#f5f5f5';
  return `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg${game.id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgLight}"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity=".15"/>
    </linearGradient></defs>
    <rect width="120" height="80" rx="12" fill="url(#bg${game.id})"/>
    <rect x="2" y="2" width="116" height="76" rx="11" fill="none" stroke="${accent}" stroke-width=".5" opacity=".3"/>
    <text x="60" y="42" text-anchor="middle" font-size="30">${game.icon}</text>
    <circle cx="100" cy="14" r="8" fill="${accent}" opacity=".15"/>
    <circle cx="18" cy="68" r="5" fill="${accent}" opacity=".1"/>
  </svg>`;
}

/* ═══ SPLASH SCREEN (cow mascot) ═══ */
function showSplash() {
  const stars = Array.from({length:20}, (_,i) => {
    const x = Math.random()*100, y = Math.random()*100, d = (1+Math.random()*3).toFixed(1);
    return `<span style="left:${x}%;top:${y}%;animation-delay:${d}s"></span>`;
  }).join('');

  const cowSVG = `<svg width="140" height="160" viewBox="0 0 80 100">
    <path d="M22 22 Q18 10 24 14 Q26 16 24 22" fill="#e8c9a0" stroke="#bba" stroke-width=".5"/>
    <path d="M58 22 Q62 10 56 14 Q54 16 56 22" fill="#e8c9a0" stroke="#bba" stroke-width=".5"/>
    <ellipse cx="16" cy="28" rx="8" ry="5" fill="#f5f0e8" stroke="#3d2b1f" stroke-width=".5" transform="rotate(-20 16 28)"/>
    <ellipse cx="16" cy="28" rx="5" ry="3" fill="#ffb6c1" opacity=".4" transform="rotate(-20 16 28)"/>
    <ellipse cx="64" cy="28" rx="8" ry="5" fill="#f5f0e8" stroke="#3d2b1f" stroke-width=".5" transform="rotate(20 64 28)"/>
    <ellipse cx="64" cy="28" rx="5" ry="3" fill="#ffb6c1" opacity=".4" transform="rotate(20 64 28)"/>
    <ellipse cx="40" cy="36" rx="24" ry="22" fill="#f5f0e8"/>
    <ellipse cx="30" cy="24" rx="6" ry="4" fill="#3d2b1f" opacity=".6" transform="rotate(-15 30 24)"/>
    <ellipse cx="52" cy="26" rx="5" ry="3.5" fill="#3d2b1f" opacity=".5" transform="rotate(10 52 26)"/>
    <circle cx="44" cy="20" r="3" fill="#3d2b1f" opacity=".4"/>
    <ellipse cx="32" cy="32" rx="6" ry="6.5" fill="white"/>
    <ellipse cx="48" cy="32" rx="6" ry="6.5" fill="white"/>
    <circle cx="33" cy="32.5" r="4" fill="#2d1b00"/>
    <circle cx="47" cy="32.5" r="4" fill="#2d1b00"/>
    <circle cx="31.5" cy="31" r="1.8" fill="white"/>
    <circle cx="45.5" cy="31" r="1.8" fill="white"/>
    <ellipse cx="40" cy="44" rx="12" ry="9" fill="#ffb6c1" opacity=".7"/>
    <ellipse cx="36" cy="44" rx="2.5" ry="2" fill="#2d1b00" opacity=".3"/>
    <ellipse cx="44" cy="44" rx="2.5" ry="2" fill="#2d1b00" opacity=".3"/>
    <path d="M34 50 Q40 56 46 50" fill="none" stroke="#2d1b00" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="22" cy="40" rx="4" ry="2.5" fill="#ffaaaa" opacity=".5"/>
    <ellipse cx="58" cy="40" rx="4" ry="2.5" fill="#ffaaaa" opacity=".5"/>
    <ellipse cx="40" cy="70" rx="20" ry="18" fill="#f5f0e8"/>
    <ellipse cx="40" cy="75" rx="12" ry="11" fill="white" opacity=".25"/>
    <ellipse cx="32" cy="66" rx="5" ry="4" fill="#3d2b1f" opacity=".4" transform="rotate(-10 32 66)"/>
    <ellipse cx="50" cy="72" rx="4" ry="3" fill="#3d2b1f" opacity=".35"/>
    <circle cx="40" cy="58" r="4" fill="#ffd700" stroke="#cc9900" stroke-width=".8"/>
    <circle cx="40" cy="59" r="1.5" fill="#cc9900"/>
    <rect x="28" y="84" width="6" height="10" rx="3" fill="#f5f0e8"/>
    <rect x="46" y="84" width="6" height="10" rx="3" fill="#f5f0e8"/>
    <ellipse cx="31" cy="94" rx="4" ry="2" fill="#e8c9a0"/>
    <ellipse cx="49" cy="94" rx="4" ry="2" fill="#e8c9a0"/>
    <path d="M60 68 Q72 60 68 55" fill="none" stroke="#f5f0e8" stroke-width="2" stroke-linecap="round"/>
    <circle cx="68" cy="54" r="2.5" fill="#3d2b1f"/>
  </svg>`;

  const div = document.createElement('div');
  div.className = 'splash-screen';
  div.id = 'splash-screen';
  div.innerHTML = `
    <div class="splash-stars">${stars}</div>
    <div class="splash-cow" style="animation:creatureFloat 3s ease-in-out infinite,splashCowIn 1s .2s cubic-bezier(.34,1.56,.64,1) both">
      ${cowSVG}
    </div>
    <div class="splash-logo">mnmoo</div>
    <div class="splash-tagline">Learn · Play · Grow</div>
    <div class="splash-tap">tap anywhere to start</div>
  `;
  document.body.appendChild(div);

  const dismiss = () => {
    div.style.transition = 'opacity .5s ease';
    div.style.opacity = '0';
    setTimeout(() => { div.remove(); showShowcase(); }, 500);
  };
  // Auto-dismiss after 3.5s or on tap
  div.addEventListener('click', dismiss, { once: true });
  div.addEventListener('touchstart', dismiss, { once: true });
  setTimeout(() => { if (document.getElementById('splash-screen')) dismiss(); }, 3500);
}

/* ═══ SHOWCASE SCREEN ═══ */
function showShowcase() {
  const div = document.createElement('div');
  div.className = 'showcase-screen';
  div.id = 'showcase-screen';
  div.innerHTML = `
    <div class="showcase-title">What We Teach</div>
    <div class="showcase-sub">K–8 Education Made Fun</div>
    <div class="showcase-cards">
      <div class="sc-card math" data-i="0">
        <div class="sc-icon">🔢</div>
        <div class="sc-info"><h3>Mathematics</h3><p>Addition, subtraction, fractions, patterns, skip counting & more</p></div>
      </div>
      <div class="sc-card lang" data-i="1">
        <div class="sc-icon">📚</div>
        <div class="sc-info"><h3>Language Arts</h3><p>Sight words, spelling, verbs, plurals, compound words & reading</p></div>
      </div>
      <div class="sc-card sci" data-i="2">
        <div class="sc-icon">🔬</div>
        <div class="sc-info"><h3>Science</h3><p>Animals, body parts, dinosaurs, plants, senses & geography</p></div>
      </div>
      <div class="sc-card code" data-i="3">
        <div class="sc-icon">💻</div>
        <div class="sc-info"><h3>Coding (Coming Soon)</h3><p>Python basics, logic puzzles & computational thinking</p></div>
      </div>
    </div>
    <button class="showcase-next" onclick="dismissShowcase()">Let's Go! 🐄</button>
  `;
  document.body.appendChild(div);

  // Animate cards in sequence
  const cards = div.querySelectorAll('.sc-card');
  const btn = div.querySelector('.showcase-next');
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('show'), 200 + i * 250);
  });
  setTimeout(() => btn.classList.add('show'), 200 + cards.length * 250);
}

window.dismissShowcase = function() {
  const div = document.getElementById('showcase-screen');
  if (!div) return;
  div.style.transition = 'opacity .4s ease';
  div.style.opacity = '0';
  setTimeout(() => div.remove(), 400);
};

/* ═══ GAME GALLERY SCREEN ═══ */
let _galleryFilter = 'all';

function rGallery(el) {
  const filtered = _galleryFilter === 'all' ? GAME_CATALOG : GAME_CATALOG.filter(g => g.subj === _galleryFilter);
  const subjLabels = { math:'Math', lang:'Language', sci:'Science' };

  el.innerHTML = `<div class="screen si">
    ${typeof topBar === 'function' ? topBar() : ''}
    <div class="parent-bar">
      <div class="pb-avatar">🐄</div>
      <div class="pb-info">
        <div class="pb-name">Grade ${G.grade || 'K'} · ${G.totalPlayed} games played</div>
        <div class="pb-stats">🔥 ${G.dailyStreak || 0} day streak · ✅ ${G.totalCorrect || 0} correct answers</div>
      </div>
    </div>
    <div style="font-family:'Fredoka',sans-serif;font-size:20px;font-weight:700;color:var(--tx);margin:4px 0 2px;text-align:center">
      🎮 Games <span style="font-size:13px;color:var(--mu);font-weight:600">(${GAME_CATALOG.length})</span>
    </div>
    <div class="gallery-filters">
      <button class="gf-btn f-all ${_galleryFilter==='all'?'active':''}" onclick="setFilter('all')">✨ All</button>
      <button class="gf-btn f-math ${_galleryFilter==='math'?'active':''}" onclick="setFilter('math')">🔢 Math</button>
      <button class="gf-btn f-lang ${_galleryFilter==='lang'?'active':''}" onclick="setFilter('lang')">📚 Language</button>
      <button class="gf-btn f-sci ${_galleryFilter==='sci'?'active':''}" onclick="setFilter('sci')">🔬 Science</button>
    </div>
    <div class="game-grid">
      ${filtered.map(g => `
        <button class="game-card" onclick="launchGame('${g.path}')" id="gc-${g.id}">
          <div class="gc-visual">${gameCardSVG(g)}</div>
          <div class="gc-info">
            <div class="gc-name">${g.name}</div>
            <div class="gc-subj ${g.subj}">${subjLabels[g.subj] || g.subj}</div>
          </div>
        </button>
      `).join('')}
    </div>
    <div style="display:flex;gap:12px;margin-top:4px;align-items:center;flex-wrap:wrap;justify-content:center">
      <button class="back-btn" onclick="goHome()">← Home</button>
      <button class="back-btn" onclick="goMap()">🗺️ Quest Map</button>
      <button class="back-btn" onclick="goShop()">🛒 Shop</button>
    </div>
  </div>`;
}

window.setFilter = function(f) {
  _galleryFilter = f;
  rGallery(document.querySelector('#app'));
};

window.launchGame = function(path) {
  const wrap = document.createElement('div');
  wrap.className = 'game-iframe-wrap';
  wrap.id = 'game-iframe-wrap';
  wrap.innerHTML = `<iframe src="${path}" allow="autoplay"></iframe>`;
  document.body.appendChild(wrap);

  const btn = document.createElement('button');
  btn.className = 'game-iframe-back';
  btn.id = 'game-iframe-back';
  btn.innerHTML = '✕';
  btn.onclick = closeGameIframe;
  document.body.appendChild(btn);
};

window.closeGameIframe = function() {
  const wrap = document.getElementById('game-iframe-wrap');
  const btn = document.getElementById('game-iframe-back');
  if (wrap) wrap.remove();
  if (btn) btn.remove();
};

function goGallery() {
  G.scr = 'gallery';
  stopAmbience();
  rGallery(document.querySelector('#app'));
}
window.goGallery = goGallery;
