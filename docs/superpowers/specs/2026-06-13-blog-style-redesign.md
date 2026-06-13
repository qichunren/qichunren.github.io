# Blog Style Redesign — Design Spec

**Date:** 2026-06-13
**Status:** Approved
**Project:** qichunren.github.io (Astro v6 + Tailwind CSS v4 personal blog)

## Overview

Full redesign of the personal developer blog to achieve a **Playful Personal** aesthetic with excellent cross-platform performance. The redesign stays within the existing Astro + Tailwind v4 architecture, using CSS-first `@theme` design tokens as the foundation.

### Goals

- Warm, friendly, personal visual identity
- Responsive across mobile, tablet, desktop, and wide screens
- Full dark mode support (system preference + manual toggle)
- CJK-optimized typography (Chinese + English mixed content)
- Clean print stylesheet
- Accessible (4.5:1 contrast minimum)

## Design Tokens

### Color Palette

| Role | Light Mode | Dark Mode |
|------|-----------|-----------|
| Background | `#fffbeb` (warm-50) | `#1c1917` (warm-gray-900) |
| Surface | `#fef3c7` (warm-100) | `#292524` (warm-gray-800) |
| Card bg | `#ffffff` | `#292524` |
| Text primary | `#1c1917` (warm-gray-900) | `#fafaf9` (warm-gray-50) |
| Text muted | `#78716c` (warm-gray-500) | `#a8a29e` (warm-gray-400) |
| Accent | `#f59e0b` (amber-500) | `#fbbf24` (amber-400) |
| Accent hover | `#b45309` (amber-700) | `#fcd34d` (amber-300) |
| Border | `#fde68a` (amber-200) | `#44403c` (warm-gray-700) |

### Typography

**Font stack:**
- Headings/body: `'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif`
- Code: `'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace`

**Type scale:**

| Element | Size | Weight | Line-height | Usage |
|---------|------|--------|------------|-------|
| h1 | 2.25rem | 800 | 1.2 | Post titles |
| h2 | 1.5rem | 700 | 1.3 | Section headings |
| h3 | 1.25rem | 600 | 1.35 | Sub-sections |
| body | 1.125rem | 400 | 1.85 | Reading text |
| small | 0.875rem | 400 | 1.5 | Meta, dates |
| code | 0.85rem | 400 | 1.6 | Code blocks |

**CJK notes:** 1.85 line-height for Chinese body text (needs more breathing room than Latin). Fonts loaded with `font-display: swap` from Google Fonts.

### Spacing Scale

| Token | Size | Usage |
|-------|------|-------|
| xs | 4px (p-1) | Tight inline |
| sm | 8px (p-2) | Card padding |
| md | 16px (p-4) | Content padding |
| lg | 24px (p-6) | Section gap |
| xl | 32px (p-8) | Page margin |
| 2xl | 48px (p-12) | Major sections |

## Layout Strategy

### Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 640px | 16px padding, stacked nav, full-width content |
| Tablet | 640-1024px | 24px padding, inline nav, max-w-2xl content |
| Desktop | 1024-1440px | 32px padding, max-w-3xl content |
| Wide | > 1440px | Centered content with soft bg gradient |

### Background

- Light mode: subtle warm gradient (`#fffbeb` → `#fef3c7` → `#fffbeb`)
- Dark mode: rich depth gradient (`#1c1917` → `#292524` → `#1c1917`)
- Content cards: white (light) / `#292524` (dark), bordered with amber tones

## Components

### Navigation (`Nav.astro`)

- Fixed top bar with `backdrop-blur` glass effect
- Background: `rgba(255,251,235,0.95)` light / `rgba(28,25,23,0.95)` dark
- Replaces GitHub avatar URL with CSS initials avatar (amber gradient circle with "Q")
- Active page indicator: amber underline + bold text
- Mobile: hamburger menu with icon-prefixed items, expands to full menu
- Optional dark mode toggle (sun/moon icon)

