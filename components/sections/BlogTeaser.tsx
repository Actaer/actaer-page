import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import type { Locale } from "@/i18n/config";
import { Section, Eyebrow, ArrowLink } from "@/components/carbon";
import { formatDate } from "@/lib/date";

export async function BlogTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations("home.blog");
  const posts = (await getAllPosts(locale)).slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <Section band="muted">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-display-md">{t("title")}</h2>
        </div>
        <ArrowLink href="/blog">{t("cta")}</ArrowLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="-mt-px flex flex-col gap-3 border border-border bg-background p-6 md:-ml-px md:mt-0">
            <p className="text-xs tracking-[0.32px] text-muted-foreground">{formatDate(post.date, locale)}</p>
            <h3 className="text-body-lg font-semibold">{post.title}</h3>
            <p className="line-clamp-3 text-sm text-muted-foreground">{post.description}</p>
            <div className="mt-auto pt-2">
              <ArrowLink href={`/blog/${post.slug}`}>{t("readMore")}</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
