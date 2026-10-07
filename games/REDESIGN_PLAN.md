# Grade-1 Games Redesign Plan

## Overview

Redesign 51 self-contained HTML quiz games to share a consistent visual design system, add sound effects, and fix mobile issues. New files created alongside originals using `filename_opus.html` naming.

---

## Phase 0: Design System Template

Create a single reusable template snippet that every `_opus.html` game includes at the top of its `<style>` and `<script>` blocks. This is the foundation — no game work starts until this is done.

### Template CSS (paste into `<style>` after any game-specific CSS)

```css
/* ===== OPUS DESIGN SYSTEM ===== */
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:wght@400;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --opus-math:#FF6B4A;
  --opus-lang:#42A5F5;
  --opus-sci:#66BB6A;
  /* Set per-game: --opus-accent */
  --opus-bg-start:#FFF5F0;
  --opus-bg-end:#F0F4FF;
  --opus-card:#FFFFFF;
  --opus-card-radius:20px;
  --opus-card-shadow:0 8px 24px rgba(0,0,0,.10);
  --opus-text:#2D3436;
  --opus-text-light:#636E72;
  --opus-correct:#00C853;
  --opus-wrong:#FF5252;
  --opus-font-heading:'Fredoka',sans-serif;
  --opus-font-body:'Nunito',sans-serif;
}

html,body{
  width:100vw;height:100vh;height:100dvh;
  max-height:100vh;max-height:100dvh;
  overflow:hidden;margin:0;padding:0;
  touch-action:manipulation;
  -webkit-user-select:none;user-select:none;
  overscroll-behavior:none;
  font-family:var(--opus-font-body);
  background:linear-gradient(135deg,var(--opus-bg-start),var(--opus-bg-end));
  color:var(--opus-text);
}

/* Landscape scaling */
@media(orientation:landscape){
  html,body{font-size:min(16px,2.2vh)}
  h1{font-size:clamp(.9rem,3vh,1.5rem)!important}
  h2{font-size:clamp(.8rem,2.5vh,1.2rem)!important}
  button,.btn{padding:min(6px,1.2vh) min(14px,3vw)!important;font-size:clamp(.7rem,2vh,1rem)!important}
}

.opus-card{
  background:var(--opus-card);
  border-radius:var(--opus-card-radius);
  box-shadow:var(--opus-card-shadow);
  padding:20px;
}

.opus-btn{
  font-family:var(--opus-font-heading);
  font-weight:600;
  border:none;border-radius:14px;
  padding:12px 24px;
  cursor:pointer;
  transition:transform .15s cubic-bezier(.175,.885,.32,1.275),box-shadow .15s;
  box-shadow:0 4px 0 rgba(0,0,0,.15);
}
.opus-btn:active{transform:translateY(2px);box-shadow:0 2px 0 rgba(0,0,0,.15)}

/* Accent variants — set via class on game container */
.opus-math{--opus-accent:var(--opus-math)}
.opus-lang{--opus-accent:var(--opus-lang)}
.opus-sci{--opus-accent:var(--opus-sci)}

/* Animations */
@keyframes opus-pop-in{
  0%{opacity:0;transform:scale(.7)}
  60%{transform:scale(1.08)}
  100%{opacity:1;transform:scale(1)}
}
@keyframes opus-shake{
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-8px)}
  40%{transform:translateX(8px)}
  60%{transform:translateX(-5px)}
  80%{transform:translateX(5px)}
}
@keyframes opus-confetti{
  0%{transform:translateY(0) rotate(0deg);opacity:1}
  100%{transform:translateY(-120vh) rotate(720deg);opacity:0}
}
.opus-pop{animation:opus-pop-in .4s cubic-bezier(.175,.885,.32,1.275) both}
.opus-shake{animation:opus-shake .45s ease}
/* ===== END OPUS DESIGN SYSTEM ===== */
```

### Template JS (paste into `<script>` before game logic)

