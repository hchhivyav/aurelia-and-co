# Aurelia & Co. — Luxury Jewelry Storefront

A responsive luxury fine-jewelry storefront built with **Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion**. The project is a frontend demonstration: the cart persists in localStorage, checkout validates customer details, and a completed demo order produces a print-ready invoice page. No real payments or fulfillment are processed.

**Live URL:** `https://your-deployment-url.vercel.app` (replace after deployment)

## Highlights

- Editorial, responsive design in espresso, warm ivory, and champagne gold.
- Ten sample products across rings, necklaces, earrings, and bracelets.
- Product detail pages with gallery selection, stock, material, care notes, related pieces, and add-to-bag.
- Category filters and price sorting on the full collection page.
- Persistent React Context cart with localStorage hydration, drawer, quantities, remove actions, and totals.
- Checkout form validation, mock card/COD choices, order confirmation, invoice page, print-ready invoice page and print stylesheet.
- Framer Motion scroll reveals and drawer transitions, CSS Ken Burns hero, reduced-motion support, keyboard focus states, accessible labels, responsive layouts.
- Metadata, Open Graph defaults, static params, `next/image` for product photography.

## Tech stack

- Next.js 14 App Router + React 18
- TypeScript
- Tailwind CSS 3
- Framer Motion
- Lucide icons
- Unsplash Source images (remote images, cropped to editorial 4:5 presentation)

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck
npm run build
npm start
```

## Rendering strategy: SSG vs dynamic/client rendering

| Route | Rendering | Reason |
|---|---|---|
| `/` | SSG | Editorial homepage and featured catalog content are static and cacheable. |
| `/collections` | Static shell + client filtering | Catalog data is local; filtering and sorting need instant client interaction. |
| `/collections/[category]` | SSG via `generateStaticParams` | Four known categories can be generated at build time. |
| `/products/[slug]` | SSG via `generateStaticParams` | All ten product pages are known at build time, fast to serve, and SEO-friendly. |
| `/cart` | Client-rendered within a static route shell | Cart is personal browser state persisted in localStorage; it cannot be shared safely as a static server response. |
| `/checkout` | Client-rendered within a static route shell | Form validation and current cart state are browser-side; no payment gateway is connected. |
| `/checkout/success` | Client-rendered | Reads the most recent demo order from sessionStorage. |
| `/invoice` | Client-rendered | Reads order data from sessionStorage so invoice contents match the completed checkout. |
| `/about` | SSG | Brand story content is static. |

**SSR note:** In a production commerce implementation, authenticated cart and order routes should be backed by a database and rendered/validated on the server. This demo deliberately keeps cart and checkout data in the browser; it does not claim a secure server-side checkout. Add server actions/API routes, inventory locking, durable orders, and a payment provider before real commerce use.

## Project structure

```text
app/
  about/page.tsx
  cart/page.tsx
  checkout/page.tsx
  checkout/success/page.tsx
  collections/page.tsx
  collections/[category]/page.tsx
  invoice/page.tsx
  products/[slug]/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  button.tsx
  cart-drawer.tsx
  collection-category.tsx
  footer.tsx
  header.tsx
  motion.tsx
  product-card.tsx
  product-detail.tsx
context/cart-context.tsx
data/products.ts
lib/utils.ts
types/index.ts
```

## Sample data

`data/products.ts` exports ten typed products with `id`, `slug`, `name`, `category`, `price`, `description`, `material`, `images[]`, `stock`, and `details`. Prices are demo USD amounts. Product imagery uses Unsplash image URLs; for production, review each image's license and replace remote sources with owned/licensed assets in `/public/images`.

## Deployment to Vercel

1. Create a new **public GitHub repository** named `aurelia-and-co`.
2. Commit this source and push it to the repository.
3. Sign in to [Vercel](https://vercel.com), choose **Add New → Project**, and import the GitHub repository.
4. Framework preset: **Next.js**. Build command: `npm run build`. Install command: `npm install`. Output directory: leave the default (Vercel manages Next.js output).
5. Add environment variable `NEXT_PUBLIC_SITE_URL` with your deployed HTTPS URL, e.g. `https://aurelia-and-co.vercel.app`.
6. Deploy. Vercel will build and provide a URL. Replace the Live URL placeholder at the top of this README.
7. For future updates, push commits to the connected branch; Vercel will build and deploy automatically.

### Netlify alternative

1. Import the repository into Netlify.
2. Use build command `npm run build`; install command `npm install`.
3. Use the official Next.js Runtime/OpenNext integration recommended by Netlify for the current project setup; do not publish `.next` as a plain static folder because dynamic/client routes and Next image optimization expect the Next runtime.
4. Set `NEXT_PUBLIC_SITE_URL` to the production URL and deploy.

## Git workflow

Suggested clear commits:

```bash
git init
git add .
git commit -m "chore: scaffold Next.js luxury storefront"
git commit -am "feat: add editorial catalog and product details"
git commit -am "feat: implement persistent cart and checkout demo"
git commit -am "feat: add standalone invoice and deployment docs"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aurelia-and-co.git
git push -u origin main
```

Create the GitHub repository as **Public** in GitHub's repository creation settings. A public repository cannot be created from this source bundle without your GitHub credentials, so the commands above are the final publishing step.

## Launch checklist

- [x] Next.js App Router + TypeScript + Tailwind + Framer Motion
- [x] Luxury palette, editorial typography, generous spacing, hairlines, responsive layout
- [x] Home hero, collections, product grid, category filters and price sort
- [x] Ten products across the requested four categories
- [x] SSG product routes using `generateStaticParams`
- [x] Cart context, localStorage persistence, count, drawer, quantity and remove
- [x] Cart subtotal, shipping, tax and grand total
- [x] Checkout details, validation, demo card/COD options and summary
- [x] Confirmation page and print-only invoice action with print stylesheet
- [x] SEO metadata and product metadata
- [x] Reduced-motion preference and keyboard focus styling
- [x] Vercel/Netlify guidance and SSG/client-rendering explanation
- [ ] Push to a **public GitHub repository** (requires your GitHub account)
- [ ] Deploy and replace the live URL placeholder
- [ ] Replace demo checkout with a server-backed order/payment integration before accepting real orders

## Notes before production

- The mock checkout is not PCI compliant and must not collect real card numbers.
- Add backend validation, rate limiting, durable inventory and order storage, a real payment provider, transactional emails, analytics consent, and privacy/legal pages before launch.
- The Unsplash images are external placeholders; confirm licensing and optimize/host final brand photography.
- Run `npm run typecheck` and `npm run build` before publishing.
