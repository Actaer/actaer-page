"use client";

import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;

  return (
    <article className="-mt-px -ml-px flex flex-col border border-border bg-background transition-colors duration-150 ease-carbon hover:bg-layer-hover motion-reduce:transition-none">
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
        {post.image && (
          <div className="relative aspect-video overflow-hidden border-b border-border">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-6">
          <p className="text-xs tracking-[0.32px] text-muted-foreground">
            <time>{formatDate(post.date, locale)}</time>
            {post.tags.length > 0 && <> &middot; {post.tags[0]}</>}
          </p>
          <h3 className="text-body-lg font-semibold transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-xs tracking-[0.32px] text-muted-foreground">
              {post.author}
            </span>
            <span
              className="inline-flex items-center gap-2 text-sm tracking-[0.16px] text-primary group-hover:underline underline-offset-4"
              aria-hidden="true"
            >
              {t("readMore")}
              <ArrowRight className="size-4 transition-transform duration-150 ease-carbon group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