```javascript
/* ===== OPUS AUDIO ENGINE ===== */
const OpusAudio = (() => {
  let ctx;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, dur, type = 'sine', vol = 0.3) {
    const c = getCtx(), o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.connect(g).connect(c.destination);
    o.start(); o.stop(c.currentTime + dur);
  }
  return {
    click()  { tone(800, 0.08, 'sine', 0.2) },
    correct(){ tone(880, 0.1); setTimeout(() => tone(1100, 0.15), 100) },
    wrong()  { tone(200, 0.3, 'sawtooth', 0.15) },
    win()    {
      [523,659,784,1047].forEach((f,i) => setTimeout(() => tone(f, 0.2, 'sine', 0.25), i*120));
    },
    pop()    { tone(600, 0.06, 'sine', 0.15) },
  };
})();

/* ===== OPUS CONFETTI ===== */
function opusConfetti(container, count = 30) {
  const colors = ['#FF6B4A','#42A5F5','#66BB6A','#FFD54F','#AB47BC','#FF7043'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    Object.assign(el.style, {
      position: 'fixed', width: '10px', height: '10px',
      background: colors[i % colors.length],
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      left: Math.random() * 100 + 'vw',
      top: '100vh',
      pointerEvents: 'none', zIndex: '9999',
      animation: `opus-confetti ${1.5 + Math.random()}s ease-out ${Math.random() * 0.5}s forwards`
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }
}
/* ===== END OPUS AUDIO & CONFETTI ===== */
```

### Per-Game Setup Checklist

Each `_opus.html` file must:
1. Set `--opus-accent` via class on container: `<div class="opus-card opus-math">` (or `opus-lang` / `opus-sci`)
2. Call `OpusAudio.click()` on every button tap
3. Call `OpusAudio.correct()` / `OpusAudio.wrong()` on answer feedback
4. Call `OpusAudio.win()` + `opusConfetti()` on game completion
5. Use `.opus-pop` class when showing new elements (questions, cards)
6. Use `.opus-shake` class on wrong answer elements, remove after animation ends
7. Use `Fredoka` for headings (`h1`, `h2`, buttons), `Nunito` for body text
8. Remove all `<!-- rotate your device -->` HTML fragments
9. Remove the entire `MOBILE LANDSCAPE FIX` block (replaced by opus landscape rules)

---

## Phase 1: Pilot Game (1 game)

Build one complete `_opus.html` game end-to-end to validate the template, then use it as the visual reference for all others.

**Pilot:** `grade1_math/compare/whackmole_opus.html`
- Simple game (2 moles, compare numbers)
- Already has clean JS logic (lines 374-447)
- Good test: inline SVGs, click handling, score tracking

**Deliverable:** Fully working pilot with design system, sounds, confetti, landscape scaling.

---

## Phase 2: Math Games (20 games, 6 batches)

Subject accent: `opus-math` (`--opus-math: #FF6B4A`)

### Batch M1 — Compare (3 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `compare/whackmole.html` | `whackmole_opus.html` | Two-mole number comparison | **Pilot — done in Phase 1** |
| `compare/feedmonster.html` | `feedmonster_opus.html` | Feed monster bigger/smaller number | Keep monster SVGs, replace CSS |
| `compare/catchfish.html` | `catchfish_opus.html` | Catch heavier fish | Keep fish SVGs + drag logic |

### Batch M2 — Ordering (4 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `ordering/catchthestar.html` | `catchthestar_opus.html` | Catch falling stars in order | Keep star animation + ordering logic |
| `ordering/connectdots.html` | `connectdots_opus.html` | Connect dots in sequence | Keep dot positions + line-drawing JS |
| `ordering/feedgarden.html` | `feedgarden_opus.html` | Feed garden in order | Keep drag-drop logic |
| `ordering/magicpuzzle.html` | `magicpuzzle_opus.html` | Number slider puzzle | Keep tile positions + swap logic |

### Batch M3 — Pattern Match (5 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `patternmatch/ballonpop.html` | `ballonpop_opus.html` | Pop balloons matching pattern | Keep balloon SVGs + pattern logic |
| `patternmatch/dominos.html` | `dominos_opus.html` | Build domino patterns | Keep domino SVGs + pattern sequences |
| `patternmatch/rhythm.html` | `rhythm_opus.html` | Tap rhythm patterns | Keep rhythm sequence + timing logic |
| `patternmatch/shapegarden.html` | `shapegarden_opus.html` | Shape pattern garden | Keep shape SVGs + pattern logic |
| `patternmatch/trafficlights.html` | `trafficlights_opus.html` | Traffic light sequences | Keep light SVGs + sequence logic |

### Batch M4 — Add/Subtract (4 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `addsubtract/addsubtract.html` | `addsubtract_opus.html` | Firefly addition | Keep firefly SVGs + math logic |
| `addsubtract/bowling.html` | `bowling_opus.html` | Penguin bowling | Keep penguin SVGs + pin logic |
| `addsubtract/bubblebath.html` | `bubblebath_opus.html` | Bubble bath splash | Keep bubble animations + math |
| `addsubtract/catchfish.html` | `catchfish_opus.html` | Fishing subtraction | Keep fish SVGs + subtraction logic |