### Homepage Post Cards (`index.astro`)

- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Each card: white background, amber-tinted border, rounded corners
- Category pill badges in amber at card top
- Title + date + reading time
- Hover: border turns amber-500, subtle lift (transform scale 1.01)

### Post Detail (`Post.astro` / `[...slug].astro`)

- Category pills at top (extracted from frontmatter `categories`)
- Reading time estimate
- h2 headings with amber left-border accent (3px solid)
- Code blocks: `#292524` background in both modes, amber syntax highlighting
- Scroll-aware sticky header with progress bar
- Body text: 1.125rem, 1.85 line-height, max-width for comfortable reading

### Dev Tips Listing (`dev-tips/index.astro`)

- 2-column grid (1 on mobile)
- Cards with amber left-border accent
- Title + "Quick reference" label

### About Page (`about.astro`)

- Large initials avatar (64px) at top
- Name + role header
- Skills as amber pill tags
- Body text with comfortable line-height

### 404 Page (`404.astro`)

- Centered layout with search emoji
- Large "404" heading
- Bilingual message (English + Chinese)
- Amber CTA button "Back to Home"

## Dark Mode

- **Primary:** CSS `@media (prefers-color-scheme: dark)` — respects OS setting, no JS required
- **Secondary:** Manual toggle via nav icon, stores preference in `localStorage`, overrides system setting
- Tailwind `dark:` variant used throughout for dark-mode-specific utility classes

## Print Styles

Applied via `@media print` in `global.css`:
- Hide nav, scroll-to-top button, and other non-content UI
- Black text on white background (override warm theme)
- Remove shadows, borders, and background gradients
- Show full URLs after links: `a[href]::after { content: " (" attr(href) ")" }`
- Avoid page breaks inside code blocks (`pre, code { break-inside: avoid }`)

## Implementation Order

1. **global.css** — Add `@theme` block with design tokens, `@media (prefers-color-scheme: dark)`, Google Fonts import, `@media print`, and updated `.post-content` styles
2. **Nav.astro** — Redesign with glass effect, initials avatar, amber accents, dark mode toggle
3. **Base.astro** — Update body classes, main container styling, warm background
4. **Post.astro / DevTip.astro / Wiki.astro** — Update layouts with new typography, spacing, category pills, reading time
5. **index.astro** — Redesign as card grid with category badges
6. **about.astro** — Skills pills, initials avatar, updated layout
7. **404.astro** — Bilingual design with amber CTA
8. **main.js** — Update scroll behaviors, add dark mode toggle logic
9. **Cleanup** — Remove unused classes (`list-reset`, `card-img-top`, `rounded-circle`, etc.)

## Files to Modify

| File | Type | Changes |
|------|------|---------|
| `src/styles/global.css` | Styles | Design tokens, dark mode, fonts, print, updated post-content |
| `src/components/Nav.astro` | Component | Glass effect, initials avatar, amber accents, toggle |
| `src/layouts/Base.astro` | Layout | Warm bg, updated structure |
| `src/layouts/Post.astro` | Layout | Category pills, reading time, scroll header |
| `src/layouts/DevTip.astro` | Layout | Updated typography and spacing |
| `src/layouts/Wiki.astro` | Layout | Updated typography and spacing |
| `src/pages/index.astro` | Page | Card grid, category badges |
| `src/pages/about.astro` | Page | Skills pills, avatar, updated layout |
| `src/pages/404.astro` | Page | Bilingual redesign |
| `src/pages/dev-tips/index.astro` | Page | Card grid with left-border accent |
| `public/scripts/main.js` | Script | Dark mode toggle, updated scroll logic |

## Out of Scope

- Content changes (existing Markdown posts stay as-is)
- New pages or routes
- Image assets or illustrations
- RSS feed or SEO metadata changes
- Comment systems or third-party integrations
