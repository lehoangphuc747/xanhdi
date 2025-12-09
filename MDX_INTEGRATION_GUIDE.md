# MDX Integration Guide for Hành Trình Page

## 📚 Overview

The Xanh Đi website now supports **MDX** (Markdown + JSX) for creating rich, interactive journey content. This guide explains the Astro docs findings and how to implement MDX for the HanhTrinh section.

## 🎯 What is MDX?

MDX allows you to:
- Write in **Markdown syntax** (familiar and simple)
- **Embed JSX components** directly in content
- Use **JavaScript expressions** for dynamic content
- Keep content **separated from code** (content collections pattern)

Example:
```mdx
# My Journey

import ImageGallery from '../components/ImageGallery.astro';

This is **markdown** text with a component:

<ImageGallery photos={photos} />
```

## 📁 Setup Summary

### 1. ✅ Installed @astrojs/mdx
```bash
npm install @astrojs/mdx
```

### 2. ✅ Updated astro.config.mjs
```javascript
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
});
```

### 3. ✅ Created Content Collections
- **Location**: `src/content.config.ts`
- **Collection**: `hanh-trinh`
- **MDX Files**: `src/content/hanh-trinh/*.mdx`

### 4. ✅ Folder Structure Created
```
src/
├── content/
│   ├── hanh-trinh/
│   │   ├── sample-post.mdx      (Example file)
│   │   ├── README.md            (Documentation)
│   │   └── [add more .mdx files]
│   └── content.config.ts        (Collection schema)
```

## 📝 How to Create Journey Posts

### Step 1: Create a New MDX File
Create a file in `src/content/hanh-trinh/` with kebab-case naming:
```
src/content/hanh-trinh/my-awesome-journey.mdx
```

### Step 2: Add Frontmatter
All MDX files require YAML frontmatter:
```yaml
---
title: "Journey Title"
description: "Brief description"
pubDate: 2024-12-09
author: "Author Name"
image: "/images/cover.jpg"
slug: "journey-slug"
tags: ["tag1", "tag2"]
---
```

### Step 3: Write Content
Use Markdown + JSX:
```mdx
# Main Heading

This is regular **markdown** content.

## Subsection

- List item 1
- List item 2

```code block```

### Component Example
import LocationCard from '../components/LocationCard.astro';

<LocationCard 
  name="Sapa, Lao Cai"
  description="Beautiful mountain town"
/>
```

## 🔗 Using MDX in Pages

### Query All Journey Posts
```astro
---
import { getCollection } from 'astro:content';

// Get all journey posts
const journeyPosts = await getCollection('hanh-trinh');

// Sort by date (newest first)
const sorted = journeyPosts.sort((a, b) => 
  b.data.pubDate - a.data.pubDate
);
---

{sorted.map(post => (
  <article>
    <h2>{post.data.title}</h2>
    <p>{post.data.description}</p>
  </article>
))}
```

### Render Individual Post
```astro
---
import { getEntry } from 'astro:content';

// Get specific post
const post = await getEntry('hanh-trinh', 'my-awesome-journey');
const { Content } = await post.render();
---

<article>
  <h1>{post.data.title}</h1>
  <img src={post.data.image} alt={post.data.title} />
  
  {/* Render the MDX content */}
  <Content />
</article>
```

## 📋 Frontmatter Fields Reference

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `title` | string | ✅ | "Autumn in Sapa" |
| `description` | string | ✅ | "A journey through autumn" |
| `pubDate` | date | ✅ | 2024-10-15 |
| `author` | string | ❌ | "Xanh Team" |
| `image` | string | ❌ | "/images/sapa.jpg" |
| `slug` | string | ✅ | "autumn-sapa-2024" |
| `tags` | array | ❌ | ["autumn", "sapa"] |

## 💡 MDX Features & Examples

### 1. Export Variables
```mdx
export const season = "Autumn"
export const year = 2024

This journey is in {season} of {year}!
```

