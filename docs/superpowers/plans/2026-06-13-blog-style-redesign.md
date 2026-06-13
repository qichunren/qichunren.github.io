# Blog Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the personal blog with a warm, playful personal aesthetic using Tailwind v4 design tokens, dark mode, CJK-optimized typography, and full responsive support.

**Architecture:** CSS-first design tokens via Tailwind v4 `@theme` define the color palette, fonts, and spacing. Components and layouts use these tokens with Tailwind utility classes. Dark mode uses CSS `prefers-color-scheme` media query with an optional manual JS toggle.

**Tech Stack:** Astro v6, Tailwind CSS v4 (with `@tailwindcss/postcss` and `@tailwindcss/typography`), vanilla JS for dark mode toggle.

---

## File Structure

| File | Responsibility |
|------|---------------|
| `src/styles/global.css` | Design tokens (@theme), fonts, dark mode, prose overrides, print styles, post-content styling |
| `src/layouts/Base.astro` | HTML shell: warm bg gradient, container, font import, dark mode init script |
| `src/components/Nav.astro` | Fixed nav: glass effect, initials avatar, amber active indicator, dark mode toggle button |
| `src/components/ScrollToTop.astro` | Scroll-to-top chevron (minor color tweak) |
| `src/layouts/Post.astro` | Blog post: category pills, reading time, scroll progress header |
| `src/layouts/DevTip.astro` | Dev tip: title header, post-content |
| `src/layouts/Wiki.astro` | Wiki page: minimal, post-content |
| `src/pages/index.astro` | Homepage: responsive card grid with category badges |
| `src/pages/about.astro` | About page: large avatar, skill pills |
| `src/pages/404.astro` | 404 page: bilingual, amber CTA |
| `src/pages/dev-tips/index.astro` | Dev tips listing: card grid with left-border accent |
| `public/scripts/main.js` | Nav toggle, scroll-to-top, scroll-aware header, dark mode toggle |

---

### Task 1: Design Tokens & Foundation Styles

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace global.css with design tokens, fonts, dark mode, and prose overrides**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Noto+Sans+SC:wght@400;600;700;800&display=swap');

@theme {
  --font-sans: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace;
}

/* Light mode (default) */
:root {
  --color-bg: #fffbeb;
  --color-surface: #fef3c7;
  --color-card: #ffffff;
  --color-text: #1c1917;
  --color-text-muted: #78716c;
  --color-accent: #f59e0b;
  --color-accent-hover: #b45309;
  --color-border: #fde68a;
  --color-border-strong: #fbbf24;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1c1917;
    --color-surface: #292524;
    --color-card: #292524;
    --color-text: #fafaf9;
    --color-text-muted: #a8a29e;
    --color-accent: #fbbf24;
    --color-accent-hover: #fcd34d;
    --color-border: #44403c;
    --color-border-strong: #57534e;
  }
}

/* Manual dark mode override (set by JS) */
:root.dark {
  --color-bg: #1c1917;
  --color-surface: #292524;
  --color-card: #292524;
  --color-text: #fafaf9;
  --color-text-muted: #a8a29e;
  --color-accent: #fbbf24;
  --color-accent-hover: #fcd34d;
  --color-border: #44403c;
  --color-border-strong: #57534e;
}
:root.light {
  --color-bg: #fffbeb;
  --color-surface: #fef3c7;
  --color-card: #ffffff;
  --color-text: #1c1917;
  --color-text-muted: #78716c;
  --color-accent: #f59e0b;
  --color-accent-hover: #b45309;
  --color-border: #fde68a;
  --color-border-strong: #fbbf24;
}

/* Base body */
body {
  background: linear-gradient(to bottom, var(--color-bg), var(--color-surface) 50%, var(--color-bg));
  color: var(--color-text);
  font-family: var(--font-sans);
  min-height: 100vh;
}

