/* ============================================================
   main.js — renders everything from SITE (js/data.js)
   Sections: render → animations → neural net canvas → easter eggs
   ============================================================ */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ------------------------------------------------------------
   1. RENDER FROM DATA
   ------------------------------------------------------------ */
function renderAll() {
  $("#year").textContent = new Date().getFullYear();
  $("#model-name").textContent = SITE.meta.modelVersion;
  $("#hero-role").innerHTML =
    `<strong>${SITE.meta.role}</strong> · ${SITE.meta.tagline}`;
  $("#resume-btn-hero").href = SITE.contact.resume;
  $("#gh-link-inline").href = SITE.contact.github;

  // About
  $("#about-text").innerHTML = SITE.about.paragraphs
    .map((p, i) => `<p class="reveal rise delay-${Math.min(i, 3)}">${p}</p>`)
    .join("");
  $("#about-facts").innerHTML = SITE.about.facts
    .map(f => `<div class="fact"><span class="k">${f.label}</span><span class="v">${f.value}</span></div>`)
    .join("");
  $("#about-facts").classList.add("reveal", "slide-r");

  // KPIs
  $("#kpi-grid").innerHTML = SITE.kpis
    .map((k, i) => `
      <div class="kpi reveal zoom delay-${i % 3}">
        <div class="kpi-value mono" data-value="${k.value}" data-prefix="${k.prefix || ""}" data-suffix="${k.suffix || ""}" data-decimals="${k.decimals || 0}">0</div>
        <div class="kpi-label">${k.label}</div>
      </div>`)
    .join("");

  // Experience timeline
  $("#timeline").innerHTML = SITE.experience
    .map((e, i) => `
      <div class="t-item reveal ${i % 2 ? "slide-r" : "slide-l"}">
        <div class="t-card">
          <div class="t-head">
            <div>
              <div class="t-role">${e.role}${e.current ? '<span class="t-current">ACTIVE</span>' : ""}</div>
              <div class="t-org">${e.org} · ${e.location}</div>
            </div>
            <div class="t-period">${e.period}</div>
          </div>
          <ul>${e.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
          <div class="t-tags">${e.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        </div>
      </div>`)
    .join("");

  $("#education").innerHTML = SITE.education
    .map(ed => `
      <div class="edu-card">
        <div class="deg">${ed.degree}</div>
        <div class="sch mono">${ed.school} · ${ed.year}</div>
      </div>`)
    .join("");

  // Skills radar cards
  $("#radar-grid").innerHTML = SITE.skills
    .map((s, i) => `
      <div class="radar-card reveal zoom delay-${i % 2}">
        <h3>${s.category}</h3>
        <canvas id="radar-${i}" role="img" aria-label="Radar chart of ${s.category} skills"></canvas>
      </div>`)
    .join("");

  // Contact
  const c = SITE.contact;
  const cards = [
    { k: "email", v: c.email, href: `mailto:${c.email}` },
    { k: "github", v: "@" + c.githubUser, href: c.github },
    { k: "linkedin", v: "shyambparmar", href: c.linkedin },
    { k: "medium blog", v: "read my writing", href: c.medium },
    { k: "resume", v: "download PDF", href: c.resume, dl: true },
  ];
  $("#contact-grid").innerHTML = cards
    .map((x, i) => `
      <a class="contact-card reveal rise delay-${i % 3}" href="${x.href}" ${x.dl ? "download" : 'target="_blank" rel="noopener"'}>
        <div class="c-k">${x.k}</div>
        <div class="c-v">${x.v}</div>
      </a>`)
    .join("");
}

/* ------------------------------------------------------------
   2. HERO: name decode + rotating inference line
   ------------------------------------------------------------ */
function heroEffects() {
  const nameEl = $("#hero-name");
  const target = SITE.meta.name;
  if (reduceMotion) {
    nameEl.textContent = target;
  } else {
    const chars = "01<>/{}[]#$%&*+=?";
    let frame = 0;
    const total = 34;
    (function decode() {
      frame++;
      nameEl.textContent = target
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          const settle = (i + 1) * (total / target.length) * 0.8;
          return frame > settle ? ch : chars[(Math.random() * chars.length) | 0];
        })
        .join("");
      if (frame < total) requestAnimationFrame(decode);
      else nameEl.textContent = target;
    })();
  }

  const lines = [
    'predict(role="data_scientist") → confidence: 0.98',
    "forward_pass(scroll) → rendering sections…",
    "fit(curiosity, coffee) → converged in 3 epochs",
    'query("best decision?") → "keep scrolling"',
  ];
  const el = $("#inference-line");
  let li = 0;
  function typeLine() {
    const text = lines[li % lines.length];
    li++;
    if (reduceMotion) { el.textContent = text; return; }
    let i = 0;
    el.textContent = "";
    (function tick() {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, 26);
      else setTimeout(typeLine, 3400);
    })();
  }
  typeLine();
}

