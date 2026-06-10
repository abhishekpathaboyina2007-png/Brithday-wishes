/* ── MUSIC ──────────────────────────────────────── */
const musicBtn = document.getElementById('music-btn');
const audio    = document.getElementById('bg-audio');
let playing = false;

musicBtn.addEventListener('click', () => {
  if (!playing) { audio.play().catch(()=>{}); playing = true; musicBtn.textContent = '⏸ Pause Music'; }
  else           { audio.pause(); playing = false; musicBtn.textContent = '🎵 Play Music'; }
});


/* ── COUNTDOWN ──────────────────────────────────── */
function updateCountdown() {
  const bd = document.getElementById('birthday-date');
  if (!bd) return;
  const target = new Date(bd.dataset.date);
  const now    = new Date();
  let diff     = target - now;

  if (diff < 0) {
    document.getElementById('cd-days').textContent  = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent  = '00';
    document.getElementById('cd-secs').textContent  = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);         diff %= 86400000;
  const hours = Math.floor(diff / 3600000);          diff %= 3600000;
  const mins  = Math.floor(diff / 60000);            diff %= 60000;
  const secs  = Math.floor(diff / 1000);

  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
  document.getElementById('cd-secs').textContent  = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);


/* ── CAROUSEL ───────────────────────────────────── */
let currentSlide = 0;
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const dots   = document.querySelectorAll('.dot');

function goTo(n) {
  if (!slides.length) return;
  currentSlide = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

document.getElementById('prev-btn')?.addEventListener('click', () => goTo(currentSlide - 1));
document.getElementById('next-btn')?.addEventListener('click', () => goTo(currentSlide + 1));
dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

if (slides.length > 1) setInterval(() => goTo(currentSlide + 1), 4000);
goTo(0);


/* ── PARTICLES (canvas) ─────────────────────────── */
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const SYMBOLS = ['✦', '·', '⋆', '✧', '❋'];
  const COLORS  = ['#f9a8d4', '#c4b5fd', '#fda4af', '#f0abfc', '#fbcfe8'];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      s: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      c: COLORS [Math.floor(Math.random() * COLORS.length)],
      size: 8 + Math.random() * 10,
      alpha: .3 + Math.random() * .5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.c;
      ctx.font        = `${p.size}px serif`;
      ctx.fillText(p.s, p.x, p.y);
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();


/* ── FLOATING HEARTS ────────────────────────────── */
const heartEmojis = ['❤️','💕','💖','💗','💓','🌸','✨'];
function spawnHeart() {
  const el = document.createElement('span');
  el.classList.add('float-heart');
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left  = Math.random() * 98 + 'vw';
  el.style.bottom = '-2rem';
  const dur = 6 + Math.random() * 8;
  el.style.animationDuration = dur + 's';
  el.style.fontSize = (1 + Math.random() * 1.4) + 'rem';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}
setInterval(spawnHeart, 900);


/* ── SURPRISE LETTER ─────────────────────────────── */
const surpriseBtn      = document.getElementById('open-surprise-btn');
const letterContainer  = document.getElementById('letter-container');
const letterText       = document.getElementById('letter-text');
let letterRevealed     = false;

const LETTER = `My dearest love,\n\nAs your birthday approaches, my heart overflows with joy and gratitude. Every single day with you is a celebration — but your birthday is extra special, because it marks the day the universe gave the world someone as extraordinary as you.\n\nYou light up every room you walk into. Your laughter is my favorite melody. Your smile is the most beautiful sight I have ever seen, and I thank the stars every night that I get to call you mine.\n\nThis coming birthday, I want you to know how deeply, how completely, how endlessly you are loved. You deserve the world — and I promise to spend every day trying to give you exactly that.\n\nHappy early birthday, my princess. The best is yet to come. 🌸`;

function typewrite(text, el, speed = 28) {
  el.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(iv);
  }, speed);
}

surpriseBtn?.addEventListener('click', () => {
  if (letterRevealed) return;
  letterRevealed = true;
  surpriseBtn.disabled = true;
  surpriseBtn.style.opacity = '.5';
  letterContainer.style.display = 'block';
  letterContainer.style.animation = 'fadeSlideUp .7s ease both';
  typewrite(LETTER, letterText);
  startConfetti();
});


/* ── CONFETTI ─────────────────────────────────────── */
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
  let H = canvas.height = canvas.offsetHeight || 400;

  const CONF_COLORS = ['#f9a8d4','#c4b5fd','#fda4af','#fde68a','#6ee7b7','#93c5fd'];
  const pieces = Array.from({length: 120}, () => ({
    x: Math.random() * W,
    y: Math.random() * -H,
    w: 6 + Math.random() * 10,
    h: 4 + Math.random() * 8,
    vy: 2 + Math.random() * 4,
    vx: (Math.random() - .5) * 2,
    rot: Math.random() * 360,
    rspeed: (Math.random() - .5) * 5,
    c: CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)],
    alpha: .8 + Math.random() * .2
  }));

  let frame;
  function drawConf() {
    ctx.clearRect(0, 0, W, H);
    pieces.forEach(p => {
      p.y += p.vy; p.x += p.vx; p.rot += p.rspeed;
      if (p.y > H) { p.y = -20; p.x = Math.random() * W; }
      ctx.save();
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame = requestAnimationFrame(drawConf);
  }
  drawConf();
  setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, W, H); }, 8000);
}


/* ── FADE-IN OBSERVER ────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* ── UPLOAD ───────────────────────────────────────── */
const photoInput  = document.getElementById('photo-input');
const uploadStatus = document.getElementById('upload-status');
const thumbsWrap  = document.getElementById('uploaded-thumbs');
const uploadCard  = document.querySelector('.upload-card');

uploadCard?.addEventListener('dragover', e => { e.preventDefault(); uploadCard.style.background = 'rgba(249,168,212,.28)'; });
uploadCard?.addEventListener('dragleave', () => { uploadCard.style.background = ''; });
uploadCard?.addEventListener('drop', e => {
  e.preventDefault(); uploadCard.style.background = '';
  const files = e.dataTransfer.files;
  if (files.length) handleUpload(files);
});

photoInput?.addEventListener('change', () => { if (photoInput.files.length) handleUpload(photoInput.files); });

async function handleUpload(files) {
  uploadStatus.textContent = '⏳ Uploading…';
  const fd = new FormData();
  Array.from(files).forEach(f => fd.append('photos', f));
  try {
    const res  = await fetch('/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.success) {
      uploadStatus.textContent = '✅ Photos uploaded! Refreshing…';
      setTimeout(() => location.reload(), 1000);
    } else {
      uploadStatus.textContent = '❌ Upload failed. Try again.';
    }
  } catch {
    uploadStatus.textContent = '❌ Network error. Try again.';
  }
}