/* Post content styling */
.post-content {
  @apply p-4 text-lg mb-8;
}
.post-content p {
  @apply pb-4;
  line-height: 1.85;
}
.post-content p code {
  background-color: var(--color-surface);
  @apply py-1 px-2 rounded;
  font-size: 0.85em;
}
.post-content p em {
  color: var(--color-accent);
  font-style: italic;
}
.post-content div.highlighter-rouge {
  @apply mb-4;
}
.post-content > pre {
  background-color: var(--color-surface);
  @apply overflow-x-auto rounded-lg p-4;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.6;
}
.post-content div.highlight {
  background-color: #292524;
  color: #d6d3d1;
  @apply px-4 py-3 overflow-x-auto text-sm rounded-lg;
  font-family: var(--font-mono);
  line-height: 1.6;
}
.post-content code.language-plaintext {
  @apply py-1 px-2 rounded;
  background-color: var(--color-surface);
  font-size: 0.85em;
}
.post-content h2 {
  @apply font-bold text-2xl mt-8 mb-4;
  padding-left: 0.75rem;
  border-left: 3px solid var(--color-accent);
  color: var(--color-accent);
}
.post-content h3 {
  @apply font-bold text-xl mt-6 mb-3;
  color: var(--color-text);
}
.post-content ul {
  @apply list-inside list-disc;
}
.post-content ul li {
  @apply my-2;
  line-height: 1.85;
}
.post-content a {
  color: var(--color-accent);
  @apply underline mr-1;
  text-underline-offset: 2px;
}
.post-content a:hover {
  color: var(--color-accent-hover);
}
.post-content blockquote {
  border-left: 3px solid var(--color-accent);
  background-color: var(--color-surface);
  @apply pl-4 py-2 my-4 rounded-r-lg;
  color: var(--color-text-muted);
}

/* Print styles */
@media print {
  body {
    background: white !important;
    color: black !important;
    font-size: 12pt;
    line-height: 1.5;
  }
  nav, #header, #content_header, #scrolltop, #nav-toggle {
    display: none !important;
  }
  .post-content a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }
  pre, code {
    break-inside: avoid;
    background: #f5f5f5 !important;
    color: black !important;
    border: 1px solid #ddd;
  }
  .post-content h2 {
    border-left: none;
    padding-left: 0;
    color: black;
  }
  .post-content a {
    color: black;
    text-decoration: underline;
  }
  main {
    max-width: 100% !important;
    margin: 0 !important;
  }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with no CSS errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add design tokens, dark mode, CJK fonts, and print styles"
```

---

### Task 2: Base Layout Shell

**Files:**
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Update Base.astro with warm background gradient and dark mode init**

Replace the file content:

```astro
---
import "../styles/global.css";
import Nav from "../components/Nav.astro";
import ScrollToTop from "../components/ScrollToTop.astro";
import Analytics from "../components/Analytics.astro";

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Qichunren website" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <Analytics />
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="author" content="Qichunren" />
    <title>{title} - Qichunren blog</title>
  </head>

  <body>
    <Nav />
    <main class="container mx-auto mt-20 md:mt-20 px-4 md:px-6 lg:px-8 pb-12">
      <slot />
    </main>
    <footer class="text-center py-8 text-sm" style="color: var(--color-text-muted);">
      <p>&copy; {new Date().getFullYear()} Qichunren. Built with Astro.</p>
    </footer>
    <ScrollToTop />
  </body>
</html>

<script is:inline src="/scripts/main.js"></script>
<script is:inline>
  // Dark mode: check localStorage override, fallback to system preference
  (function() {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (stored === 'light') {
      document.documentElement.classList.add('light');
    }
  })();
</script>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds, no template errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: update base layout with warm bg, footer, and dark mode init"
```

---

### Task 3: Navigation Component

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Replace Nav.astro with redesigned glass-effect nav**

```astro
<nav
  id="header"
  class="flex items-center justify-between flex-wrap px-4 md:px-6 lg:px-8 py-3 fixed w-full z-20 top-0"
  style="background: rgba(255,251,235,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-border);"
