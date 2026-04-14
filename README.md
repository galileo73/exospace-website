# ExoSpace Engineering & Consulting Website

Production-oriented React, Vite and Tailwind CSS website for ExoSpace Engineering & Consulting s.r.o., a Prague-based boutique engineering and consulting company.

## Sitemap and Content Architecture

- Home: positioning, credibility intro, service pillars, why ExoSpace, sectors and final CTA.
- Services: six detailed service sections with scope, use cases and conversion path.
- Sectors: space systems, satellite and ground segment, GNSS and secure infrastructure, defence and security-related technical activities, digital and technical organizations.
- About: Prague and European profile, boutique company approach, managing-director-led positioning and senior technical orientation.
- Contact: direct inquiry route, mailto-backed contact form and service-fit framing.

Core positioning: senior engineering and consulting support for complex technical programmes.

Service pillars:

- Systems Engineering Support
- Technical Consulting and Reviews
- Validation and Technical Assurance
- Technical Studies and Expert Assessments
- Digital / IT / Web Support
- Training and Knowledge Transfer

## Visual Design System

- Palette: carbon black and graphite base, cool steel neutrals, restrained teal/blue/green signal accents.
- Typography: system-first Inter stack for crisp executive readability.
- Layout: generous spacing, strong section hierarchy, restrained motion, low visual noise.
- Components: compact navigation, page heroes, section headers, CTA bands, service cards, sector blocks, contact form and footer.
- Imagery: ExoSpace brand artwork extracted from the provided company profile deck, used as the hero and Open Graph image placeholder.

## Component Structure

```text
src/
  assets/
    exospace-hero.png
    exospace-wordmark.png
  components/
    ButtonLink.tsx
    CTASection.tsx
    PageHero.tsx
    SEO.tsx
    SectionHeader.tsx
    SiteLink.tsx
  data/
    site.ts
  layouts/
    SiteLayout.tsx
  pages/
    About.tsx
    Contact.tsx
    Home.tsx
    Sectors.tsx
    Services.tsx
  utils/
    navigation.tsx
```

## SEO Foundation

- Unique metadata per page through `src/components/SEO.tsx`.
- Canonical URLs based on `https://www.exospace.eu`.
- Open Graph and Twitter card metadata.
- Organization and WebSite structured data placeholders.
- `public/robots.txt` and `public/sitemap.xml` placeholders.
- Semantic page structure with logical heading hierarchy and internal linking.

Update `src/data/site.ts`, `public/robots.txt` and `public/sitemap.xml` when the final production domain and email address are confirmed.

## Contact Form Integration

The form currently uses a mailto fallback so inquiries can be drafted without a backend. For production, replace `handleSubmit` in `src/pages/Contact.tsx` with a POST to the chosen CRM, form API or serverless endpoint, then show a success or error state from the API response.

## Future CMS or Backend Notes

- Move `services`, `sectors`, `differentiators` and SEO entries from `src/data/site.ts` into a headless CMS when content editing is needed.
- Keep page-level metadata explicit rather than generating it from generic templates.
- Add a server-side contact endpoint with spam protection and rate limiting before replacing the mailto fallback.
- If hosted as a single-page app, configure the host to rewrite `/services`, `/sectors`, `/about` and `/contact` to `index.html`.

## Setup

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

This repository intentionally does not include a generated `package-lock.json` because the local environment used for the rebuild did not have Node/npm available. Running `npm install` will create a fresh lockfile.
