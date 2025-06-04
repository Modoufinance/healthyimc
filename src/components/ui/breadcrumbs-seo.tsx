
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsSEOProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const BreadcrumbsSEO = ({ items, className }: BreadcrumbsSEOProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://healthyimc.com${item.href}`
    }))
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-2 text-sm", className)}>
        <Link 
          to="/" 
          className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Accueil"
        >
          <Home className="w-4 h-4" />
        </Link>
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            {item.current ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.href}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};
