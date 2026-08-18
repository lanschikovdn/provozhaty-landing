# 02 — Добавить [data-theme] блоки soft и bold

**Blocked by:** 01-tokenize-css
**Status:** ready-for-agent

## Что сделать

В `C:\Users\Pro X\Провожатый\сайт\landing\css\style.css`, сразу после закрывающей `}` блока `:root{...}`, добавить два новых блока с переопределением токенов. Точные значения — из `.scratch/landing-design-variants/spec.md`, раздел «Дизайн-токены по вариантам» (таблицы `soft` и `bold`). Скопировать значения оттуда дословно, не изобретать свои.

```css
[data-theme="soft"]{
  --cream:#F6F8F5;
  --cream-card:#FFFFFF;
  --navy:#3A4A42;
  --navy-card:#445247;
  --ink:#33413A;
  --ink-muted:#7C8880;
  --paper:#F6F8F5;
  --paper-muted:#C3CDC6;
  --forest:#4C8B6E;
  --forest-deep:#3E7259;
  --mint:#A9E0C4;
  --mint-pale:#EAF4EE;
  --font-display:'Manrope','Inter',sans-serif;
  --radius-card:30px;
  --shadow-card:0 24px 48px rgba(58,74,66,0.10);
}

[data-theme="bold"]{
  --cream:#F2F1EC;
  --cream-card:#FFFFFF;
  --navy:#0A0A0F;
  --navy-card:#17171F;
  --ink:#0A0A0F;
  --ink-muted:#55555F;
  --paper:#F5F4EF;
  --paper-muted:#8A8A96;
  --forest:#0E9A5C;
  --forest-deep:#087A48;
  --mint:#4CFFA0;
  --mint-pale:#D6FBE7;
  --font-display:'Unbounded','Inter',sans-serif;
  --radius-card:10px;
  --shadow-card:0 8px 0 var(--forest);
}
[data-theme="bold"] .hero-title,
[data-theme="bold"] .h2{
  letter-spacing:-0.02em;
}
```

Также в `C:\Users\Pro X\Провожатый\сайт\landing\index.html`, в `<head>`, дополнить существующую строку подключения Google Fonts (сейчас грузит только `PT+Serif` и `Inter`) — добавить семейства `Manrope:wght@700;800` и `Unbounded:wght@700`, сохранив уже подключенные. Можно одним `<link>` через `&family=`, как уже сделано для двух текущих шрифтов.

## Проверка

Вручную выставить в консоли браузера `document.documentElement.dataset.theme = 'soft'`, затем `= 'bold'` — страница должна перекраситься (палитра, радиусы карточек, тень, шрифт заголовков), но раскладка/порядок блоков и текст — не меняться. Без `data-theme` (или со значением `warm`) — вид идентичен Фазе 1 (тикет 01 это уже гарантировал, здесь просто убедиться, что новые блоки не переопределяют `:root` по умолчанию).
