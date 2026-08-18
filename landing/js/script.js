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
  const ANIM_PRESETS = {
    warm: { duration: 0.7, ease: 'power2.out', y: 28, stagger: 0.06 },
    soft: { duration: 1.0, ease: 'power1.out', y: 16, stagger: 0.10 },
    bold: { duration: 0.5, ease: 'back.out(1.7)', y: 40, stagger: 0.04 },
  };
  const revealTheme = localStorage.getItem('provozhaty-theme') || 'soft';
  const preset = ANIM_PRESETS[revealTheme] || ANIM_PRESETS.soft;

  document.querySelectorAll('.reveal').forEach((el, i) => {
    gsap.set(el, { y: preset.y });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: preset.duration,
      ease: preset.ease,
      delay: (i % 5) * preset.stagger,
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
  const savedTheme = localStorage.getItem('provozhaty-theme') || 'soft';
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
