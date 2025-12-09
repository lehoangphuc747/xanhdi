# Xanh Đi - Project Structure & MDX Setup

## 🏗️ Complete Project Structure

```
xanhdi/
├── 📄 astro.config.mjs          ✅ MDX integration added
├── 📄 package.json              ✅ @astrojs/mdx installed
├── 📄 tsconfig.json
├── 📄 MDX_INTEGRATION_GUIDE.md   ← Start here!
│
├── 📁 src/
│   ├── 📁 assets/               (Images, fonts)
│   │   └── (image files)
│   │
│   ├── 📁 components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── 📁 HanhTrinh/        (Journey-specific components)
│   │       ├── Timeline.astro
│   │       ├── TimelineGrid.astro
│   │       ├── TimelineMoRong.astro
│   │       ├── TimelineFilter.astro
│   │       └── HanhTrinhScript.astro
│   │
│   ├── 📁 content/              ✨ Content Collections
│   │   ├── 📄 content.config.ts ✅ Schema defined
│   │   │
│   │   └── 📁 hanh-trinh/       👈 Journey MDX files go here
│   │       ├── 📝 sample-post.mdx     (Example)
│   │       ├── 📄 README.md           (Documentation)
│   │       ├── 📝 (Add more .mdx)
│   │       └── [Optional subdirs]
│   │
│   ├── 📁 layouts/
│   │   └── Layout.astro         (Main layout wrapper)
│   │
│   ├── 📁 pages/
│   │   ├── index.astro          (Home page)
│   │   └── HanhTrinh.astro      (Journey page with sorting)
│   │
│   └── 📁 styles/
│       └── (CSS/SCSS files)
│
├── 📁 public/
│   ├── favicon.svg
│   ├── 📁 images/               (Static images)
│   └── (other static assets)
│
└── 📁 dist/                      (Build output - auto-generated)
    ├── HanhTrinh/
    │   └── index.html
    └── index.html
```

## 🗂️ Content Collection Structure

### The `hanh-trinh` Collection
**Location**: `src/content/hanh-trinh/`

```
hanh-trinh/
├── README.md                    (Collection documentation)
│
├── sample-post.mdx             (✅ Example provided)
│   ├── Demonstrates frontmatter schema
│   ├── Shows MDX syntax examples
│   └── Ready to use as template
│
├── [Your Journey Files].mdx      (Create these!)
│   ├── autumn-sapa-2024.mdx
│   ├── spring-hanoi-2025.mdx
│   ├── summer-beach-trip.mdx
│   └── winter-mountain-trek.mdx
│
└── [Optional: Organize by year]
    ├── 2024/
    │   ├── autumn-journey.mdx
    │   └── summer-journey.mdx
    └── 2025/
        └── spring-journey.mdx
```

## 📋 File Purposes

### Core Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| `astro.config.mjs` | Astro configuration + MDX integration | ✅ Updated |
| `package.json` | Dependencies (@astrojs/mdx added) | ✅ Updated |
| `src/content.config.ts` | Content collection schemas | ✅ Created |

### Content Files

| Location | Purpose | Status |
|----------|---------|--------|
| `src/content/hanh-trinh/` | MDX journey posts | ✅ Ready |
| `src/content/hanh-trinh/sample-post.mdx` | Example template | ✅ Created |
| `src/content/hanh-trinh/README.md` | Collection guide | ✅ Created |

### Page Components

| File | Purpose | Status |
|------|---------|--------|
| `src/pages/HanhTrinh.astro` | Main journey page | ✅ Ready |
| `src/components/HanhTrinh/` | Journey UI components | ✅ Complete |

## 🔄 Data Flow

```
MDX Files (hanh-trinh/*.mdx)
        ↓
Content Config (content.config.ts)
        ↓
Collection Schema (Zod validation)
        ↓
getCollection('hanh-trinh') API
        ↓
HanhTrinh.astro Page
        ↓
Timeline/Grid/Expanded Views
```

## 📝 MDX File Anatomy

```mdx
---
title: "Journey Title"           ← Required
description: "Short desc"       ← Required  
pubDate: 2024-10-15            ← Required
author: "Name"                  ← Optional
image: "/images/cover.jpg"      ← Optional
slug: "unique-identifier"       ← Required
tags: ["tag1", "tag2"]          ← Optional
---

# Content Starts Here

Regular **Markdown** syntax...

## Sections

import Component from '../path/Component.astro';

<Component prop="value" />

More content...
```

## 🚀 Workflow for Creating Content

1. **Create File**
   ```bash
   touch src/content/hanh-trinh/journey-name.mdx
   ```

2. **Add Frontmatter**
   ```yaml
   ---
   title: "My Journey"
   description: "Description"
   pubDate: 2024-12-09
   slug: "my-journey"
   ---
   ```

3. **Write Content**
   ```mdx
   # My Journey Title
   
   Content with **markdown**...
   ```

4. **Test Build**
   ```bash
   npm run build
   ```

5. **Preview**
   ```bash
   npm run preview
   ```

## 📂 Adding New Journey Posts

### Quick Checklist

- [ ] Create new `.mdx` file in `src/content/hanh-trinh/`
- [ ] Add required frontmatter fields
- [ ] Write journey content
- [ ] Add images to `public/images/`
- [ ] Import any custom components
- [ ] Test with `npm run build`
- [ ] Preview with `npm run preview`

## 🎯 Integration Points

### How MDX connects with HanhTrinh.astro

```astro
---
// In HanhTrinh.astro
import { getCollection } from 'astro:content';

// Query all journey posts
const journeyPosts = await getCollection('hanh-trinh');

// Use in templates
{journeyPosts.map(post => (
  <article>
    <h2>{post.data.title}</h2>
    <img src={post.data.image} />
  </article>
))}
---
```

## 📖 Documentation Files

- **`MDX_INTEGRATION_GUIDE.md`** (This workspace root)
  - Complete MDX setup guide
  - Feature examples
  - Integration instructions

- **`src/content/hanh-trinh/README.md`** 
  - Collection-specific documentation
  - Field descriptions
  - Best practices

- **`src/content/hanh-trinh/sample-post.mdx`**
  - Working example
  - Template to copy from

## ✅ Current Status

- ✅ MDX integration installed
- ✅ Configuration files updated
- ✅ Content collection defined
- ✅ Sample post created
- ✅ Build successful
- ✅ Ready for new content!

## 🔗 Key Links

- [Astro MDX Documentation](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Content Collections Guide](https://docs.astro.build/en/guides/content-collections/)
- [MDX Syntax Reference](https://mdxjs.com/docs/what-is-mdx/)

---

**Next Step**: Create your first journey post in `src/content/hanh-trinh/`! 
Copy `sample-post.mdx` as a template and customize it.
