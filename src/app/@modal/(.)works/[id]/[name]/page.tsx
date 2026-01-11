"use client";

import { WorkModalContent } from "@/app/_components";
import { WORKS_DATA } from "@/app/_constants";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageProps {
  params: Promise<{
    id: string;
    name: string;
  }>;
}

export default function WorkModal({ params }: PageProps) {
  const { id, name } = use(params);
  const router = useRouter();

  // Decode the name parameter (Next.js provides it decoded, but ensure it's properly handled)
  const decodedName = decodeURIComponent(name);

  const work = WORKS_DATA.find(
    (work) => {
      // Normalize the work URL for comparison
      const normalizedWorkUrl = work.url.startsWith('/') ? work.url.slice(1) : work.url;
      const expectedUrl = `works/${id}/${decodedName}`;
      return normalizedWorkUrl === expectedUrl || work.url === `/works/${id}/${decodedName}`;
    }
  );

  const handleClose = () => {
    router.back();
  };

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
    }

    // Cleanup: restore default title when component unmounts
    return () => {
      document.title = "Liliana E Correa";
    };
  }, [work]);

  // Lock scroll position immediately when modal mounts
  useEffect(() => {
    const wasOnHomePage = sessionStorage.getItem('wasOnHomePage') === 'true';
    const savedScroll = sessionStorage.getItem('homeScrollPosition');

    if (wasOnHomePage && savedScroll) {
      // Ensure scroll is locked (in case link click handler didn't fire or was cleared)
      const scrollValue = parseInt(savedScroll, 10);
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.top = `-${scrollValue}px`;
      document.documentElement.style.left = '0';
      document.documentElement.style.right = '0';
    }
  }, []);

  if (!work) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start md:items-center justify-start md:justify-center py-0 md:py-4"
        initial={{ opacity: 1 }} // Start at opacity 1 to prevent white flash on iOS Safari
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: 'var(--color-bg-primary)' }} // Prevent flash on iOS Safari - matches body background
      >
        {/* Backdrop - Start at high opacity to prevent white flash, subtle fade-in */}
        <motion.div
          className="absolute inset-0 bg-white/80 backdrop-blur-sm"
          initial={{ opacity: 0.95 }} // Start nearly opaque to prevent flash
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClose}
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-bg-secondary) 80%, transparent)' }} // Ensure backdrop color is set immediately
        />

        {/* Modal Container */}
        <div className="relative w-full h-full md:h-[96vh] lg:h-[94vh] xl:h-[92vh] md:w-[92%] lg:w-[90%] xl:w-[88%] md:max-h-[96vh] lg:max-h-[94vh] xl:max-h-[92vh] flex items-start md:items-center justify-start md:justify-center px-0 md:px-4 lg:px-6 xl:px-8 z-10">
          <WorkModalContent work={work} onClose={handleClose} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
