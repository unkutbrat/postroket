# Postroket

Multilingual SEO-first platform for India-focused finance tools, jobs, and document generators built with Next.js 14 App Router, TypeScript, TailwindCSS, Prisma, and next-intl.

## Features
- Locale-prefixed routes `/en`, `/hi`, `/or` with next-intl middleware and language switcher.
- Finance/salary/tax tools with India-ready logic (CTC to in-hand, HRA, PF, gratuity, EMI, loan eligibility, GST, income tax).
- Jobs module with public posting (pending approval), featured listing flag, and admin moderation.
- Document generators (invoice, resume, HR letters) with client-side PDF export via pdf-lib.
- Admin panel at `/admin` with credentials login (custom secure session), role-based users, settings, ads manager, SEO glossary, and analytics dashboard.
- Internal analytics for page views and tool events, AdSense/direct banner placeholders, sitemap + robots.

## Getting started
1. Install dependencies
   ```bash
   npm install
   ```
2. Create `.env.local` based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Set:
   - `DATABASE_URL="file:./dev.db"` (switch to your Postgres URL in production and update `prisma/schema.prisma` provider to `postgresql`)
   - `NEXTAUTH_SECRET` (strong random value)
   - `SEED_ADMIN_EMAIL=admin@postroket.com`
   - `SEED_ADMIN_PASSWORD=Nikatchana1@`
   - `SEED_ADMIN_NAME=Owner Admin`
3. Apply Prisma migrations
   ```bash
   npx prisma migrate dev --name init
   ```
4. Seed data (tools, glossary, seed admin)
   ```bash
   npx prisma db seed
   ```
5. Run the dev server
   ```bash
   npm run dev
   ```
6. Login to admin
   - Visit `http://localhost:3000/admin/login`
   - Use the seeded admin credentials from env vars (never hardcode).

## Admin capabilities
- Dashboard analytics (page views), top pages.
- Tools manager (enable/popular/order), Jobs moderation (approve/reject, mark paid).
- Document settings for footer contacts.
- Ads/Banners manager with locale + placement targeting.
- SEO & Content glossary (30+ seeded terms across locales).
- Users & Roles (OWNER_ADMIN, ADMIN, TEAM_MEMBER) with credential login.
- Settings for site identity and payment provider (Manual/Test, Razorpay, Stripe placeholders).

## Localization
- Locale middleware auto-redirects to `/en` fallback.
- Language switcher keeps path while changing locale.
- Odia text uses Google font `Noto Sans Oriya` for proper rendering.

## Deployment (Vercel)
1. Set environment variables in Vercel project:
   - `DATABASE_PROVIDER=postgresql` (for production)
   - `DATABASE_URL=<postgres-connection-string>`
   - `NEXTAUTH_SECRET=<strong-secret>`
   - `NEXTAUTH_URL=https://postroket.com`
   - `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_NAME`
2. Run `npx prisma migrate deploy` during build.
3. Ensure `public/uploads` (or S3-compatible storage) is configured for banner/logo uploads; API `/api/upload` writes locally in dev.
4. `npm run build` is executed by Vercel; Next.js app router output is static+server hybrid.

## Security notes
- No passwords are committed; admin seed comes from environment variables.
- Passwords hashed with `bcryptjs`.
- Admin routes are protected server-side via secure session cookies.
- Job posting and admin login use simple server-side validation; hook in rate limiting/reCAPTCHA as needed.

## Content
- MDX explanations and FAQs for every tool across English, Hindi, and Odia.
- Policy placeholders (privacy/terms/disclaimer) and glossary with 30+ terms seeded per locale set.