### Batch M5 — Skip Counting (2 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `skipcounting/catchstars.html` | `catchstars_opus.html` | Catch falling stars skip counting | Keep star logic + skip sequence |
| `skipcounting/lilypadjump.html` | `lilypadjump_opus.html` | Lily pad jump | Keep frog SVGs + pad positions |

### Batch M6 — Fractions (2 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `fractions/mixlab.html` | `mixlab_opus.html` | Color mixing lab | Keep color mixing logic + SVGs |
| `fractions/pizzafraction.html` | `pizzafraction_opus.html` | Pizza fractions | Keep pizza SVG slices + fraction logic |

---

## Phase 3: Language Games (18 games, 5 batches)

Subject accent: `opus-lang` (`--opus-lang: #42A5F5`)

### Batch L1 — Sight Words (2 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `sight_words/balloon_pop.html` | `balloon_pop_opus.html` | Pop balloon with target word | Keep word list + balloon logic |
| `sight_words/sighword_pop.html` | `sighword_pop_opus.html` | Sight word pop | Keep word sets + pop mechanics |

### Batch L2 — Word Spelling (4 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `word_spelling/spelling_master.html` | `spelling_master_opus.html` | Spelling master quiz | Keep word data + letter input |
| `word_spelling/spelling_bee.html` | `spelling_bee_opus.html` | Spelling bee | Keep word list + letter tiles |
| `word_spelling/pop_balloon.html` | `pop_balloon_opus.html` | Pop balloon spelling | Keep balloon + word logic |
| `word_spelling/frog_hopper_spelling.html` | `frog_hopper_spelling_opus.html` | Frog hopper spelling | Keep frog SVGs + spelling logic |

### Batch L3 — Compound Words & Contractions (4 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `compound_words/word_factory.html` | `word_factory_opus.html` | Word factory compound words | Keep word data + assembly logic |
| `compound_words/train_word.html` | `train_word_opus.html` | Train word builder | Keep train SVGs + word logic |
| `contractions/monster.html` | `monster_opus.html` | Monster contractions | Keep monster SVGs + contraction data |
| `contractions/balloon_pop.html` | `balloon_pop_opus.html` | Balloon pop contractions | Keep contraction data + balloon logic |

### Batch L4 — Grammar (Verbs, Nouns, Adjectives, Plurals) (6 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `verbs/magic_potion.html` | `magic_potion_opus.html` | Magic potion verbs | Keep potion SVGs + verb data |
| `verbs/frog_hopper.html` | `frog_hopper_opus.html` | Frog hopper verbs | Keep frog SVGs + verb logic |
| `nouns_adjectives/whack_a_mole.html` | `whack_a_mole_opus.html` | Whack-a-mole nouns/adj | Keep mole SVGs + word data |
| `nouns_adjectives/cosmos.html` | `cosmos_opus.html` | Cosmos nouns/adj | Keep space SVGs + word data |
| `plurals/ocean.html` | `ocean_opus.html` | Ocean plurals | Keep ocean SVGs + plural data |
| `plurals/guess.html` | `guess_opus.html` | Guess plurals | Keep guess logic + word data |

### Batch L5 — Reading (2 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `reading_basics/readingbasic.html` | `readingbasic_opus.html` | Reading basics 1 | Keep passage data + quiz logic |
| `reading_basics/readingbasics2.html` | `readingbasics2_opus.html` | Reading basics 2 | Keep passage data + quiz logic |

---

## Phase 4: Science Games (13 games, 4 batches)

Subject accent: `opus-sci` (`--opus-sci: #66BB6A`)

### Batch S1 — Animals (2 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `animals/identify.html` | `identify_opus.html` | Animal identification | Keep animal SVGs + quiz data |
| `animals/catchfireflies.html` | `catchfireflies_opus.html` | Catch fireflies animal facts | Keep firefly SVGs + animal data |

### Batch S2 — Body Parts & Face Builder (3 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `Bodyparts/bodyparts.html` | `bodyparts_opus.html` | Body parts quiz | Keep body SVGs + part labels |
| `Bodyparts/bodyparts2.html` | `bodyparts2_opus.html` | Body parts quiz 2 | Keep body SVGs + quiz data |
| `Bodyparts/facebuilder.html` | **`facebuilder_opus.html`** | **NEW: Actual face builder** | **Full redesign** — drag-and-drop face parts (eyes, nose, mouth, ears, hair) onto a face outline. Current file is a geography quiz misnamed. |