>
  <a class="flex items-center flex-shrink-0 mr-6 no-underline" href="/">
    <div class="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm select-none"
      style="background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));">
      Q
    </div>
    <span class="text-xl font-bold pl-2 tracking-tight" style="color: var(--color-text);">
      Qichunren's blog
    </span>
  </a>

  <div class="flex items-center gap-2">
    <button
      id="theme-toggle"
      class="flex items-center px-2 py-2 rounded-lg text-sm cursor-pointer"
      style="color: var(--color-text-muted);"
      aria-label="Toggle dark mode"
    >
      <svg id="theme-icon-sun" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg id="theme-icon-moon" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>

    <div class="block lg:hidden">
      <button
        id="nav-toggle"
        class="flex items-center px-3 py-2 border rounded-lg text-sm cursor-pointer"
        style="color: var(--color-text-muted); border-color: var(--color-border);"
      >
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
  </div>

  <div
    class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden pt-4 lg:pt-0"
    id="nav-content"
  >
    <ul class="lg:flex justify-end flex-1 items-center gap-1">
      <li>
        <a
          class="inline-block py-2 px-3 rounded-lg text-sm font-medium transition-colors"
          style="color: var(--color-text);"
          href="/"
          >Posts</a
        >
      </li>
      <li>
        <a
          class="inline-block py-2 px-3 rounded-lg text-sm font-medium transition-colors"
          style="color: var(--color-text-muted);"
          href="/dev-tips"
          >Dev Tips</a
        >
      </li>
      <li>
        <a
          class="inline-block py-2 px-3 rounded-lg text-sm font-medium transition-colors"
          style="color: var(--color-text-muted);"
          href="/about"
          >About</a
        >
      </li>
      <li>
        <a
          class="inline-block py-2 px-3 rounded-lg text-sm font-medium transition-colors"
          style="color: var(--color-text-muted);"
          href="https://github.com/qichunren"
          >GitHub</a
        >
      </li>
    </ul>
  </div>
</nav>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: redesign nav with glass effect, initials avatar, and theme toggle"
```

---

### Task 4: ScrollToTop Component

**Files:**
- Modify: `src/components/ScrollToTop.astro`

- [ ] **Step 1: Update ScrollToTop color to amber**

```astro
<svg
  id="scrolltop"
  xmlns="http://www.w3.org/2000/svg"
  class="hidden fixed bottom-4 right-4 h-12 w-12 cursor-pointer p-2 rounded-full shadow-lg transition-opacity opacity-80 hover:opacity-100"
  style="background: var(--color-accent); color: white;"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
</svg>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ScrollToTop.astro
git commit -m "feat: restyle scroll-to-top button with amber accent"
```

---

### Task 5: Dark Mode Toggle & Updated main.js

**Files:**
- Modify: `public/scripts/main.js`

- [ ] **Step 1: Replace main.js with dark mode toggle + existing behaviors**

```javascript
document.addEventListener("DOMContentLoaded", function () {
  var checked_scroll_y = 0;
  var header = document.getElementById("header");
  var scrolltop = document.getElementById("scrolltop");
  var navToggle = document.getElementById("nav-toggle");
  var navContent = document.getElementById("nav-content");
  var themeToggle = document.getElementById("theme-toggle");
  var sunIcon = document.getElementById("theme-icon-sun");
  var moonIcon = document.getElementById("theme-icon-moon");

  function updateThemeIcon() {
    if (!sunIcon || !moonIcon) return;
    var isDark = document.documentElement.classList.contains("dark") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches &&
       !document.documentElement.classList.contains("light"));
    sunIcon.classList.toggle("hidden", !isDark);
    moonIcon.classList.toggle("hidden", isDark);
  }

  function applyTheme(theme) {
    document.documentElement.classList.remove("dark", "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", theme);
    updateThemeIcon();
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var currentIsDark = document.documentElement.classList.contains("dark") ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches &&
         !document.documentElement.classList.contains("light"));
      applyTheme(currentIsDark ? "light" : "dark");
    });
  }

  if (navToggle && navContent) {
    navToggle.addEventListener("click", function () {
      navContent.classList.toggle("hidden");
    });
  }

  if (scrolltop) {
    scrolltop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", function () {
    if (header) {
      if (window.scrollY - checked_scroll_y > 30) {
        checked_scroll_y = window.scrollY;
        header.style.transform = "translateY(-100%)";
      } else if (checked_scroll_y - window.scrollY > 30) {
        checked_scroll_y = window.scrollY;
        header.style.transform = "translateY(0)";
      }
    }

    if (scrolltop) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight / 3) {
        scrolltop.classList.remove("hidden");
      } else {
        scrolltop.classList.add("hidden");
      }
    }

    var contentHeader = document.getElementById("content_header");
    if (contentHeader) {
      if (window.scrollY > 200) {
        contentHeader.classList.remove("hidden");
      } else {
        contentHeader.classList.add("hidden");
      }
    }
  });
});
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds, JS is included inline.

