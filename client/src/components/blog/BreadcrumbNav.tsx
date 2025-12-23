import { Link } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbNavProps {
  category?: string;
  title: string;
}

export function BreadcrumbNav({ category, title }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        <span>Accueil</span>
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/blog" className="hover:text-primary transition-colors">
        Blog
      </Link>
      {category && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-primary transition-colors cursor-pointer">
            {category}
          </span>
        </>
      )}
      <ChevronRight className="w-4 h-4" />
      <span className="text-foreground font-medium line-clamp-1">
        {title}
      </span>
    </nav>
  );
}
