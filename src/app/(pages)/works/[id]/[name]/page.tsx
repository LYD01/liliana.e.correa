"use client";

import { WorkModalContent } from "@/app/_components";
import { WORKS_DATA } from "@/app/_constants";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";


interface PageProps {
  params: Promise<{
    id: string;
    name: string;
  }>;
}

export default function WorkPage({ params }: PageProps) {
  const { id, name } = use(params);
  const router = useRouter();

  // Decode the name parameter (Next.js provides it decoded, but ensure it's properly handled)
  const decodedName = decodeURIComponent(name);

  const work = WORKS_DATA.find(work => {
    // Normalize the work URL for comparison
    const normalizedWorkUrl = work.url.startsWith('/') ? work.url.slice(1) : work.url;
    const expectedUrl = `works/${id}/${decodedName}`;
    return normalizedWorkUrl === expectedUrl || work.url === `/works/${id}/${decodedName}`;
  });

  // Generate SEO-optimized title (same logic as layout.tsx)
  const generateTitle = (work: typeof WORKS_DATA[0]) => {
    const baseTitle = work.title;
    const category = work.category;
    const authorName = "Liliana E. Correa";

    const titleWithCategory = `${baseTitle} - ${category} | ${authorName}`;
    const titleWithoutCategory = `${baseTitle} | ${authorName}`;

    if (titleWithCategory.length <= 60) {
      return titleWithCategory;
    } else if (titleWithoutCategory.length <= 60) {
      return titleWithoutCategory;
    } else {
      const maxTitleLength = 60 - authorName.length - 3;
      return `${baseTitle.slice(0, maxTitleLength)}... | ${authorName}`;
    }
  };

  // Update document title on client-side navigation
  useEffect(() => {
    if (work) {
      document.title = generateTitle(work);
    } else {
      document.title = "Work | Liliana E. Correa";
    }

    // Cleanup: restore default title when component unmounts
    return () => {
      document.title = "Liliana E Correa";
    };
  }, [work]);

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center night-sky-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-grey-900">Work not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-grey-700 hover:text-grey-900 hover:underline focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen night-sky-background flex items-start md:items-center justify-center py-0 md:py-4 px-0 md:px-4 lg:px-6 xl:px-8 overflow-y-auto">
      <div className="w-full h-full max-h-[calc(100vh-2rem)] md:h-[96vh] lg:h-[94vh] xl:h-[92vh] md:w-[92%] lg:w-[90%] xl:w-[88%] md:max-h-[96vh] lg:max-h-[94vh] xl:max-h-[92vh] flex items-start md:items-center justify-center">
        <WorkModalContent work={work} onClose={handleClose} />
      </div>
    </div>
  );
}
