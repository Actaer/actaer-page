import Link from "next/link";
import Image from "next/image";
import { BlogPost, formatDate } from "@/lib/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors group">
      <Link href={`/blog/${post.slug}`}>
        {post.image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <time className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </time>
            {post.tags.length > 0 && (
              <>
                <span className="text-muted-foreground">•</span>
                <Badge variant="secondary" className="text-xs">
                  {post.tags[0]}
                </Badge>
              </>
            )}
          </div>
          <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{post.author}</span>
            <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
              Read More
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