/* ------------------------------------------------------------
   3. SCROLL: reveals, KPI counters, hero shrink, timing bar,
      nav highlight, timeline fill
   ------------------------------------------------------------ */
function scrollSystems() {
  // Reveal observer
  const io = new IntersectionObserver(
    entries => entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        if (en.target.classList.contains("kpi")) countUp(en.target);
        io.unobserve(en.target);
      }
    }),
    { threshold: 0.18 }
  );
  $$(".reveal, .kpi, .t-item").forEach(el => io.observe(el));

  // KPI count-up
  function countUp(card) {
    const el = $(".kpi-value", card);
    const end = parseFloat(el.dataset.value);
    const dec = +el.dataset.decimals;
    const pre = el.dataset.prefix, suf = el.dataset.suffix;
    if (reduceMotion) { el.textContent = pre + end.toFixed(dec) + suf; return; }
    const t0 = performance.now(), dur = 1400;
    (function step(t) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (end * eased).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  // Section-in-view → nav highlight + net pulse
  const navLinks = $$("#topnav nav a");
  const sectionIO = new IntersectionObserver(
    entries => entries.forEach(en => {
      if (en.isIntersecting) {
        const id = en.target.id;
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
        NetCanvas.pulse(); // forward-pass wave on section change
      }
    }),
    { threshold: 0.4 }
  );
  $$("main .section").forEach(s => sectionIO.observe(s));

  // Scroll-driven bits
  const hero = $("#hero");
  const bar = $("#timing-bar");
  const timeline = $("#timeline");
  let lastY = window.scrollY, lastT = performance.now(), fastTimer = null;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const max = document.body.scrollHeight - innerHeight;
    bar.style.width = (y / max) * 100 + "%";

    // "fastest lap" — purple bar on rapid scrolling (F1 nod)
    const now = performance.now();
    const speed = Math.abs(y - lastY) / Math.max(now - lastT, 1);
    if (speed > 3.5 && !reduceMotion) {
      bar.classList.add("fastest");
      clearTimeout(fastTimer);
      fastTimer = setTimeout(() => bar.classList.remove("fastest"), 900);
    }
    lastY = y; lastT = now;

    // hero shrink + fade while scrolling away
    if (!reduceMotion && y < innerHeight) {
      const p = y / innerHeight;
      hero.style.transform = `scale(${1 - p * 0.08})`;
      hero.style.opacity = 1 - p * 0.85;
    }

    // timeline line fill
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const prog = Math.min(Math.max((innerHeight * 0.75 - r.top) / r.height, 0), 1);
      timeline.style.setProperty("--fill", prog * 100 + "%");
    }

    $("#topnav").classList.toggle("scrolled", y > 10);
  }, { passive: true });
}

/* ------------------------------------------------------------
   4. RADAR CHARTS (Chart.js)
   ------------------------------------------------------------ */
function radars() {
  if (typeof Chart === "undefined") {
    // CDN unavailable — list skills as tags instead of radar charts
    SITE.skills.forEach((s, i) => {
      const cv = $(`#radar-${i}`);
      if (cv) cv.outerHTML = `<div class="t-tags">${s.axes
        .map(a => `<span class="tag">${a.name}</span>`)
        .join("")}</div>`;
    });
    return;
  }
  const css = getComputedStyle(document.documentElement);
  const accent = css.getPropertyValue("--accent").trim();
  const line = css.getPropertyValue("--line").trim();
  const muted = css.getPropertyValue("--muted").trim();

  SITE.skills.forEach((s, i) => {
    new Chart($(`#radar-${i}`), {
      type: "radar",
      data: {
        labels: s.axes.map(a => a.name),
        datasets: [{
          data: s.axes.map(a => a.score),
          backgroundColor: "rgba(108, 172, 228, 0.16)",
          borderColor: accent,
          borderWidth: 2,
          pointBackgroundColor: accent,
          pointRadius: 3,
          pointHoverRadius: 5,
        }],
      },
      options: {
        responsive: true,
        animation: reduceMotion ? false : { duration: 1200, easing: "easeOutQuart" },
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { display: false, stepSize: 25 },
            grid: { color: line },
            angleLines: { color: line },
            pointLabels: {
              color: muted,
              font: { family: "'IBM Plex Mono', monospace", size: 11 },
            },
          },
        },
      },
    });
  });
}

