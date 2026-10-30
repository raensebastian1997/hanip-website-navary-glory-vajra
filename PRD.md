Clone the website https://www.rariyosya.com/ into a production-ready Next.js (App Router) project using TYPESCRIPT ONLY. Rebrand entirely as:

- Brand / Company name: "Navary Glory Vajra"
- Short name (PWA): "Navary Glory"
- Domain / metadataBase: "https://legalinnavary.id"

IMPORTANT RULES:
- The source URL https://www.rariyosya.com/ is ONLY for data extraction.
- Do NOT keep "Rariyosya", "rariyosya.com", or "www.rariyosya.com" anywhere in the output (UI, JSON, metadata, PWA, sitemap, robots, structured data, README). Only allowed in the README's "Source" note.
- Replace every "Rariyosya" → "Navary Glory Vajra".
- Replace every "rariyosya.com" → "legalinnavary.id".
- Keep WhatsApp links/phone numbers from the source unless explicitly changed.

────────────────────────────────────────
0. TYPESCRIPT ENFORCEMENT (CRITICAL)
────────────────────────────────────────
The ENTIRE project MUST be TypeScript. Strictly enforce:

• `tsconfig.json` with:
  – "strict": true
  – "noImplicitAny": true
  – "strictNullChecks": true
  – "noUncheckedIndexedAccess": true
  – "jsx": "preserve"
  – "moduleResolution": "bundler"
  – "paths": { "@/*": ["./*"] }
  – "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
• ALL source files must be `.ts` or `.tsx`. NO `.js` or `.jsx` source files (except the auto-generated service worker `public/sw.js` from next-pwa, which is unavoidable — but configure next-pwa with a TypeScript source `sw.ts` compiled if possible).
• Config files as TypeScript where supported:
  – `next.config.ts` (Next.js 15+) — use TS config
  – `tailwind.config.ts`
  – `postcss.config.ts` (or .mjs if TS not supported)
  – `eslint.config.ts` (flat config with typescript-eslint)
• Node scripts / helpers in `scripts/` folder must be `.ts` and run via `tsx` or `ts-node` (add `tsx` as devDependency).
• Create `types/` folder with strict interfaces for ALL JSON data:
  – `types/site.ts`       → `SiteData`
  – `types/hero.ts`       → `HeroData`
  – `types/packages.ts`   → `Package`, `PackagesData`
  – `types/why-us.ts`     → `WhyUsItem`
  – `types/faq.ts`        → `FaqItem`
  – `types/news.ts`       → `NewsArticle`
  – `types/footer.ts`     → `FooterData`
• In `lib/getData.ts`, import JSON with proper type assertions:
  `import siteData from '@/data/site.json';` typed as `SiteData` — use `satisfies` operator where suitable.
• Every React component must have explicit prop types (interfaces or type aliases). No `any`. Use `React.FC` or plain typed functions.
• Every function must have return type annotations.
• `package.json` scripts must include:
  – `"typecheck": "tsc --noEmit"`
  – `"lint": "next lint"`
• Verify `npm run typecheck` passes with zero errors before finishing.

────────────────────────────────────────
1. DATA EXTRACTION → STATIC JSON
────────────────────────────────────────
• Crawl https://www.rariyosya.com/ and extract ALL visible content: headings, paragraphs, package names, prices, feature lists, FAQ items, “Why Choose Us” points, contact/WhatsApp links.
• Save to `data/` as JSON (with matching types from `types/`):
  – `data/site.json`     → SiteData (name: "Navary Glory Vajra", domain: "legalinnavary.id", title, description, WhatsApp)
  – `data/hero.json`     → HeroData
  – `data/packages.json` → PackagesData (id, name, price, features[], whatsappLink)
  – `data/why-us.json`   → WhyUsItem[]
  – `data/faq.json`      → FaqItem[]
  – `data/footer.json`   → FooterData
  – `data/news.json`     → NewsArticle[] (empty array if no news section)
• Indonesian language for content (except brand/domain replacements).

────────────────────────────────────────
2. PROJECT STRUCTURE (Next.js App Router + TS)
────────────────────────────────────────
app/
  layout.tsx          → root layout, metadata, fonts, manifest link
  page.tsx            → home page
  manifest.ts         → PWA manifest (typed: MetadataRoute.Manifest)
  sitemap.ts          → typed: MetadataRoute.Sitemap
  robots.ts           → typed: MetadataRoute.Robots