### 2. Import & Use Components
```mdx
import Gallery from '../components/ImageGallery.astro';
import Map from '../components/LocationMap.astro';

# Journey Details

<Gallery images={journeyPhotos} />

<Map coordinates={{ lat: 22.34, lon: 103.83 }} />
```

### 3. Dynamic Content
```mdx
export const getWeather = async () => {
  const response = await fetch('https://api.weather.com/...');
  return response.json();
}

const weather = await getWeather();

Current conditions: {weather.temp}°C
```

### 4. Standard Markdown
```mdx
# Heading 1
## Heading 2

**Bold** and *italic*

- Bullet list
- Another item

> Blockquote

[Link text](https://example.com)

![Image alt](./image.jpg)
```

## 🎨 Integration with HanhTrinh Page

To integrate MDX posts with the main journey page:

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';

const allPosts = await getCollection('hanh-trinh');
const sortedPosts = allPosts.sort((a, b) => 
  b.data.pubDate - a.data.pubDate
);
---

<Layout title="Hành Trình">
  <h1>Journey Posts</h1>
  
  {sortedPosts.map(post => (
    <article>
      <h2>{post.data.title}</h2>
      <p>{post.data.description}</p>
      <img src={post.data.image} alt={post.data.title} />
      <p>Tags: {post.data.tags.join(', ')}</p>
      <a href={`/journeys/${post.data.slug}`}>Read More</a>
    </article>
  ))}
</Layout>
```

## 🔍 Astro Docs Reference

Key information from Astro documentation:

1. **MDX Installation**: `astro add mdx` or manual install
2. **No Configuration Needed**: Just add to integrations
3. **Content Collections**: Recommended for managing content
4. **Markdown Features Supported**:
   - Frontmatter (YAML/TOML)
   - GitHub-flavored Markdown
   - Syntax highlighting
   - Custom remark/rehype plugins (optional)

5. **File Locations**:
   - MDX in `src/pages/` → auto-routes (e.g., `/pages/blog.mdx` → `/blog`)
   - MDX in `src/content/` → collection files (queried via `getCollection()`)

## 📚 File Locations Reference

```
src/
├── content/
│   ├── hanh-trinh/              👈 Journey content (collections)
│   │   ├── sample-post.mdx
│   │   └── README.md
│   └── content.config.ts        👈 Schema definitions
├── components/
│   └── HanhTrinh/               👈 Journey components
│       ├── Timeline.astro
│       ├── TimelineGrid.astro
│       └── ... (other components)
├── pages/
│   └── HanhTrinh.astro          👈 Main journey page
├── layouts/
│   └── Layout.astro
└── assets/
```

## 🚀 Next Steps

1. **Create Journey Posts**
   - Add `.mdx` files to `src/content/hanh-trinh/`
   - Use the schema defined in `content.config.ts`

2. **Query Posts in Pages**
   - Use `getCollection('hanh-trinh')` to fetch all posts
   - Use `getEntry()` for individual posts

3. **Create Post Detail Page**
   - Create `src/pages/journeys/[slug].astro` for dynamic routes
   - Display full post content with `<Content />` component

4. **Add Components to Posts**
   - Create reusable Astro components in `src/components/`
   - Import and use them in `.mdx` files

## 📖 File Structure Example

```
src/content/hanh-trinh/
├── sample-post.mdx              (Already created)
├── autumn-sapa-2024.mdx         (Create these)
├── spring-hanoi-2025.mdx
├── summer-beach-trip.mdx
├── winter-mountain-trek.mdx
└── README.md                    (Documentation)
```

## ✅ Current Build Status

- ✅ MDX integration installed and configured
- ✅ Content collection defined (`hanh-trinh`)
- ✅ Sample MDX file created
- ✅ Build successful - ready to add more posts!

---

**Next Action**: Start creating MDX files in `src/content/hanh-trinh/` for your journey stories!
