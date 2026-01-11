"use client"
import {
  motion,
  useInView,
  AnimatePresence
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { WORKS_DATA, filterWorks, getAllCategories, getAllTags, type WorkCategory, type WorkTag } from "./_constants";
import styles from "../home.module.scss"

export default function Home() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true });
  const pathname = usePathname();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<WorkTag>>(new Set());
  const [showAllTags, setShowAllTags] = useState(false);

  // Check if we're returning from a modal (pathname is "/")
  useEffect(() => {
    // Only save scroll position when we're actually on the home page
    // Don't save when modal is open (pathname !== '/' or modalIsOpen flag is set)
    const handleScroll = () => {
      // Only save if we're on the home page AND modal is not open
      const modalIsOpen = sessionStorage.getItem('modalIsOpen') === 'true';
      if (pathname === '/' && !modalIsOpen) {
        const currentScroll = window.scrollY;
        setScrollPosition(currentScroll);
        sessionStorage.setItem('homeScrollPosition', currentScroll.toString());
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Only add scroll listener when on home page
    if (pathname === '/') {
      window.addEventListener('scroll', throttledScroll, { passive: true });
    }

    // Check if we're returning to the home page from a modal
    // Only restore scroll when pathname is '/' AND modal is not open
    const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
    const wasOnHomePage = sessionStorage.getItem('wasOnHomePage') === 'true';
    const modalIsOpen = sessionStorage.getItem('modalIsOpen') === 'true';

    if (wasOnHomePage && savedScrollPosition !== null && pathname === '/' && !modalIsOpen) {
      // We're returning from modal - skip animations and restore scroll
      setHasAnimated(true);

      // Restore scroll position after DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: 'instant'
        });
      });
    } else if (pathname === '/') {
      // First visit or fresh load - allow animations
      setHasAnimated(false);
      sessionStorage.setItem('wasOnHomePage', 'true');
    }

    return () => {
      if (pathname === '/') {
        window.removeEventListener('scroll', throttledScroll);
      }
    };
  }, [pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: hasAnimated ? 0 : 0.3,
        staggerChildren: hasAnimated ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: hasAnimated ? 0 : 0.5
      }
    }
  };

  // Get all categories and tags
  const categories = useMemo(() => getAllCategories(), []);
  const allTags = useMemo(() => getAllTags(), []);

  // Filter works based on selected filters
  const filteredWorks = useMemo(() => {
    return filterWorks({
      category: selectedCategory || undefined,
      tags: selectedTags.size > 0 ? Array.from(selectedTags) : undefined,
    });
  }, [selectedCategory, selectedTags]);

  // Remove tags that don't have any works in the selected category
  useEffect(() => {
    // Only filter when category changes
    if (selectedCategory && selectedTags.size > 0) {
      const validTags = new Set<WorkTag>();

      selectedTags.forEach(tag => {
        // Check if there's at least one work with both the selected category and this tag
        const hasMatchingWork = WORKS_DATA.some(
          work => work.category === selectedCategory && work.tags.includes(tag)
        );

        if (hasMatchingWork) {
          validTags.add(tag);
        }
      });

      // Compare sets to see if they're different
      const setsAreEqual = validTags.size === selectedTags.size &&
        Array.from(selectedTags).every(tag => validTags.has(tag));

      // Only update if tags were actually removed
      if (!setsAreEqual) {
        setSelectedTags(validTags);
      }
    }
  }, [selectedCategory]); // Only depend on selectedCategory to avoid loops

  // Toggle tag selection
  const toggleTag = (tag: WorkTag) => {
    setSelectedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        // If a category is selected, only allow tags that have works in that category
        if (selectedCategory) {
          const hasMatchingWork = WORKS_DATA.some(
            work => work.category === selectedCategory && work.tags.includes(tag)
          );
          if (hasMatchingWork) {
            newSet.add(tag);
          }
        } else {
          // No category selected, allow all tags
          newSet.add(tag);
        }
      }
      return newSet;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags(new Set());
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategory !== null || selectedTags.size > 0;

  // Get tag counts for display (considering current filters)
  const getTagCount = (tag: WorkTag) => {
    if (selectedCategory) {
      // Count works with this tag in the selected category
      return WORKS_DATA.filter(
        work => work.category === selectedCategory && work.tags.includes(tag)
      ).length;
    }
    return WORKS_DATA.filter(work => work.tags.includes(tag)).length;
  };

  // Check if a tag would yield results with current filters
  const tagWouldYieldResults = useCallback((tag: WorkTag): boolean => {
    // Always show tags that are already selected
    if (selectedTags.has(tag)) {
      return true;
    }

    // Build the filter to test: current category + selected tags + this tag
    const testTags = selectedTags.size > 0
      ? [...Array.from(selectedTags), tag]
      : [tag];

    const testResults = filterWorks({
      category: selectedCategory || undefined,
      tags: testTags,
    });

    return testResults.length > 0;
  }, [selectedCategory, selectedTags]);

  // Filter available tags based on current filters
  const availableTags = useMemo(() => {
    return allTags.filter(tag => tagWouldYieldResults(tag));
  }, [allTags, tagWouldYieldResults]);

  // Format tag name for display
  const formatTagName = (tag: WorkTag): string => {
    return tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Display tags (show first 12, then expand)
  const displayTags = showAllTags ? availableTags : availableTags.slice(0, 12);

  return (
    <div className="min-h-screen">
      {/* Hero/Intro Section */}
      <motion.section
        className="pt-8 pb-24 md:pt-8 md:pl-40 tabletAndBelow:pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 md:ml-0">
          <div className="flex items-start gap-16 tabletAndBelow:flex-col tabletAndBelow:gap-12">
            <motion.div
              className="flex-1 space-y-8"
              variants={itemVariants}
            >
              <h1 className={`${styles.heading} text-5xl sm:text-6xl tabletAndBelow:text-4xl font-bold`}>
                Liliana E. Correa
              </h1>
              <div className="space-y-6 text-lg sm:text-xl tabletAndBelow:text-base leading-relaxed text-grey-800">
                <p>
                  Liliana is an Argentinean bilingual writer and adult literacy educator. She attained a Doctoral degree from Western Sydney University in 2012.
                </p>
                <p>
                  Liliana is interested in cross-disciplinary work and creative participatory research methodologies. She is currently co-writing a book documenting the work of racialized theatre artists in Sydney during the 1990's.
                </p>
                <p>
                  She has resided in Australia since 1984 and currently lives and works on Bundjalung Country in the northern rivers, NSW.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex-shrink-0"
              variants={itemVariants}
            >
              <Image
                src={`/img/lili-blue.jpeg`}
                alt="Photo of Liliana"
                width={300}
                height={300}
                className="rounded-lg shadow-xl w-[300px] h-[300px] object-cover tabletAndBelow:w-full tabletAndBelow:max-w-[250px]"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Works Section */}
      <motion.section
        className="py-20 tabletAndBelow:py-16 border-t border-grey-300"
        variants={containerVariants}
        initial={hasAnimated ? "visible" : "hidden"}
        animate={hasAnimated ? "visible" : undefined}
        whileInView={hasAnimated ? undefined : "visible"}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <motion.div
            className="mb-12 tabletAndBelow:mb-10"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6 tabletAndBelow:mb-5 tabletAndBelow:flex-col tabletAndBelow:items-start tabletAndBelow:gap-3">
              <h2 className="text-3xl sm:text-4xl tabletAndBelow:text-2xl font-bold">
                Works
              </h2>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={clearFilters}
                  className="text-sm text-grey-800 hover:text-grey-900 transition-colors underline underline-offset-4 decoration-grey-600 hover:decoration-grey-800 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded"
                >
                  Clear filters
                </motion.button>
              )}
            </div>

            {/* Category Filters */}
            <div className="mb-8">
              <div className="border border-gray-600 px-2 py-3">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`text-base font-semibold transition-all duration-200 pb-1 border-b-2 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded ${selectedCategory === null
                      ? 'text-grey-900 border-grey-900'
                      : 'text-grey-800 border-transparent hover:border-grey-600'
                      }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-base font-normal transition-all duration-200 pb-1 border-b-2 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded ${selectedCategory === category
                        ? 'text-grey-900 border-grey-900'
                        : 'text-grey-800 border-transparent hover:text-grey-900 hover:border-grey-600'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tag Filters */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-grey-700 uppercase tracking-wider">Tags</p>
                <div className="flex items-center gap-3">
                  {selectedTags.size > 0 && (
                    <button
                      onClick={() => setSelectedTags(new Set())}
                      className="text-sm text-grey-800 hover:text-grey-900 transition-colors underline underline-offset-4 decoration-grey-600 hover:decoration-grey-800 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded"
                    >
                      Clear all
                    </button>
                  )}
                  {availableTags.length > 12 && (
                    <button
                      onClick={() => setShowAllTags(!showAllTags)}
                      className="text-sm text-grey-800 hover:text-grey-900 transition-colors focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded"
                    >
                      {showAllTags ? 'Less' : `All (${availableTags.length})`}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                <AnimatePresence mode="popLayout">
                  {displayTags.map((tag) => {
                    const isSelected = selectedTags.has(tag);
                    const count = getTagCount(tag);
                    return (
                      <motion.button
                        key={tag}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => toggleTag(tag)}
                        className={`text-sm transition-all duration-200 ${isSelected
                          ? 'text-grey-900 font-bold underline underline-offset-2'
                          : 'text-grey-700 font-normal hover:text-grey-900'
                          }`}
                      >
                        <span>{formatTagName(tag)}</span>
                        <span className={`ml-1 font-bold ${isSelected ? 'text-grey-900' : 'text-grey-600'}`}>
                          ({count})
                        </span>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Results count */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 text-sm text-grey-700"
              >
                Showing {filteredWorks.length} of {WORKS_DATA.length} works
              </motion.div>
            )}
          </motion.div>

          {/* Works Grid */}
          <AnimatePresence mode="wait">
            {filteredWorks.length > 0 ? (
              <motion.div
                key="works-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 auto-rows-fr"
              >
                {filteredWorks.map((work, index) => {
                  // Normalize URL - ensure it starts with /
                  const normalizedUrl = work.url ? (work.url.startsWith('/') ? work.url : `/${work.url}`) : '#';

                  // Handler for navigation (used by both image and view details links)
                  const handleNavigation = () => {
                    // Save scroll position BEFORE navigation to prevent jumps
                    const currentScroll = window.scrollY;
                    sessionStorage.setItem('homeScrollPosition', currentScroll.toString());
                    sessionStorage.setItem('wasOnHomePage', 'true');
                    sessionStorage.setItem('modalIsOpen', 'true');

                    // Lock scroll position immediately to prevent any jumping during navigation
                    document.documentElement.style.position = 'fixed';
                    document.documentElement.style.top = `-${currentScroll}px`;
                    document.documentElement.style.left = '0';
                    document.documentElement.style.right = '0';
                  };

                  return (
                    <motion.div
                      key={work.id}
                      variants={itemVariants}
                      className="group flex"
                    >
                      {normalizedUrl !== '#' ? (
                        <Link
                          href={normalizedUrl}
                          onClick={handleNavigation}
                          className="w-full text-left bg-transparent overflow-hidden h-full flex flex-col focus:outline-none"
                        >
                          {/* Image - square corners */}
                          <motion.div
                            className="relative overflow-hidden mb-3 sm:mb-4 group/image"
                            layoutId={`work-image-${work.id}`}
                            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                          >
                            <Image
                              src={work.img}
                              alt={work.title}
                              width={400}
                              height={250}
                              className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Subtle overlay on hover */}
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors pointer-events-none" />
                          </motion.div>

                          {/* Title */}
                          <motion.h3
                            className="text-base sm:text-lg font-bold text-grey-900 mb-1 leading-tight tracking-tight line-clamp-2 group-hover:text-grey-700 transition-colors"
                            layoutId={`work-title-${work.id}`}
                            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                            title={work.title}
                          >
                            {work.title}
                          </motion.h3>

                          {/* Artist credit */}
                          {work.artist && (
                            <p className="text-xs sm:text-sm text-grey-700 font-normal leading-relaxed">{work.artist}</p>
                          )}
                        </Link>
                      ) : (
                        <div className="w-full text-left bg-transparent overflow-hidden h-full flex flex-col">
                          {/* Image - square corners */}
                          <div className="relative overflow-hidden mb-3 sm:mb-4">
                            <Image
                              src={work.img}
                              alt={work.title}
                              width={400}
                              height={250}
                              className="w-full h-48 sm:h-56 md:h-64 object-cover"
                            />
                          </div>

                          {/* Title */}
                          <h3 className="text-base sm:text-lg font-bold text-grey-900 mb-1 leading-tight tracking-tight line-clamp-2">
                            {work.title}
                          </h3>

                          {/* Artist credit */}
                          {work.artist && (
                            <p className="text-xs sm:text-sm text-grey-700 font-normal leading-relaxed">{work.artist}</p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="col-span-full text-center py-16"
              >
                <p className="text-grey-600 text-lg mb-2">No works found</p>
                <p className="text-grey-700 text-sm">Try adjusting your filters</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
}
