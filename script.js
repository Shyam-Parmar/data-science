/* SCRIPT.JS — renders PORTFOLIO_DATA into the page, then wires up animations. */

function linkHTML(l) {
  const target = l.external ? ' target="_blank" rel="noopener"' : '';
  const download = l.download ? ' download' : '';
  return `<a href="${l.href}"${target}${download}>${l.label}</a>`;
}

function render() {
  const d = PORTFOLIO_DATA;

  document.getElementById('navMark').textContent = d.navName.toUpperCase();
  document.title = `${d.navName} — Data Scientist`;

  document.getElementById('heroName').textContent = d.hero.name;
  document.getElementById('heroTitle').textContent = d.hero.title;
  document.getElementById('heroTagline').innerHTML = d.hero.tagline;
  document.getElementById('heroSub').textContent = d.hero.sub;

  document.getElementById('kpiStrip').innerHTML = d.kpis.map(k => `
    <div class="kpi">
      <div class="num" data-target="${k.target}" data-suffix="${k.suffix}">0${k.suffix}</div>
      <div class="label">${k.label}</div>
    </div>`).join('');

  document.getElementById('aboutHeading').textContent = d.about.heading;
  document.getElementById('aboutBody').innerHTML = d.about.body.map(p => `<p class="body-copy">${p}</p>`).join('');

  document.getElementById('timelineItems').innerHTML = d.timeline.map(t => `
    <div class="t-item">
      <div class="t-dot"></div>
      <div class="t-date">${t.date}</div>
      <div class="t-role">${t.role}</div>
      <div class="t-org">${t.org}</div>
      <div class="t-desc">${t.desc}</div>
    </div>`).join('');

  document.getElementById('skillsGrid').innerHTML = d.skills.map((s, i) => `
    <div class="skill-cell">
      <div class="cat">${s.category}</div>
      <div class="radar-wrap"><canvas id="radar-${i}"></canvas></div>
      <ul>${s.items.map(it => `<li>${it}</li>`).join('')}</ul>
    </div>`).join('');

  const projLink = document.getElementById('projectsLink');
  projLink.textContent = d.projectsLink.label;
  projLink.href = d.projectsLink.href;

  document.getElementById('projGrid').innerHTML = d.projects.map(p => `
    <div class="proj-card">
      <div><div class="proj-name">${p.name}</div><div class="proj-desc">${p.desc}</div></div>
      <div class="proj-tag">${p.tag}</div>
    </div>`).join('');

  document.getElementById('contactHeading').textContent = d.contact.heading;
  document.getElementById('contactLinks').innerHTML = d.contact.links.map(linkHTML).join('');

  document.getElementById('footerLeft').textContent = d.footer.left;
  document.getElementById('footerRight').textContent = d.footer.right;
}

// Chart rendering is isolated so a missing/blocked Chart.js library never breaks the rest of the page.
function renderSkillCharts() {
  if (typeof Chart === 'undefined') return;
  PORTFOLIO_DATA.skills.forEach((s, i) => {
    const ctx = document.getElementById(`radar-${i}`);
    if (!ctx || !s.levels) return;
    try {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: s.items,
          datasets: [{
            data: s.levels,
            borderColor: '#1F4CF5',
            backgroundColor: 'rgba(31,76,245,0.10)',
            borderWidth: 1.5,
            pointRadius: 2,
            pointBackgroundColor: '#1F4CF5'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              min: 0, max: 100,
              ticks: { display: false },
              grid: { color: '#E6E3DA' },
              angleLines: { color: '#E6E3DA' },
              pointLabels: { font: { family: 'JetBrains Mono', size: 9 }, color: '#6B7280' }
            }
          }
        }
      });
    } catch (e) {
      console.warn('Skill chart failed to render:', e);
    }
  });
}

function initInteractions() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

  const heroInner = document.getElementById('heroInner');
  function updateHero() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const progress = Math.min(y / (vh * 0.9), 1);
    heroInner.style.transform = `scale(${1 - progress * 0.12})`;
    heroInner.style.opacity = Math.max(1 - progress * 1.1, 0);
  }
  window.addEventListener('scroll', updateHero);
  updateHero();

  const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      const numEl = entry.target.querySelector('.num');
      const target = parseInt(numEl.dataset.target, 10);
      const suffix = numEl.dataset.suffix;
      let cur = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        cur += step;
        numEl.textContent = (cur >= target ? target : cur) + suffix;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
      kpiObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.kpi').forEach(k => kpiObserver.observe(k));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal', 'active');
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.t-item').forEach(i => revealObserver.observe(i));

  const track = document.querySelector('.timeline-track');
  const progressEl = document.getElementById('tProgress');
  function updateTimelineProgress() {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const visible = Math.min(Math.max(vh * 0.7 - rect.top, 0), total);
    progressEl.style.height = (total > 0 ? (visible / total) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateTimelineProgress);
  updateTimelineProgress();

}

render();
initInteractions();
if (document.readyState === 'complete') {
  renderSkillCharts();
} else {
  window.addEventListener('load', renderSkillCharts);
}
