# Issue tracker

Локальный трекер на markdown-файлах — без внешних сервисов и аккаунтов.

- Спеки и тикеты живут в `.scratch/<feature-slug>/`
- `spec.md` — спецификация фичи
- `issues/<NN>-<slug>.md` — тикеты, пронумерованы по порядку зависимостей (блокеры первыми)
- Каждый тикет несёт `Blocked by:` и `Status:` (`ready-for-agent` / `in progress` / `done` / `failed`)
- Лейблы триажа (если понадобятся): `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`
- Прогресс сборки — в `PROGRESS.md` в корне репозитория