- [ ] **Step 3: Commit**

```bash
git add public/scripts/main.js
git commit -m "feat: add dark mode toggle and smooth scroll-to-top"
```

---

### Task 6: Post Layout (with category pills & scroll header)

**Files:**
- Modify: `src/layouts/Post.astro`

- [ ] **Step 1: Replace Post.astro with category pills and scroll header**

```astro
---
import Base from "./Base.astro";

interface Props {
  title: string;
  date: Date;
  categories?: string[];
}

const { title, date, categories = [] } = Astro.props;
---

<Base title={title}>
  <div id="content_header" class="hidden items-center justify-center px-4 py-2 fixed w-full z-10 top-0 shadow-lg"
    style="background: rgba(255,251,235,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-border);">
    <div class="flex items-center gap-4 max-w-3xl w-full">
      <div class="w-1.5 h-1.5 rounded-full" style="background: var(--color-accent);"></div>
      <span class="font-semibold text-sm truncate" style="color: var(--color-text);">{title}</span>
      <div class="ml-auto flex items-center gap-2">
        <span class="text-xs" style="color: var(--color-text-muted);">
          {date.toISOString().slice(0, 10)}
        </span>
      </div>
    </div>
  </div>

  <div class="max-w-3xl mx-auto p-4">
    {
      categories.length > 0 && (
        <div class="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style="background: var(--color-surface); color: var(--color-accent);">
              {cat.toUpperCase()}
            </span>
          ))}
        </div>
      )
    }

    <h1 class="mb-3 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
      style="color: var(--color-text);">
      {title}
    </h1>

    <div class="mb-8 text-sm" style="color: var(--color-text-muted);">
      {date.toISOString().slice(0, 10)}
    </div>
  </div>

  <div class="post-content max-w-3xl mx-auto prose-lg">
    <slot />
  </div>
</Base>
```

- [ ] **Step 2: Update the blog post page to pass categories**

Since the post page (`src/pages/[...slug].astro`) already passes `post.data.title` and `post.data.date`, we need to also pass `post.data.categories`. Update `src/pages/[...slug].astro`:

```astro
<Post title={post.data.title} date={post.data.date} categories={post.data.categories}>
  <Content />
</Post>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. No type errors on categories prop (it's optional).

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Post.astro src/pages/[...slug].astro
git commit -m "feat: add category pills and reading-time to post layout"
```

---

### Task 7: DevTip Layout

**Files:**
- Modify: `src/layouts/DevTip.astro`

- [ ] **Step 1: Update DevTip.astro with warm theme styling**

```astro
---
import Base from "./Base.astro";

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<Base title={title}>
  <div id="content_header" class="hidden items-center justify-center px-4 py-2 fixed w-full z-10 top-0 shadow-lg"
    style="background: rgba(255,251,235,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-border);">
    <div class="flex items-center gap-4 max-w-3xl w-full">
      <div class="w-1.5 h-1.5 rounded-full" style="background: var(--color-accent);"></div>
      <span class="font-semibold text-sm truncate" style="color: var(--color-text);">{title}</span>
    </div>
  </div>

  <div class="max-w-3xl mx-auto p-4">
    <h1 class="mb-6 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight"
      style="color: var(--color-text);">
      {title}
    </h1>
  </div>

  <div class="post-content max-w-3xl mx-auto prose-lg">
    <slot />
  </div>
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/DevTip.astro
git commit -m "feat: update devtip layout with warm theme"
```

