// ===== APP LOGIC =====

// State
let currentLevel = 'all';
let searchQuery = '';
let done = JSON.parse(localStorage.getItem('exam42done') || '{}');

// DOM references
const exercisesEl = document.getElementById('exercises');
const searchEl = document.getElementById('search');
const noResultsEl = document.getElementById('no-results');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const rank2Content = document.getElementById('rank2-content');
const comingSoon = document.getElementById('coming-soon');

// ===== SYNTAX HIGHLIGHTING (token-based, no regex conflicts) =====
function highlightC(rawCode) {
  const keywords = new Set([
    'typedef','struct','int','char','void','unsigned','long','size_t',
    'static','const','return','if','else','while','break','NULL'
  ]);
  const builtins = new Set(['write','malloc','free','printf','atoi']);

  let result = '';
  let i = 0;

  while (i < rawCode.length) {
    // Line comments
    if (rawCode[i] === '/' && rawCode[i + 1] === '/') {
      let end = rawCode.indexOf('\n', i);
      if (end === -1) end = rawCode.length;
      result += '<span class="cmt">' + esc(rawCode.slice(i, end)) + '</span>';
      i = end;
      continue;
    }
    // Preprocessor (#include, #define)
    if (rawCode[i] === '#') {
      let end = rawCode.indexOf('\n', i);
      if (end === -1) end = rawCode.length;
      let line = rawCode.slice(i, end);
      // Highlight the #include and the path separately
      let m = line.match(/^(#\s*include\s+)(<[^>]+>|"[^"]+")(.*)/);
      if (m) {
        result += '<span class="pp">' + esc(m[1]) + '</span><span class="inc">' + esc(m[2]) + '</span>' + esc(m[3]);
      } else {
        result += '<span class="pp">' + esc(line) + '</span>';
      }
      i = end;
      continue;
    }
    // Strings
    if (rawCode[i] === '"') {
      let j = i + 1;
      while (j < rawCode.length && rawCode[j] !== '"') {
        if (rawCode[j] === '\\') j++;
        j++;
      }
      j++; // include closing quote
      result += '<span class="str">' + esc(rawCode.slice(i, j)) + '</span>';
      i = j;
      continue;
    }
    // Char literals
    if (rawCode[i] === "'") {
      let j = i + 1;
      while (j < rawCode.length && rawCode[j] !== "'") {
        if (rawCode[j] === '\\') j++;
        j++;
      }
      j++;
      result += '<span class="str">' + esc(rawCode.slice(i, j)) + '</span>';
      i = j;
      continue;
    }
    // Numbers
    if (rawCode[i] >= '0' && rawCode[i] <= '9' &&
        (i === 0 || !isIdChar(rawCode[i - 1]))) {
      let j = i;
      while (j < rawCode.length && ((rawCode[j] >= '0' && rawCode[j] <= '9') ||
             rawCode[j] === 'x' || rawCode[j] === 'X' ||
             (rawCode[j] >= 'a' && rawCode[j] <= 'f') ||
             (rawCode[j] >= 'A' && rawCode[j] <= 'F'))) j++;
      result += '<span class="num">' + esc(rawCode.slice(i, j)) + '</span>';
      i = j;
      continue;
    }
    // Identifiers & keywords
    if (isIdStart(rawCode[i])) {
      let j = i;
      while (j < rawCode.length && isIdChar(rawCode[j])) j++;
      let word = rawCode.slice(i, j);
      if (keywords.has(word))
        result += '<span class="kw">' + esc(word) + '</span>';
      else if (builtins.has(word))
        result += '<span class="fn">' + esc(word) + '</span>';
      else
        result += esc(word);
      i = j;
      continue;
    }
    // Everything else (operators, braces, whitespace)
    result += esc(rawCode[i]);
    i++;
  }
  return result;
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function isIdStart(c) { return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_'; }
function isIdChar(c) { return isIdStart(c) || (c >= '0' && c <= '9'); }

// ===== RENDER =====
function render() {
  const filtered = exercises.filter(ex => {
    const matchLevel = currentLevel === 'all' || ex.level == currentLevel;
    const matchSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchSearch;
  });

  exercisesEl.innerHTML = '';
  if (filtered.length === 0) {
    noResultsEl.classList.remove('hidden');
  } else {
    noResultsEl.classList.add('hidden');
    filtered.forEach(ex => exercisesEl.appendChild(createCard(ex)));
  }
  updateCounts();
  updateProgress();
}

function createCard(ex) {
  const card = document.createElement('div');
  card.className = 'exercise-card' + (done[ex.name] ? ' done' : '');

  const isDone = done[ex.name] ? ' checked' : '';
  const checkMark = done[ex.name] ? '✓' : '';

  // Highlight code BEFORE inserting into DOM (raw code, not escaped)
  const highlightedCode = highlightC(ex.code);

  card.innerHTML = `
    <div class="card-header">
      <div class="done-check${isDone}" data-name="${ex.name}">${checkMark}</div>
      <div class="card-info">
        <div class="card-name">${esc(ex.name)}</div>
        <div class="card-subject">${esc(ex.subject.substring(0, 80))}...</div>
      </div>
      <span class="level-tag l${ex.level}">Lvl ${ex.level}</span>
      <span class="expand-icon">▼</span>
    </div>
    <div class="card-body">
      <div class="card-body-inner">
        <div class="section">
          <div class="section-title">📋 Subject</div>
          <p>${esc(ex.subject)}</p>
        </div>
        <div class="section">
          <div class="section-title">🧠 What You Learn</div>
          <p>${esc(ex.learn)}</p>
        </div>
        <div class="section">
          <div class="section-title">💻 Solution</div>
          <div class="code-block">
            <div class="code-header">
              <span>${esc(ex.name)}.c</span>
              <button class="copy-btn">📋 Copy</button>
            </div>
            <pre><code>${highlightedCode}</code></pre>
          </div>
        </div>
        <div class="section">
          <div class="section-title">📖 Explanation</div>
          <p>${esc(ex.explanation).replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    </div>`;

  // Toggle expand
  const header = card.querySelector('.card-header');
  header.addEventListener('click', (e) => {
    if (e.target.closest('.done-check')) return;
    card.classList.toggle('open');
    const body = card.querySelector('.card-body');
    if (card.classList.contains('open')) {
      body.style.maxHeight = body.scrollHeight + 'px';
    } else {
      body.style.maxHeight = '0';
    }
  });

  // Toggle done
  const check = card.querySelector('.done-check');
  check.addEventListener('click', (e) => {
    e.stopPropagation();
    const name = check.dataset.name;
    done[name] = !done[name];
    localStorage.setItem('exam42done', JSON.stringify(done));
    if (done[name]) {
      check.classList.add('checked');
      check.textContent = '✓';
      card.classList.add('done');
    } else {
      check.classList.remove('checked');
      check.textContent = '';
      card.classList.remove('done');
    }
    updateProgress();
  });

  // Copy button — use raw code, not highlighted HTML
  const copyBtn = card.querySelector('.copy-btn');
  copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ex.code).then(() => {
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => copyBtn.textContent = '📋 Copy', 1500);
    });
  });

  return card;
}

