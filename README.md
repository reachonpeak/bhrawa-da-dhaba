# Bharawan Daa Dhaba — Website

Pure-vegetarian Punjabi dhaba in Seven Hills, NSW. Next.js 16 + Tailwind v4 + Framer Motion + Stripe + Resend.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in keys when ready
npm run dev
```

Site runs at http://localhost:3000. Checkout will show a friendly "not configured" message until you add `STRIPE_SECRET_KEY`.

## Project structure

```
src/
  app/                 # routes (Home, Menu, About, Catering, Contact, Checkout, Order)
    api/
      checkout/        # POST → creates Stripe Checkout session
      webhooks/stripe/ # webhook → sends Resend confirmation emails
      catering/        # POST → sends enquiry email
  components/          # UI (Hero, MenuTabs, CartDrawer, …)
  lib/
    menu.ts            # ★ FULL MENU — edit prices and items here
    business.ts        # Address, phone, email, hours
    cart.ts            # Zustand cart store (persisted to localStorage)
    utils.ts           # cn(), formatAUD()
```

## Editing the menu

Open `src/lib/menu.ts`. Each category has an `items` array. Edit/add/remove items as needed — prices update everywhere automatically.

## Enabling online ordering (Stripe)

1. Sign up at https://stripe.com (use your Australia business details).
2. Get your secret key from the API keys page in the Stripe Dashboard.
3. Add `STRIPE_SECRET_KEY` to `.env.local` (and in Vercel later).
4. For order confirmation emails, set up the webhook:
   - In Stripe Dashboard → Developers → Webhooks → Add endpoint
   - URL: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Event: `checkout.session.completed`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

## Enabling confirmation emails (Resend)

1. Sign up at https://resend.com.
2. Get an API key → `RESEND_API_KEY`.
3. Verify your domain in Resend (optional for testing). Without a verified domain, emails use `resend.dev` and may go to spam.

## Adding images

See `IMAGE_PROMPTS.md` for ready-to-paste prompts for Midjourney / DALL·E / Flux. Save outputs into `public/images/`.

## Deploy to Vercel

```bash
npx vercel
```

Or push to GitHub and connect on https://vercel.com. Add the env vars in the Vercel project settings.

## Owner

Honey Khaneja · 23 Boomerang Place, Seven Hills NSW 2147 · 0478 073 373 · bharawandaadhaba@gmail.com
