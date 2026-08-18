# 03 — Плавающий переключатель тем (UI + persistence)

**Blocked by:** 02-theme-blocks
**Status:** done

## Что сделать

**HTML** (`landing/index.html`): добавить после `</footer>` и перед блоком `<script>` (GSAP):
```html
<div class="theme-switch" id="themeSwitch">
  <button data-theme-btn="warm" class="active" title="Тёплый и доверительный">А</button>
  <button data-theme-btn="soft" title="Мягкий и воздушный">Б</button>
  <button data-theme-btn="bold" title="Смелый и энергичный">В</button>
</div>
```

**CSS** (`landing/css/style.css`): стили `.theme-switch` — компактная плашка `position: fixed; right: 20px; top: 50%; transform: translateY(-50%); z-index: 100;` белый/тёмный фон под цвет `--cream-card`, скругление `999px`, вертикальный ряд из 3 круглых кнопок ~40px, активная кнопка выделена заливкой `var(--forest)` и белым текстом, неактивные — прозрачный фон, `var(--ink-muted)`. На мобильном (`max-width: 640px`) сместить в `bottom: 16px; right: 16px; top: auto; transform: none;` и сделать ряд горизонтальным (`flex-direction: row`), чтобы не перекрывать контент сбоку на узких экранах.

**JS** (`landing/js/script.js`, новый блок в конце файла, внутри существующего `DOMContentLoaded`-листенера, не трогая остальной код):
```js
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
```

## Проверка

Открыть лендинг, кликнуть Б и В — палитра/радиусы/тени/шрифт заголовков меняются мгновенно, позиция скролла не сбрасывается. Перезагрузить страницу после выбора В — тема `bold` должна остаться (читается из `localStorage`). Проверить на мобильной ширине (375px) — переключатель не перекрывает форму заявки и кнопки CTA.