function updateCounts() {
  document.getElementById('count-all').textContent = `(${exercises.length})`;
  [1, 2, 3, 4].forEach(l => {
    document.getElementById(`count-${l}`).textContent = `(${exercises.filter(e => e.level === l).length})`;
  });
}

function updateProgress() {
  const total = exercises.length;
  const completed = Object.values(done).filter(Boolean).length;
  const pct = total > 0 ? (completed / total * 100) : 0;
  progressFill.style.width = pct + '%';
  progressText.textContent = `${completed} / ${total}`;
}

// ===== EVENT LISTENERS =====

// Level buttons
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLevel = btn.dataset.level;
    render();
  });
});

// Search
searchEl.addEventListener('input', () => {
  searchQuery = searchEl.value;
  render();
});

// Rank tabs
function selectRank(rank) {
  document.querySelectorAll('.rank-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.rank-tab[data-rank="${rank}"]`).classList.add('active');
  if (rank === 2) {
    rank2Content.classList.remove('hidden');
    comingSoon.classList.add('hidden');
  } else {
    rank2Content.classList.add('hidden');
    comingSoon.classList.remove('hidden');
  }
}
window.selectRank = selectRank;

document.querySelectorAll('.rank-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    selectRank(parseInt(tab.dataset.rank));
  });
});

// ===== INIT =====
render();