/* ------------------------------------------------------------
   5. PROJECTS — featured + live GitHub refresh
   ------------------------------------------------------------ */
async function projects() {
  const grid = $("#project-grid");
  const cfg = SITE.projects;
  const ghBase = `https://github.com/${SITE.contact.githubUser}/`;

  const card = (p, i) => `
    <a class="project reveal rise delay-${i % 3}" href="${ghBase}${p.repo}" target="_blank" rel="noopener">
      <div class="project-top">
        <span>${p.language || "repo"}</span>
        <span class="project-stars">${p.stars ? "★ " + p.stars : ""}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.blurb}</p>
      <div class="t-tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}</div>
    </a>`;

  const featured = cfg.featured.map(p => ({ ...p }));
  grid.innerHTML = featured.map(card).join("");
  observeNew(grid);

  if (!cfg.fetchLive) return;
  const status = $("#gh-status");
  try {
    const res = await fetch(
      `https://api.github.com/users/${SITE.contact.githubUser}/repos?sort=pushed&per_page=50`
    );
    if (!res.ok) throw new Error(res.status);
    const repos = await res.json();
    const byName = Object.fromEntries(repos.map(r => [r.name, r]));

    // enrich featured with live stars / language / description
    featured.forEach(p => {
      const live = byName[p.repo];
      if (live) {
        p.stars = live.stargazers_count || 0;
        p.language = live.language || p.language;
        if (!p.blurb && live.description) p.blurb = live.description;
      }
    });

    // append newer repos not featured & not excluded
    const known = new Set([...featured.map(p => p.repo), ...cfg.excludeRepos]);
    const extras = repos
      .filter(r => !known.has(r.name) && !r.fork)
      .slice(0, cfg.maxLive)
      .map(r => ({
        repo: r.name,
        title: r.name.replace(/[-_]/g, " "),
        blurb: r.description || "No description yet.",
        language: r.language,
        stars: r.stargazers_count,
        tags: r.language ? [r.language] : [],
      }));

    grid.innerHTML = [...featured, ...extras].map(card).join("");
    observeNew(grid);
    status.textContent = "· live ✓";
  } catch {
    status.textContent = "· showing cached list";
  }

  function observeNew(root) {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    $$(".reveal", root).forEach(el => io.observe(el));
  }
}

/* ------------------------------------------------------------
   6. NEURAL NETWORK CANVAS — the signature.
      Drifting nodes, proximity edges, and a "forward pass"
      pulse that sweeps left→right whenever a section enters.
   ------------------------------------------------------------ */
const NetCanvas = (() => {
  const canvas = $("#net");
  const ctx = canvas.getContext("2d");
  let W, H, nodes = [], wave = null;

  function resize() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    const count = Math.min(Math.floor((W * H) / 16000), 110);
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.8,
    }));
  }

  function pulse() {
    if (!reduceMotion) wave = { x: -80, speed: Math.max(W / 90, 8) };
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    const linkDist = 130;

    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }

    // edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < linkDist * linkDist) {
          const d = Math.sqrt(d2);
          let alpha = (1 - d / linkDist) * 0.16;
          // wave boost
          if (wave) {
            const mid = (a.x + b.x) / 2;
            const dist = Math.abs(mid - wave.x);
            if (dist < 140) alpha += (1 - dist / 140) * 0.45;
          }
          ctx.strokeStyle = `rgba(108, 172, 228, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    for (const n of nodes) {
      let glow = 0.35;
      if (wave) {
        const dist = Math.abs(n.x - wave.x);
        if (dist < 140) glow += (1 - dist / 140) * 0.65;
      }
      ctx.fillStyle = `rgba(108, 172, 228, ${glow})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (wave) {
      wave.x += wave.speed;
      if (wave.x > W + 160) wave = null;
    }

    requestAnimationFrame(frame);
  }

  function init() {
    if (reduceMotion) return;
    resize();
    addEventListener("resize", resize);
    frame();
  }

  // used by the "thwip" easter egg
  function web(x, y) {
    if (reduceMotion) return;
    const strands = 9;
    let life = 22;
    (function draw() {
      ctx.save();
      ctx.strokeStyle = `rgba(230, 238, 250, ${life / 26})`;
      ctx.lineWidth = 1.2;
      for (let s = 0; s < strands; s++) {
        const ang = (Math.PI * 2 * s) / strands;
        const len = (22 - life) * 16;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
        ctx.stroke();
      }
      for (let ring = 1; ring <= 3; ring++) {
        const rr = ((22 - life) * 16 * ring) / 3.2;
        ctx.beginPath();
        ctx.arc(x, y, rr, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
      if (--life > 0) requestAnimationFrame(draw);
    })();
  }

  return { init, pulse, web };
})();

