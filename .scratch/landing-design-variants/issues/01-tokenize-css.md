# 01 — Токенизировать радиусы/тени/шрифт в style.css

**Blocked by:** —
**Status:** done

## Что сделать

В `C:\Users\Pro X\Провожатый\сайт\landing\css\style.css` вынести захардкоженные значения border-radius карточек и box-shadow карточек в CSS custom properties, объявленные в `:root` (текущие значения = вариант `warm`, они не должны визуально измениться).

Добавить в `:root` (после существующих `--font-body`):
```css
--radius-card: 20px;
--shadow-card: 0 20px 40px rgba(20,18,31,.06);
```

Заменить на `var(--radius-card)` / `var(--shadow-card)` во всех правилах, где сейчас захардкожен близкий радиус/тень карточек: `.fork-card`, `.stat-card`, `.step-card`, `.role-card`, `.cta-form`, `.safety-item` (у него чуть другой радиус 16px — привести к `var(--radius-card)`, разница в 4px не критична и не заметна), `.diagram-labels span` (если там есть радиус — пропустить, это не карточка).

**Не трогать:** `border-radius: 999px` у `.btn`, `.pill`, `.role-switch label`, `.status-chip`, `.dot*` — это пилюли/кнопки, они одинаковы во всех трёх темах по спеке (см. `.scratch/landing-design-variants/spec.md`, раздел «Технические требования», п.1).

## Проверка

Открыть `landing/index.html` в браузере (через `python -m http.server` из `landing/` или существующий launch.json конфиг `provozhaty-landing`) — визуально страница должна выглядеть **идентично** тому, что было до правки (те же радиусы карточек, те же тени). Сверить с git diff — изменения только в `:root` и в замене литералов на `var(...)`, никакой другой правки.
