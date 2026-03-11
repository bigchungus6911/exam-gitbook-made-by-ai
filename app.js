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

  card.innerHTML = `
    <div class="card-header">
      <div class="done-check${isDone}" data-name="${ex.name}">${checkMark}</div>
      <div class="card-info">
        <div class="card-name">${ex.name}</div>
        <div class="card-subject">${ex.subject.substring(0, 80)}...</div>
      </div>
      <span class="level-tag l${ex.level}">Lvl ${ex.level}</span>
      <span class="expand-icon">▼</span>
    </div>
    <div class="card-body">
      <div class="card-body-inner">
        <div class="section">
          <div class="section-title">📋 Subject</div>
          <p>${ex.subject}</p>
        </div>
        <div class="section">
          <div class="section-title">🧠 What You Learn</div>
          <p>${ex.learn}</p>
        </div>
        <div class="section">
          <div class="section-title">💻 Solution</div>
          <div class="code-block">
            <div class="code-header">
              <span>${ex.name}.c</span>
              <button class="copy-btn" data-code="${encodeURIComponent(ex.code)}">📋 Copy</button>
            </div>
            <pre><code>${highlightC(escapeHtml(ex.code))}</code></pre>
          </div>
        </div>
        <div class="section">
          <div class="section-title">📖 Explanation</div>
          <p>${ex.explanation.replace(/\n/g, '<br>')}</p>
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

  // Copy button
  const copyBtn = card.querySelector('.copy-btn');
  copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const code = decodeURIComponent(copyBtn.dataset.code);
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => copyBtn.textContent = '📋 Copy', 1500);
    });
  });

  return card;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightC(code) {
  // Simple syntax highlighting
  code = code.replace(/(\/\/.*)/g, '<span class="cmt">$1</span>');
  code = code.replace(/(#include\s+)(&lt;[^&]*&gt;|"[^"]*")/g, '<span class="pp">$1</span><span class="inc">$2</span>');
  code = code.replace(/\b(typedef|struct|int|char|void|unsigned|long|size_t|static|const|return|if|else|while|break)\b/g, '<span class="kw">$1</span>');
  code = code.replace(/\b(write|malloc|free|printf|atoi)\b/g, '<span class="fn">$1</span>');
  code = code.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  code = code.replace(/(&#39;[^&#]*&#39;|"[^"]*")/g, '<span class="str">$1</span>');
  return code;
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
    const rank = parseInt(tab.dataset.rank);
    if (rank === 2) selectRank(2);
    else selectRank(rank);
  });
});

// ===== INIT =====
render();