/* ------------------------------------------------------------
   7. F1 START LIGHTS INTRO
   ------------------------------------------------------------ */
function startLights() {
  const wrap = $("#lights");
  if (reduceMotion || sessionStorage.getItem("lightsSeen")) {
    wrap.classList.add("out", "gone");
    return;
  }
  sessionStorage.setItem("lightsSeen", "1");
  const dots = $$(".lights-row span", wrap);
  dots.forEach((d, i) => setTimeout(() => d.classList.add("on"), 220 * (i + 1)));
  // lights out… and away we go
  setTimeout(() => {
    dots.forEach(d => d.classList.remove("on"));
    setTimeout(() => {
      wrap.classList.add("out");
      setTimeout(() => wrap.classList.add("gone"), 500);
    }, 340);
  }, 220 * 5 + 620);
}

/* ------------------------------------------------------------
   8. EASTER EGGS
      · type "messi"  → GOAT mode
      · type "thwip"  → web shot
      · type "drs"    → animation speed boost
      · console note for the curious
   ------------------------------------------------------------ */
function easterEggs() {
  console.log(
    "%cWith great data comes great responsibility.",
    "color:#e10600; background:#0a0f1e; font-size:13px; padding:6px 12px; border-left:3px solid #6cace4; font-family:monospace;"
  );
  console.log("%cpsst — try typing: messi · thwip · drs", "color:#8ca0bf; font-family:monospace; font-size:11px;");

  const toast = $("#toast");
  let toastTimer;
  function say(msg, ms = 2600) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), ms);
  }

  let buffer = "";
  let drs = false;
  addEventListener("keydown", e => {
    if (e.target.matches("input, textarea")) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-12);

    if (buffer.endsWith("messi")) {
      say("🐐 Ankara Messi! Ankara Messi!");
      rain(["⚽", "🐐", "🔟"]);
      buffer = "";
    }
    if (buffer.endsWith("thwip")) {
      NetCanvas.web(innerWidth * (0.25 + Math.random() * 0.5), innerHeight * (0.2 + Math.random() * 0.5));
      say("thwip! 🕸️");
      buffer = "";
    }
    if (buffer.endsWith("drs")) {
      drs = !drs;
      document.documentElement.style.setProperty("--speed", drs ? 0.45 : 1);
      say(drs ? "DRS enabled — animations at full speed 🏎️" : "DRS disabled — back to racing pace");
      buffer = "";
    }
  });

  function rain(emojis) {
    if (reduceMotion) return;
    for (let i = 0; i < 24; i++) {
      const s = document.createElement("span");
      s.textContent = emojis[i % emojis.length];
      Object.assign(s.style, {
        position: "fixed",
        left: Math.random() * 100 + "vw",
        top: "-40px",
        fontSize: 14 + Math.random() * 22 + "px",
        zIndex: 80,
        pointerEvents: "none",
        transition: `transform ${2 + Math.random() * 2}s ease-in, opacity 0.4s ease ${1.8 + Math.random() * 2}s`,
      });
      document.body.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translateY(${innerHeight + 80}px) rotate(${Math.random() * 360}deg)`;
        s.style.opacity = "0";
      });
      setTimeout(() => s.remove(), 4500);
    }
  }
}

/* ------------------------------------------------------------
   BOOT
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  startLights();
  NetCanvas.init();
  heroEffects();
  scrollSystems();
  radars();
  projects();
  easterEggs();
});
