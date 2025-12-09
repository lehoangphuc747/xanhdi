# Integration Example: MDX Posts with HanhTrinh Page

This file shows how to integrate your MDX journey posts with the existing HanhTrinh page.

## 🔗 How to Display MDX Posts

### Option 1: List All Journey Posts

Add this to `src/pages/HanhTrinh.astro`:

```astro
---
import { getCollection } from 'astro:content';

// Get all journey posts
const journeyPosts = await getCollection('hanh-trinh');

// Sort by date (newest first)
const sortedPosts = journeyPosts.sort((a, b) => 
  b.data.pubDate.getTime() - a.data.pubDate.getTime()
);
---

<section class="journey-posts">
  <h2>Latest Journey Stories</h2>
  
  <div class="posts-grid">
    {sortedPosts.map(post => (
      <article class="post-card">
        {post.data.image && (
          <img src={post.data.image} alt={post.data.title} />
        )}
        <h3>{post.data.title}</h3>
        <p class="description">{post.data.description}</p>
        <p class="meta">
          {new Date(post.data.pubDate).toLocaleDateString('vi-VN')}
        </p>
        {post.data.tags && (
          <div class="tags">
            {post.data.tags.map(tag => (
              <span class="tag">{tag}</span>
            ))}
          </div>
        )}
      </article>
    ))}
  </div>
</section>
```

### Option 2: Display Featured Post

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('hanh-trinh');
const featured = posts.sort((a, b) => 
  b.data.pubDate.getTime() - a.data.pubDate.getTime()
)[0]; // Get newest post

const { Content } = await featured.render();
---

<section class="featured-journey">
  <h2>Featured Journey</h2>
  <article>
    <h3>{featured.data.title}</h3>
    {featured.data.image && (
      <img src={featured.data.image} alt={featured.data.title} />
    )}
    <div class="content">
      <Content />
    </div>
    <p class="author">By {featured.data.author || 'Xanh Đi Team'}</p>
  </article>
</section>
```

### Option 3: Filter Posts by Tag

```astro
---
import { getCollection } from 'astro:content';

const allPosts = await getCollection('hanh-trinh');

// Filter by specific tag
const tagFilter = 'mùa thu'; // or get from URL
const filteredPosts = allPosts.filter(post => 
  post.data.tags?.includes(tagFilter)
);
---

