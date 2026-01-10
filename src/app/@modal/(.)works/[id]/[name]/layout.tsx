import type { Metadata } from "next";
import { WORKS_DATA } from "@/app/_constants";

type Props = {
  params: Promise<{
    id: string;
    name: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, name } = await params;

  // Decode the name parameter
  const decodedName = decodeURIComponent(name);

  // Find the work
  const work = WORKS_DATA.find((work) => {
    const normalizedWorkUrl = work.url.startsWith('/') ? work.url.slice(1) : work.url;
    const expectedUrl = `works/${id}/${decodedName}`;
    return normalizedWorkUrl === expectedUrl || work.url === `/works/${id}/${decodedName}`;
  });

  if (work) {
    // SEO-optimized title (50-60 characters ideal, max 60 for display)
    // Format: "Work Title - Category | Author" or "Work Title | Author" if too long
    const baseTitle = work.title;
    const category = work.category;
    const authorName = "Liliana E. Correa";

    // Try to include category if title is short enough
    let title: string;
    const titleWithCategory = `${baseTitle} - ${category} | ${authorName}`;
    const titleWithoutCategory = `${baseTitle} | ${authorName}`;

    // Use category if total length is under 60 chars, otherwise omit
    if (titleWithCategory.length <= 60) {
      title = titleWithCategory;
    } else if (titleWithoutCategory.length <= 60) {
      title = titleWithoutCategory;
    } else {
      // If title itself is too long, truncate it
      const maxTitleLength = 60 - authorName.length - 3; // 3 for " | "
      title = `${baseTitle.slice(0, maxTitleLength)}... | ${authorName}`;
    }

    // SEO-optimized description (150-160 characters ideal)
    // Use summary if available, otherwise description, with smart truncation
    const sourceText = work.summary || work.description || '';

    // Create a compelling description
    let description: string;
    if (sourceText) {
      // Target 155 characters to leave room for ellipsis
      if (sourceText.length <= 155) {
        description = sourceText;
      } else {
        // Truncate at word boundary when possible
        const truncated = sourceText.slice(0, 152);
        const lastSpace = truncated.lastIndexOf(' ');
        description = lastSpace > 100
          ? truncated.slice(0, lastSpace) + '...'
          : truncated + '...';
      }
    } else {
      // Fallback description with category and keywords
      const keywords = work.tags.slice(0, 2).join(', ');
      description = `${work.category} by Liliana E. Correa${keywords ? `. ${keywords}` : ''}.`;
    }

    return {
      title,
      description,
    };
  }

  return {
    title: "Work | Liliana E. Correa",
    description: "View work by Liliana E. Correa - Argentinean bilingual writer and adult literacy educator.",
  };
}

export default function WorkModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
