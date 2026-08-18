document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- HERO SCROLL SCENE (video scrubbed by scroll) ---------- */
  const stageWrap = document.getElementById('heroStageWrap');
  const heroVideo = document.getElementById('heroVideo');
  const tt1 = document.getElementById('tt1');
  const tt2 = document.getElementById('tt2');
  const tt3 = document.getElementById('tt3');

  let videoDuration = 0;
  heroVideo.addEventListener('loadedmetadata', () => { videoDuration = heroVideo.duration; });

  ScrollTrigger.create({
    trigger: stageWrap,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) {
      if (!videoDuration) return;
      heroVideo.currentTime = self.progress * videoDuration;
    }
  });

  const tooltipTl = gsap.timeline({
    scrollTrigger: {
      trigger: stageWrap,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
    }
  });

  tooltipTl
    .to(tt1, { opacity: 1, duration: 0.12 }, 0.02)
    .to(tt1, { opacity: 0, duration: 0.12 }, 0.28)
    .to(tt2, { opacity: 1, duration: 0.12 }, 0.36)
    .to(tt2, { opacity: 0, duration: 0.12 }, 0.62)
    .to(tt3, { opacity: 1, duration: 0.12 }, 0.82);

  /* ---------- REVEAL ON SCROLL FOR OTHER SECTIONS ---------- */
  document.querySelectorAll('.reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay: (i % 5) * 0.06,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });
  });

  /* ---------- CTA FORM (stub, no backend yet) ---------- */
  const form = document.getElementById('ctaForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.querySelectorAll('input, button').forEach(el => el.disabled = true);
    note.hidden = false;
  });

  /* ---------- THEME SWITCHER ---------- */
  const themeSwitch = document.getElementById('themeSwitch');
  const savedTheme = localStorage.getItem('provozhaty-theme') || 'warm';
  document.documentElement.dataset.theme = savedTheme;
  themeSwitch.querySelectorAll('[data-theme-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeBtn === savedTheme);
    btn.addEventListener('click', () => {
      const theme = btn.dataset.themeBtn;
      document.documentElement.dataset.theme = theme;
      localStorage.setItem('provozhaty-theme', theme);
      themeSwitch.querySelectorAll('[data-theme-btn]').forEach(b => b.classList.toggle('active', b === btn));
    });
  });
});
