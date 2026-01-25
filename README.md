# VELIMIR LUX — Мастерская форм и смысла

Production-ready сайт на Next.js 14 (App Router), выполненный в стиле architectural luxury и brutal minimalism.

**GitHub:** https://github.com/max2690/velimir  
**Телефон:** +7 (924) 009-88-80

## Стек
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Validation:** Zod + React Hook Form
- **Integrations:** YouGile API, SMTP (Nodemailer)

## Начало работы

1. **Установка зависимостей:**
   ```bash
   npm install
   ```

2. **Настройка переменных окружения:**
   Создайте файл `.env.local` на основе `.env.example` и заполните ключи:
   - `YOUGILE_API_KEY`, `YOUGILE_BOARD_ID`, `YOUGILE_COLUMN_ID` — для CRM.
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — для почтовых уведомлений.
   - `NEXT_PUBLIC_YM_ID` — ID Яндекс.Метрики.

3. **Запуск:**
   ```bash
   npm run dev
   ```

## Структура контента

### Изображения и Видео
- ✅ `/public/video/hero.mp4` — фоновое видео для Hero (загружено).
- ✅ `/public/video/hero-poster.jpg` — постер для видео (создан).
- ✅ `/public/img/products/` — 12 оптимизированных изображений для карточек направлений (art, epoxy-tables, custom-furniture, cnc).
- ⏳ `/public/img/gallery/` — 12 работ для галереи (g01.jpg ... g12.jpg) — ожидается.
- ⏳ `/public/img/cases/` — изображения для кейсов (c01.jpg ... c06.jpg) — ожидается.
- ⏳ `/public/qr/velimir-qr.png` — QR-код для футера и страницы контактов — ожидается.

**Примечание:** Все изображения продуктов оптимизированы до 1200x1500px и сжаты до 100-250 KB для быстрой загрузки.

### Редактирование текстов
- **Главная страница:** `app/page.tsx` и компоненты в `components/sections/`.
- **SEO-страницы:** Находятся в `app/(seo)/`. Каждая страница использует `SEOPageTemplate`.
- **FAQ:** Массив `faqs` в `components/sections/FAQ.tsx`.
- **Кейсы:** Массив `cases` в `components/sections/Cases.tsx`.

## SEO и Аналитика
- **Sitemap:** Генерируется автоматически по адресу `/sitemap.xml`.
- **Robots:** Настроен в `app/robots.ts`.
- **Schema.org:** Внедрена микроразметка `Organization` (в layout) и `FAQPage` (на SEO-страницах).
- **Метрика:** События `lead_submit_success`, `lead_submit_error` отправляются автоматически при работе с формой.

## Интеграции (Лиды)
При отправке формы:
1. Создается задача в **YouGile** с полным описанием, UTM-метками и данными клиента.
2. Отправляется письмо на указанный в `LEADS_TO_EMAIL` адрес через SMTP.
3. В случае сбоя одного из сервисов, система логирует ошибку, но продолжает работу, если второй сервис доступен.

## Деплой на Vercel
1. Подключите репозиторий GitHub к Vercel.
2. Добавьте переменные окружения в настройках проекта (см. `.env.example`).
3. Vercel автоматически определит Next.js и настроит сборку.
4. После деплоя проверьте работу форм и интеграций.

## Последние обновления (26.01.2026)
- ✅ Добавлен V-образный переход между Hero и Philosophy секциями.
- ✅ Оптимизированы все изображения продуктов (12 файлов, снижение веса на 90-95%).
- ✅ Добавлен телефон +7 (924) 009-88-80 во все компоненты контактов.
- ✅ Проект загружен на GitHub.
