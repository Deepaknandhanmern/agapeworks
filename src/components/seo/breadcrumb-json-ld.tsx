const SITE_URL = "https://agapeworks.in";

/**
 * Emits BreadcrumbList structured data so search results can show a
 * "Home › Blog › Post title" trail instead of a bare URL.
 *
 * Takes the trail already implied by the page's own route rather than
 * deriving it from pathname, so each page states its own hierarchy
 * explicitly and there's no guessing for nested or renamed segments.
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    // eslint-disable-next-line react/no-danger -- static JSON built from props we control, not user input
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