---

### Task 8: Wiki Layout

**Files:**
- Modify: `src/layouts/Wiki.astro`

- [ ] **Step 1: Update Wiki.astro**

```astro
---
import Base from "./Base.astro";

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<Base title={title}>
  <div class="max-w-3xl mx-auto p-4">
    <h1 class="mb-6 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight"
      style="color: var(--color-text);">
      {title}
    </h1>
  </div>

  <div class="post-content max-w-3xl mx-auto prose-lg">
    <slot />
  </div>
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Wiki.astro
git commit -m "feat: update wiki layout with warm theme"
```

---

### Task 9: Homepage Card Grid

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace index.astro with card grid and category badges**

```astro
---
import Base from "../layouts/Base.astro";
import { getCollection } from "astro:content";

function getPostUrl(id: string): string {
  const match = id.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
  if (match) {
    return `/${match[1]}/${match[2]}/${match[3]}/${match[4]}/`;
  }
  return `/${id}/`;
}

const posts = await getCollection("posts");
posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<Base title="Posts">
  <div class="max-w-5xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-2" style="color: var(--color-text);">
        Posts
      </h1>
      <p style="color: var(--color-text-muted);">
        Thoughts on development, tools, and life
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        posts.map((post) => (
          <a href={getPostUrl(post.id)} class="block no-underline">
            <article
              class="rounded-xl p-5 h-full transition-all duration-200 border hover:scale-[1.02]"
              style="background: var(--color-card); border-color: var(--color-border);"
            >
              {
                post.data.categories.length > 0 && (
                  <div class="flex flex-wrap gap-1.5 mb-3">
                    {post.data.categories.slice(0, 3).map((cat: string) => (
                      <span
                        class="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style="background: var(--color-surface); color: var(--color-accent);"
                      >
                        {cat.toUpperCase()}
                      </span>
                    ))}
                  </div>
                )
              }
              <h2 class="font-bold text-base md:text-lg leading-snug mb-2" style="color: var(--color-text);">
                {post.data.title}
              </h2>
              <time class="text-sm" style="color: var(--color-text-muted);">
                {post.data.date.toISOString().slice(0, 10)}
              </time>
            </article>
          </a>
        ))
      }
    </div>
  </div>
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: redesign homepage with responsive card grid and category badges"
```

---

### Task 10: About Page

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Replace about.astro with warm-themed skills layout**

```astro
---
import Base from "../layouts/Base.astro";

const skills = [
  "Ruby on Rails", "Hotwire", "AlpineJS", "React",
  "TailwindCSS", "PostgreSQL", "Redis", "Docker", "Figma",
];
---

<Base title="About">
  <div class="max-w-2xl mx-auto">
    <div class="rounded-2xl p-6 md:p-8 border" style="background: var(--color-card); border-color: var(--color-border);">
      <div class="flex items-center gap-4 mb-6 pb-6" style="border-bottom: 1px solid var(--color-border);">
        <div
          class="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-extrabold text-2xl md:text-3xl select-none shrink-0"
          style="background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));"
        >
          Q
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-extrabold" style="color: var(--color-text);">Qichunren</h1>
          <p style="color: var(--color-text-muted);">Independent WEB Developer</p>
        </div>
      </div>

      <div class="prose-lg" style="color: var(--color-text);">
        <p>
          I am an experienced and independent WEB developer with a focus on
          developing high-performance, secure, and user-friendly WEB applications.
          With years of development experience, I am proficient in using various
          tools and frameworks to complete projects.
        </p>

        <h2 style="border-left: 3px solid var(--color-accent); padding-left: 0.75rem; color: var(--color-accent);">Proficient Tools and Frameworks</h2>
        <div class="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span class="text-sm font-medium px-3 py-1 rounded-full" style="background: var(--color-surface); color: var(--color-accent);">
              {skill}
            </span>
          ))}
        </div>

        <h2 style="border-left: 3px solid var(--color-accent); padding-left: 0.75rem; color: var(--color-accent);">Project Experience</h2>
        <p>
          Throughout my years of development experience, I have participated in and
          completed multiple successful WEB application projects. These projects
          span different fields and scales, ranging from small business websites to
          large e-commerce platforms.
        </p>

        <h2 style="border-left: 3px solid var(--color-accent); padding-left: 0.75rem; color: var(--color-accent);">Why Choose Me?</h2>
        <p>
          Proficient in various development tools and frameworks, rich project
          experience, excellent coding abilities and attention to detail, strong team
          spirit, and high customer satisfaction.
        </p>
      </div>
    </div>
  </div>
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: redesign about page with skills pills and avatar"
```