<section class="filtered-posts">
  <h2>Journeys tagged: {tagFilter}</h2>
  
  {filteredPosts.length > 0 ? (
    <ul>
      {filteredPosts.map(post => (
        <li>
          <h3>{post.data.title}</h3>
          <p>{post.data.description}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No journeys found with this tag.</p>
  )}
</section>
```

## 📄 Creating a Detail Page

Create `src/pages/journeys/[slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

// Get all posts for static generation
export async function getStaticPaths() {
  const posts = await getCollection('hanh-trinh');
  return posts.map(post => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<Layout title={post.data.title}>
  <article class="journey-detail">
    <header>
      <h1>{post.data.title}</h1>
      <p class="meta">
        {new Date(post.data.pubDate).toLocaleDateString('vi-VN')}
        {post.data.author && ` • By ${post.data.author}`}
      </p>
    </header>

    {post.data.image && (
      <figure class="cover-image">
        <img src={post.data.image} alt={post.data.title} />
      </figure>
    )}

    <div class="content">
      <Content />
    </div>

    {post.data.tags && (
      <footer class="tags">
        {post.data.tags.map(tag => (
          <a href={`/journeys/tag/${tag}`}>{tag}</a>
        ))}
      </footer>
    )}
  </article>
</Layout>

<style>
  .journey-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .cover-image {
    margin: 2rem 0;
    border-radius: 8px;
    overflow: hidden;
  }

  .cover-image img {
    width: 100%;
    height: auto;
  }

  .content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-text);
  }
</style>
```

## 🎨 Styling Examples

### Post Card Grid

```astro
<style>
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .post-card {
    background: var(--color-card);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .post-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .post-card h3 {
    padding: 1rem 1rem 0;
    margin: 0;
    color: var(--color-primary);
  }

  .post-card .description {
    padding: 0 1rem;
    color: var(--color-text-muted);
  }

  .post-card .meta {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    color: var(--color-text-light);
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding: 0 1rem 1rem;
  }

  .tag {
    background: var(--color-secondary-light);
    color: var(--color-secondary-dark);
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.85rem;
  }
</style>
```

## 🔄 Integration with Existing Components

### Use with Timeline Component

Combine MDX posts with the existing Timeline view:

```astro
---
import Timeline from '../components/HanhTrinh/Timeline.astro';
import { getCollection } from 'astro:content';

const posts = await getCollection('hanh-trinh');

// Transform MDX posts to timeline data structure
const timelineData = posts.reduce((acc, post) => {
  const year = post.data.pubDate.getFullYear();
  const month = post.data.pubDate.toLocaleString('vi-VN', { month: 'long' });
  
  // Find or create year entry
  let yearEntry = acc.find(y => y.year === year);
  if (!yearEntry) {
    yearEntry = { year, months: [] };
    acc.push(yearEntry);
  }
  
  // Add journey to month
  yearEntry.months.push({
    month,
    journeys: 1,
    journeyName: post.data.title,
    slug: post.data.slug,
  });
  
  return acc;
}, []);
---

<Timeline timeline={timelineData} />
```

## 📊 Data Processing Examples

### Sort Posts by Date

```astro
---
const sortedByDate = posts.sort((a, b) => 
  b.data.pubDate - a.data.pubDate // Newest first
);
---
```

### Group Posts by Year

```astro
---
const postsByYear = posts.reduce((acc, post) => {
  const year = post.data.pubDate.getFullYear();
  if (!acc[year]) acc[year] = [];
  acc[year].push(post);
  return acc;
}, {});

Object.entries(postsByYear).map(([year, yearPosts]) => (
  <h2>{year}</h2>
  {yearPosts.map(post => <p>{post.data.title}</p>)}
))
---
```

### Count Posts by Tag

```astro
---
const tagCounts = {};
posts.forEach(post => {
  post.data.tags?.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
});

Object.entries(tagCounts).map(([tag, count]) => (
  <p>{tag}: {count} journeys</p>
))
---
```

## 🎯 Complete Example: Enhanced HanhTrinh Page

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Timeline from '../components/HanhTrinh/Timeline.astro';
import { getCollection } from 'astro:content';

const journeyPosts = await getCollection('hanh-trinh');
const sorted = journeyPosts.sort((a, b) => 
  b.data.pubDate - a.data.pubDate
);
---

<Layout title="Hành Trình - Xanh Đi">
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-grow">
      {/* Existing journey data timeline */}
      <section class="timeline-section">
        <Timeline timeline={journeyTimeline} />
      </section>

      {/* MDX posts section */}
      <section class="posts-section">
        <h2>Journey Stories from Community</h2>
        
        <div class="posts-list">
          {sorted.map(post => (
            <article class="post-item">
              <h3>
                <a href={`/journeys/${post.data.slug}`}>
                  {post.data.title}
                </a>
              </h3>
              <p>{post.data.description}</p>
              <footer class="post-meta">
                <time>{new Date(post.data.pubDate).toLocaleDateString('vi-VN')}</time>
                {post.data.tags && (
                  <span class="tags">
                    {post.data.tags.join(', ')}
                  </span>
                )}
              </footer>
            </article>
          ))}
        </div>
      </section>
    </main>

    <Footer />
  </div>
</Layout>

<style>
  .timeline-section { /* existing styles */ }
  
  .posts-section {
    max-width: 1200px;
    margin: 4rem auto;
    padding: 2rem;
  }

  .posts-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .post-item {
    background: var(--color-card);
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid var(--color-primary);
  }

  .post-item h3 a {
    color: inherit;
    text-decoration: none;
  }

  .post-item h3 a:hover {
    color: var(--color-primary);
  }

  .post-meta {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }
</style>
```

## ✅ Integration Checklist

- [ ] Create at least 3-5 MDX posts in `src/content/hanh-trinh/`
- [ ] Test `npm run build` to ensure all posts validate
- [ ] Create `/journeys/[slug].astro` for detail pages
- [ ] Update `HanhTrinh.astro` to display posts
- [ ] Add styling for post cards
- [ ] Test dynamic routes with `npm run preview`
- [ ] Verify posts appear in all expected places

---

**Ready to integrate?** Follow the examples above to start displaying your MDX content!
