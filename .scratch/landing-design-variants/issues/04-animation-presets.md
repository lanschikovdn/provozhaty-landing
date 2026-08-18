# 04 — JS-пресеты анимаций по теме

**Blocked by:** 03-theme-switcher-ui
**Status:** ready-for-agent

## Что сделать

В `landing/js/script.js` найти существующий блок reveal-анимации:
```js
document.querySelectorAll('.reveal').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    delay: (i % 5) * 0.06,
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});
```

Заменить захардкоженные `duration`/`ease`/`delay` и стартовый `y`-сдвиг (сейчас задан в CSS `.reveal{transform:translateY(28px)}`) на значения из пресета текущей темы:

```js
const ANIM_PRESETS = {
  warm: { duration: 0.7, ease: 'power2.out', y: 28, stagger: 0.06 },
  soft: { duration: 1.0, ease: 'power1.out', y: 16, stagger: 0.10 },
  bold: { duration: 0.5, ease: 'back.out(1.7)', y: 40, stagger: 0.04 },
};
const preset = ANIM_PRESETS[document.documentElement.dataset.theme] || ANIM_PRESETS.warm;

document.querySelectorAll('.reveal').forEach((el, i) => {
  gsap.set(el, { y: preset.y });
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: preset.duration,
    ease: preset.ease,
    delay: (i % 5) * preset.stagger,
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});
```

Убрать `transform: translateY(28px)` из `.reveal` в CSS (теперь стартовый сдвиг ставится через `gsap.set` в JS, т.к. он зависит от темы) — оставить в CSS только `.reveal{opacity:0;}`.

Пресет читается один раз при загрузке страницы (на момент построения `.reveal`-анимаций) — переключение темы кнопками А/Б/В **не обязано** мгновенно менять уже проигранные reveal-анимации (они `toggleActions: 'play none none none'`, то есть проигрываются один раз). Это осознанное упрощение, не баг.

## Проверка

С темой `bold` прокрутить секцию «Проблема» (карточки `.fork-card`/`.stat-card`) — появление должно быть быстрым и с лёгким пружинным перехлёстом (`back.out`). Перезагрузить страницу с темой `soft` — то же появление должно быть заметно медленнее и без пружины (`power1.out`). С темой `warm` (или без сохранённой темы) — поведение как было в Фазе 1, без изменений.