### Batch S3 — Dinosaurs & Geography (5 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `dinosaurs_fossils/dinohatch.html` | `dinohatch_opus.html` | Dino egg hatch | Keep egg SVGs + hatch animation |
| `dinosaurs_fossils/fossils.html` | `fossils_opus.html` | Fossil dig | Keep dig mechanics + fossil SVGs |
| `dinosaurs_fossils/hatcheggcolor.html` | `hatcheggcolor_opus.html` | Hatch egg by color | Keep color matching + egg SVGs |
| `geography/geozones.html` | `geozones_opus.html` | Geography zones | Keep zone SVGs + quiz data |
| `geography/quiz.html` | `quiz_opus.html` | Geography quiz | Keep quiz data + map SVGs |

### Batch S4 — Photosynthesis & Senses (3 games)
| Original | Opus File | Game Type | Notes |
|----------|-----------|-----------|-------|
| `photosynthesis/plants.html` | `plants_opus.html` | Photosynthesis quiz | Keep plant SVGs + science data |
| `senses/senses.html` | `senses_opus.html` | 5 senses quiz | Keep sense SVGs + quiz data |
| `senses/hover.html` | **`hover_opus.html`** | **FIXED: Tap-based senses** | **Replace hover with tap** — `.card:hover` animations become `.card.tapped` toggled via JS touch events. All 5 sense cards become tap-to-activate. |

---

## Phase 5: Quality Pass & Cleanup

1. Test all 51 `_opus.html` files in Android WebView (Capacitor)
2. Verify landscape scaling on common resolutions (1920x1080, 2560x1080, 1280x720)
3. Verify all sounds play (Web Audio requires user gesture to unlock)
4. Remove old `MOBILE LANDSCAPE FIX` blocks from `_opus` files if any leaked
5. Verify no `<!-- rotate your device -->` fragments remain

---

## Execution Strategy

### Parallelization

- **Phase 0** (template): 1 person, ~1 hour
- **Phase 1** (pilot): 1 person, ~2 hours
- **Phases 2-4** (51 games): Each batch is independent — batches can run in parallel across agents

### Per-Game Workflow (15-30 min each)

1. Copy original `foo.html` → `foo_opus.html`
2. Replace `<style>` contents: insert opus design system template, keep only game-specific layout CSS (element positioning, game-board geometry)
3. Delete the `MOBILE LANDSCAPE FIX` block entirely
4. Delete any `<!-- rotate device -->` HTML fragments
5. Replace font references with Fredoka/Nunito
6. Add `opus-math`/`opus-lang`/`opus-sci` class to main container
7. Wrap content cards in `.opus-card`, buttons in `.opus-btn`
8. Add `OpusAudio.correct()` / `OpusAudio.wrong()` / `OpusAudio.click()` calls to JS
9. Add `opusConfetti()` call at win state
10. Add `.opus-pop` to elements that appear (questions, new cards)
11. Test in browser at landscape mobile dimensions

### What to KEEP vs REPLACE per game

| Keep | Replace |
|------|---------|
| All game logic (JS functions, data arrays, scoring) | All CSS (replaced by opus design system) |
| SVG graphics and inline HTML structure | Font declarations (→ Fredoka/Nunito) |
| Game-specific layout CSS (absolute positions, grid layouts for game boards) | Color definitions (→ opus palette) |
| Quiz content / word lists / math problems | The entire MOBILE LANDSCAPE FIX block |
| Screen state management JS | Button styles (→ .opus-btn) |
| Touch/click event handlers | Background gradients (→ opus gradient) |
| Animation keyframes specific to game characters | Typography styles (→ opus typography) |

---

## Special Cases

### `senses/hover.html` → `hover_opus.html`
- Replace all `.card:hover` CSS with `.card.tapped` class toggling
- Add `touchstart` / `click` event listeners that toggle `.tapped` class
- Remove `.tapped` from other cards when one is tapped (accordion behavior)
- Keep all SVG art and sense descriptions

### `Bodyparts/facebuilder.html` → `facebuilder_opus.html`
- **Complete rewrite** — current file is "Geo-Explorer: Habitat Match!" (a geography quiz)
- New game: drag-and-drop face builder
  - Canvas area with blank face outline
  - Parts tray: eyes, nose, mouth, ears, hair (SVG pieces)
  - Tap part in tray → it snaps to correct position on face
  - All parts placed → confetti + "You built a face!"
- Move current geography quiz content to `geography/facebuilder_opus.html` if the quiz content is valuable, or just leave the original intact

---

## File Count Summary

| Subject | Games | Batch Count |
|---------|-------|-------------|
| Math | 20 | 6 batches |
| Language | 18 | 5 batches |
| Science | 13 | 4 batches |
| **Total** | **51** | **15 batches + 1 pilot** |
