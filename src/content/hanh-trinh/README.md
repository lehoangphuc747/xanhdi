# Hành Trình MDX Content Structure

This directory contains all MDX files for the Hành Trình (Journey) section of the website.

## 📁 Folder Structure

```
src/
├── content/
│   ├── hanh-trinh/          # Journey/Journey content MDX files
│   │   ├── sample-post.mdx  # Example journey post
│   │   ├── [year]/          # (Optional) Organize by year
│   │   └── ...
│   └── content.config.ts    # Collection definitions
├── pages/
│   └── HanhTrinh.astro      # Main journey page
└── components/
    └── HanhTrinh/           # Journey-related components
```

## 📝 Creating a Journey Post in MDX

### File Naming Convention
- Use kebab-case: `autumn-journey-2024.mdx`
- Include year in filename for better organization

### Frontmatter Schema

Every `.mdx` file in the `hanh-trinh` collection must include:

```yaml
---
title: "Post Title"
description: "Brief description of the journey"
pubDate: 2024-10-15
author: "Author Name" (optional)
image: "/images/cover.jpg" (optional)
slug: "unique-slug-identifier"
tags: ["tag1", "tag2"] (optional)
---
```

### Example MDX Content

```mdx
---
title: "Hành Trình Mùa Thu"
description: "Khám phá vẻ đẹp mùa thu"
pubDate: 2024-10-15
slug: "autumn-journey"
tags: ["mùa thu", "khám phá"]
---

# Hành Trình Mùa Thu

Content here with **Markdown** syntax and JSX components...

## Section 2

More content with:
- Lists
- Code blocks
- React/Astro components
```

## 🚀 Using MDX Files in Pages

### Query Collection Data

```astro
---
import { getCollection } from 'astro:content';

// Get all journey posts
const allPosts = await getCollection('hanh-trinh');

// Sort by date
const sortedPosts = allPosts.sort((a, b) => 
  b.data.pubDate.getTime() - a.data.pubDate.getTime()
);
---
```

### Render Journey Post Content

```astro
---
import { getEntry } from 'astro:content';

// Get specific post
const post = await getEntry('hanh-trinh', 'autumn-journey-2024');
const { Content } = await post.render();
---

<article>
  <h1>{post.data.title}</h1>
  <p>{post.data.description}</p>
  <img src={post.data.image} alt={post.data.title} />
  <Content />
</article>
```

## 📋 Available Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `description` | string | ✅ | Brief description |
| `pubDate` | date | ✅ | Publication date |
| `author` | string | ❌ | Author name |
| `image` | string | ❌ | Cover image URL |
| `slug` | string | ✅ | URL-friendly identifier |
| `tags` | array | ❌ | Post tags |

## 🎨 MDX Features Available

### JSX Components
```mdx
import MyComponent from '../components/MyComponent.astro';

<MyComponent prop="value" />
```

### JavaScript Expressions
```mdx
export const year = new Date().getFullYear();

Current year: {year}
```

### Markdown Syntax
```mdx
# Heading 1
## Heading 2

**Bold text** and *italic text*

- Bullet point
- Another point

> Blockquote

```code block```
```

## 🔄 Integration with HanhTrinh Page

The MDX posts can be integrated with the main `/HanhTrinh` page to:
1. Display as a dynamic post list
2. Show detailed journey stories
3. Populate timeline with actual content
4. Add rich media (images, videos, components)

## 📚 Best Practices

- Keep posts organized by year in separate folders (optional)
- Use descriptive, SEO-friendly slugs
- Include high-quality cover images
- Add tags for easy filtering
- Update publication dates accurately
- Use clear, engaging titles
- Keep descriptions concise (< 160 characters)

## 🔗 Related Files

- `astro.config.mjs` - MDX integration configuration
- `content.config.ts` - Collection schema definitions
- `src/pages/HanhTrinh.astro` - Main journey page
- `src/components/HanhTrinh/` - Journey components