components/
  Hero.tsx
  Packages.tsx
  WhyUs.tsx
  Faq.tsx
  Footer.tsx
  Navbar.tsx
  InstallPrompt.tsx   → "use client", typed BeforeInstallPromptEvent
data/                 → JSON files
lib/
  getData.ts          → typed helper functions
types/                → all interfaces
public/
  icons/
  images/
next.config.ts
tailwind.config.ts
tsconfig.json
• All pages responsive, mobile-first, Tailwind CSS.
• Match source site visual design (colors, spacing, typography). Replace brand text with "Navary Glory Vajra".

────────────────────────────────────────
3. PWA — INSTALLABLE ON MOBILE
────────────────────────────────────────
• Install `@ducanh2912/next-pwa` (TS-friendly for Next 14/15) or `next-pwa`.
• Configure in `next.config.ts` with `withPWA`:
  – dest: 'public', register: true, skipWaiting: true
  – disable: process.env.NODE_ENV === 'development'
• `app/manifest.ts` returns `MetadataRoute.Manifest` with:
  – name: "Navary Glory Vajra", short_name: "Navary Glory"
  – description from site meta, start_url: "/", display: "standalone"
  – background_color: "#ffffff", theme_color: match primary color
  – icons: 192x192, 512x512 in public/icons/
• `InstallPrompt.tsx` typed component:
  – Declare `interface BeforeInstallPromptEvent extends Event { prompt(): Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> }`
  – Listen `beforeinstallprompt`, show install button on mobile.

────────────────────────────────────────
4. SEO — EASILY DISCOVERABLE ON GOOGLE
────────────────────────────────────────
• `app/layout.tsx` exports `metadata` typed as `Metadata`:
  – metadataBase: new URL("https://legalinnavary.id")
  – title: { default: "Navary Glory Vajra", template: "%s | Navary Glory Vajra" }
  – description, openGraph, twitter, alternates.canonical
• JSON-LD structured data (typed schemas in `types/seo.ts`):
  – Organization: name "Navary Glory Vajra", url "https://legalinnavary.id"
  – Service/Offer per package
  – FAQPage for FAQ section
  → Render via `<script type="application/ld+json" dangerouslySetInnerHTML>`
• `sitemap.ts` returns `MetadataRoute.Sitemap` using "https://legalinnavary.id".
• `robots.ts` returns `MetadataRoute.Robots` pointing to sitemap.
• All images have alt text. Semantic HTML (header, main, section, footer).

────────────────────────────────────────
5. RESPONSIVE & MOBILE-FRIENDLY
────────────────────────────────────────
• Tailwind CSS mobile-first breakpoints.
• Hamburger menu on mobile, cards stack vertically.
• Touch-friendly tap targets.
• Include `viewport` metadata export.

────────────────────────────────────────
6. WHATSAPP INTEGRATION
────────────────────────────────────────
• All "Konsultasi Gratis" buttons link to WhatsApp URLs from source data.
• `<a target="_blank" rel="noopener noreferrer">`.

────────────────────────────────────────
7. DEPLOYMENT & BUILD
────────────────────────────────────────
• `README.md` includes:
  – Requirements: Node.js 18+, npm 9+
  – `npm install` / `npm run dev` / `npm run typecheck` / `npm run build`
  – Deploy to Vercel/Netlify
  – Set domain to legalinnavary.id
• `npm run typecheck` and `npm run build` MUST succeed with zero TS errors.
• Standard Next.js server build (avoid `output: 'export'` unless PWA is verified to work).

────────────────────────────────────────
8. FINAL VERIFICATION CHECKLIST
────────────────────────────────────────
Before finishing, verify:
☑ No `.js`/`.jsx` source files (except `public/sw.js` from next-pwa)
☑ `npm run typecheck` → 0 errors
☑ `npm run build` → success
☑ No string "Rariyosya" / "rariyosya.com" anywhere (search: `grep -ri "rariyosya" .`)
☑ All branding = "Navary Glory Vajra", domain = "legalinnavary.id"
☑ PWA manifest has correct name/short_name
☑ Sitemap, robots, metadata use legalinnavary.id
☑ JSON-LD structured data present
☑ WhatsApp links intact
☑ README explains source URL note

If blocked at any step, ask before proceeding. Deliver a fully functional, TypeScript-strict, installable PWA, SEO-optimized, responsive Next.js project.