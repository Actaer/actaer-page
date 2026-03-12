import fs from "fs";
import path from "path";
import { type Locale, defaultLocale } from "@/i18n/config";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  author: string;
  tags: string[];
  image?: string;
  published: boolean;
  locale: Locale;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getBlogDirForLocale(locale: Locale): string {
  return path.join(BLOG_DIR, locale);
}

export async function getAllPosts(
  locale: Locale = defaultLocale,
): Promise<BlogPost[]> {
  const localeBlogDir = getBlogDirForLocale(locale);
  const fallbackBlogDir = getBlogDirForLocale(defaultLocale);

  // Check if locale directory exists, fallback to default
  const blogDir = fs.existsSync(localeBlogDir)
    ? localeBlogDir
    : fallbackBlogDir;

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const posts: BlogPost[] = [];

  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, "");
    const post = await getPostBySlug(slug, locale);
    if (post && post.published) {
      posts.push(post);
    }
  }

  // Sort by date, newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<BlogPost | null> {
  try {
    const localeBlogDir = getBlogDirForLocale(locale);
    const fallbackBlogDir = getBlogDirForLocale(defaultLocale);

    // Check locale-specific path first, then fallback to default locale
    let filePath = path.join(localeBlogDir, `${slug}.mdx`);
    let usedLocale = locale;

    if (!fs.existsSync(filePath)) {
      filePath = path.join(fallbackBlogDir, `${slug}.mdx`);
      usedLocale = defaultLocale;
    }

    if (!fs.existsSync(filePath)) {
      return null;
    }

    // Dynamic import to get the metadata
    const importPath =
      usedLocale === defaultLocale
        ? `@/content/blog/${defaultLocale}/${slug}.mdx`
        : `@/content/blog/${locale}/${slug}.mdx`;

    // We need to try the locale first, then fallback
    let metadata;
    try {
      metadata = (await import(`@/content/blog/${locale}/${slug}.mdx`))
        .metadata;
    } catch {
      metadata = (await import(`@/content/blog/${defaultLocale}/${slug}.mdx`))
        .metadata;
    }

    return {
      slug,
      title: metadata.title,
      description: metadata.description,
      date: metadata.date,
      lastUpdated: metadata.lastUpdated,
      author: metadata.author,
      tags: metadata.tags || [],
      image: metadata.image,
      published: metadata.published !== false,
      locale: usedLocale,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(locale: Locale = defaultLocale): string[] {
  const localeBlogDir = getBlogDirForLocale(locale);
  const fallbackBlogDir = getBlogDirForLocale(defaultLocale);

  // Get slugs from both locale and fallback directories
  const slugs = new Set<string>();

  if (fs.existsSync(localeBlogDir)) {
    const files = fs.readdirSync(localeBlogDir);
    files
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => slugs.add(file.replace(/\.mdx$/, "")));
  }

  // Also include fallback slugs if locale is not default
  if (locale !== defaultLocale && fs.existsSync(fallbackBlogDir)) {
    const files = fs.readdirSync(fallbackBlogDir);
    files
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => slugs.add(file.replace(/\.mdx$/, "")));
  }

  return Array.from(slugs);
}

// Re-export formatDate from the date utility for backwards compatibility
export { formatDate } from "./date";
