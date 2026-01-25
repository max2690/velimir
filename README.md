# VELIMIR LUX — Мастерская форм и смысла

Production-ready сайт на Next.js 14 (App Router), выполненный в стиле architectural luxury и brutal minimalism.

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
Замените заглушки в папке `/public` на реальные файлы:
- `/public/video/hero.mp4` — фоновое видео для Hero.
- `/public/video/hero-poster.jpg` — постер для видео.
- `/public/img/products/` — изображения для карточек направлений.
- `/public/img/gallery/` — 12 работ для галереи (g01.jpg ... g12.jpg).
- `/public/img/cases/` — изображения для кейсов (c01.jpg ... c06.jpg).
- `/public/qr/velimir-qr.png` — QR-код для футера и страницы контактов.

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