---

### Task 11: 404 Page

**Files:**
- Modify: `src/pages/404.astro`

- [ ] **Step 1: Replace 404.astro with bilingual design**

```astro
---
import Base from "../layouts/Base.astro";
---

<Base title="404">
  <div class="max-w-lg mx-auto text-center py-16 md:py-24">
    <div class="text-6xl mb-4">&#x1F50D;</div>
    <h1 class="text-5xl md:text-6xl font-extrabold mb-4" style="color: var(--color-text);">404</h1>
    <p class="text-lg mb-2" style="color: var(--color-text-muted);">
      Page not found
    </p>
    <p class="text-base mb-8" style="color: var(--color-text-muted);">
      页面未找到
    </p>
    <a
      href="/"
      class="inline-block px-6 py-3 rounded-xl font-semibold text-white transition-colors no-underline"
      style="background: var(--color-accent);"
    >
      &larr; Back to Home
    </a>
  </div>
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: redesign 404 page with bilingual message and amber CTA"
```

---

### Task 12: Dev Tips Listing Page

**Files:**
- Modify: `src/pages/dev-tips/index.astro`

- [ ] **Step 1: Replace dev-tips/index.astro with card grid**

```astro
---
import Base from "../../layouts/Base.astro";
import { getCollection } from "astro:content";

const tips = await getCollection("dev-tips");
---

<Base title="Development Tips">
  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-2" style="color: var(--color-text);">
        Dev Tips
      </h1>
      <p style="color: var(--color-text-muted);">
        Quick references and useful snippets
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      {
        tips.map((tip) => (
          <a href={`/dev-tips/${tip.id.replace(/\.md$/, "")}`} class="block no-underline">
            <div
              class="rounded-lg p-4 transition-all duration-200 border hover:scale-[1.01]"
              style="background: var(--color-card); border-color: var(--color-border); border-left: 3px solid var(--color-accent);"
            >
              <h3 class="font-semibold text-base" style="color: var(--color-text);">
                {tip.data.title}
              </h3>
              <span class="text-xs mt-1 inline-block" style="color: var(--color-text-muted);">
                Quick reference
              </span>
            </div>
          </a>
        ))
      }
    </div>
  </div>
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/dev-tips/index.astro
git commit -m "feat: redesign dev-tips listing with card grid"
```

---

### Task 13: Final Build & Verification

**Files:**
- None (verification only)

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected: Build succeeds with no warnings or errors.

- [ ] **Step 2: Verify output structure**

Run: `ls dist/`
Expected: Contains `index.html`, `about/index.html`, `404.html`, `dev-tips/index.html`, blog post directories, wiki directories.

- [ ] **Step 3: Check for leftover legacy classes**

Run: `rg "list-reset|card-img-top|rounded-circle|has-navbar-fixed-top|page-index" src/`
Expected: No matches found (all legacy classes should be removed).

- [ ] **Step 4: Commit any remaining changes**

```bash
git add -A
git commit -m "chore: final cleanup after style redesign"
```
