import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published: boolean;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllPosts(): Promise<BlogPost[]> {
  // Check if directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const posts: BlogPost[] = [];

  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, "");
    const post = await getPostBySlug(slug);
    if (post && post.published) {
      posts.push(post);
    }
  }

  // Sort by date, newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    // Dynamic import to get the metadata
    const { metadata } = await import(`@/content/blog/${slug}.mdx`);

    return {
      slug,
      title: metadata.title,
      description: metadata.description,
      date: metadata.date,
      author: metadata.author,
      tags: metadata.tags || [],
      image: metadata.image,
      published: metadata.published !== false,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
