"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Work } from "@/app/_constants";

interface WorkModalContentProps {
  work: Work;
  onClose: () => void;
}

export default function WorkModalContent({ work, onClose }: WorkModalContentProps) {
  const isVideo = work.id === 11;

  useEffect(() => {
    // Check if we came from home page (modal was opened via intercepting route)
    const wasOnHomePage = sessionStorage.getItem('wasOnHomePage') === 'true';
    const modalIsOpen = sessionStorage.getItem('modalIsOpen') === 'true';

    // If modal is already marked as open, ensure scroll is locked
    if (wasOnHomePage && modalIsOpen) {
      const savedScroll = sessionStorage.getItem('homeScrollPosition');
      if (savedScroll) {
        // Ensure scroll position is locked (might have been set on link click)
        const scrollValue = parseInt(savedScroll, 10);
        document.documentElement.style.position = 'fixed';
        document.documentElement.style.top = `-${scrollValue}px`;
        document.documentElement.style.left = '0';
        document.documentElement.style.right = '0';
      }
    }

    document.body.style.overflow = 'hidden';
    return () => {
      // Restore scroll position when modal closes
      if (wasOnHomePage) {
        const savedScroll = sessionStorage.getItem('homeScrollPosition');

        // Unlock scroll position
        document.documentElement.style.position = '';
        document.documentElement.style.top = '';
        document.documentElement.style.left = '';
        document.documentElement.style.right = '';

        if (savedScroll) {
          // Restore scroll position after unlocking
          window.scrollTo({
            top: parseInt(savedScroll, 10),
            behavior: 'instant'
          });
        }
      }

      document.body.style.overflow = 'unset';
      // Clear the modal flag when modal closes
      sessionStorage.removeItem('modalIsOpen');
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (isVideo) {
    return <VideoRoomModal work={work} onClose={onClose} />;
  }

  return <StoryModal work={work} onClose={onClose} />;
}

function StoryModal({ work, onClose }: { work: Work; onClose: () => void }) {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-white via-grey-50 to-white rounded-none md:rounded-sm shadow-2xl w-full h-full max-h-full overflow-hidden flex flex-col pointer-events-auto border-0 md:border border-grey-300"
      initial={{ scale: 0.95, opacity: 0, y: 0 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 0 }}
      transition={{
        type: "tween",
        ease: [0.16, 1, 0.3, 1],
        duration: 0.5,
        opacity: { duration: 0.4 }
      }}
      style={{ originY: 0 }}
    >
      {/* Close Button */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 flex flex-col items-center gap-1">
        <motion.button
          onClick={onClose}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-grey-100 border border-grey-300 flex items-center justify-center transition-colors touch-manipulation text-grey-900 hover:text-grey-800 underline hover:no-underline shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2"
          aria-label="Close modal"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center flex-col">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-grey-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-xs font-medium text-grey-800">ESC</span>

          </div>
        </motion.button>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 min-h-0 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 pb-6 md:pb-6 lg:pb-8 xl:pb-12">
        {/* Hero Image Section */}
        <motion.div
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <motion.div
            className="relative w-full h-48 sm:h-64 md:h-[50vh] lg:h-[60vh] max-h-[70vh]"
            layoutId={`work-image-${work.id}`}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            style={{ originX: 0, originY: 0.5 }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg my-10">
              <Image
                src={work.img}
                alt={work.title}
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            {/* External Link Chip */}
            {work.externalUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -top-5 -left-2 z-20"
              >
                <Link
                  href={work.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-full text-grey-600 hover:text-grey-800 text-[10px] sm:text-xs font-normal transition-all shadow-sm hover:shadow border border-grey-200/50 hover:border-grey-300/50 focus:outline-none focus:ring-1 focus:ring-grey-400 focus:ring-offset-1"
                >
                  <span className="hidden sm:inline">View Full Work</span>
                  <span className="sm:hidden">View</span>
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          className="mb-4 sm:mb-5 md:mb-6 space-y-2 sm:space-y-3"
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
            layoutId={`work-title-${work.id}`}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {work.title}
          </motion.h1>
          {work.subTitle && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-grey-700 italic">
              {work.subTitle}
            </p>
          )}
        </motion.div>

        {/* Content Boxes - Writer-focused Layout */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 mt-6 sm:mt-8 md:mt-12">
          {/* Summary/Description Box */}
          {(work.summary || work.description) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-grey-300 px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-8 bg-grey-50"
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-grey-800 whitespace-pre-line">
                {work.summary || work.description}
              </p>
            </motion.div>
          )}

          {/* Artist Credit Box */}
          {work.artist && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-grey-300 px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 ml-auto max-w-full sm:max-w-md bg-grey-50"
            >
              <p className="text-xs sm:text-sm text-grey-600 italic">{work.artist}</p>
            </motion.div>
          )}

        </div>
      </div>
    </motion.div>
  );
}

function VideoRoomModal({ work, onClose }: { work: Work; onClose: () => void }) {
  // Extract Vimeo video ID from the iframe src
  const vimeoMatch = work.description?.match(/vimeo\.com\/video\/(\d+)/);
  const videoId = vimeoMatch ? vimeoMatch[1] : null;

  // Determine number of slides (title, video, and optionally description)
  const slides = [0, 1]; // Title and Video are always present
  if (work.summary) slides.push(2); // Add description slide if summary exists
  const totalSlides = slides.length;

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide(prev => {
      if (prev < totalSlides - 1) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handlePrevious = () => {
    setCurrentSlide(prev => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide(prev => prev > 0 ? prev - 1 : prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentSlide(prev => prev < totalSlides - 1 ? prev + 1 : prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  const canGoNext = currentSlide < totalSlides - 1;
  const canGoPrevious = currentSlide > 0;

  return (
    <motion.div
      className="bg-gradient-to-br from-white via-grey-50 to-white rounded-none md:rounded-3xl shadow-2xl w-full h-full max-h-full overflow-hidden flex flex-col pointer-events-auto border-0 md:border border-grey-300 relative"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{
        type: "tween",
        ease: [0.16, 1, 0.3, 1],
        duration: 0.35,
        opacity: { duration: 0.3 }
      }}
    >
      {/* Close Button */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 flex flex-col items-center gap-1">
        <button
          onClick={onClose}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-grey-100 active:bg-grey-200 flex items-center justify-center transition-colors border border-grey-300 touch-manipulation shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-grey-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <span className="text-xs text-grey-700">escape</span>
      </div>

      {/* People Shadows - Multiple layers for depth (hidden on small screens) */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Left side shadows - front row */}
        <div className="absolute left-4 sm:left-6 md:left-8 top-1/4">
          <PersonShadow variant={0} delay={0.1} />
        </div>
        <div className="absolute left-6 sm:left-8 md:left-12 top-1/2">
          <PersonShadow variant={1} delay={0.2} />
        </div>
        <div className="absolute left-8 sm:left-12 md:left-16 top-3/4">
          <PersonShadow variant={2} delay={0.3} />
        </div>

        {/* Left side shadows - back row */}
        <div className="absolute left-2 sm:left-3 md:left-4 top-1/3 opacity-10">
          <PersonShadow variant={0} delay={0.15} />
        </div>
        <div className="absolute left-3 sm:left-4 md:left-6 top-2/3 opacity-8">
          <PersonShadow variant={1} delay={0.25} />
        </div>

        {/* Right side shadows - front row */}
        <div className="absolute right-4 sm:right-6 md:right-8 top-1/4">
          <PersonShadow variant={2} delay={0.1} />
        </div>
        <div className="absolute right-6 sm:right-8 md:right-12 top-1/2">
          <PersonShadow variant={0} delay={0.2} />
        </div>
        <div className="absolute right-8 sm:right-12 md:right-16 top-3/4">
          <PersonShadow variant={1} delay={0.3} />
        </div>

        {/* Right side shadows - back row */}
        <div className="absolute right-2 sm:right-3 md:right-4 top-1/3 opacity-10">
          <PersonShadow variant={2} delay={0.15} />
        </div>
        <div className="absolute right-3 sm:right-4 md:right-6 top-2/3 opacity-8">
          <PersonShadow variant={0} delay={0.25} />
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{ x: `-${currentSlide * 100}%` }}
          transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
        >
          {/* Title Section */}
          <div className="w-full h-full flex-shrink-0 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 md:py-0 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center max-w-3xl relative z-10 px-2"
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-grey-900 to-grey-600 bg-clip-text text-transparent leading-tight">
                {work.title}
              </h1>
              {work.subTitle && (
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-grey-600 italic mb-3 sm:mb-4 md:mb-6 lg:mb-8">{work.subTitle}</p>
              )}
              {canGoNext && (
                <motion.div
                  className="text-grey-700 text-xs sm:text-sm md:text-base lg:text-lg"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <p className="mb-2 sm:mb-4 flex items-center justify-center gap-1.5 sm:gap-2">
                    Use arrow keys or buttons to navigate
                    <span className="text-lg sm:text-xl">→</span>
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Video Section */}
          <div className="w-full h-full flex-shrink-0 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 relative">
            {/* Theater-like lighting effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-5xl relative z-10"
            >
              {videoId ? (
                <div className="relative w-full pb-[56.25%] rounded-lg md:rounded-2xl overflow-hidden shadow-2xl border border-grey-300 md:border-2 lg:border-4 bg-black">
                  {/* Glow effect around video */}
                  <div className="absolute -inset-0.5 sm:-inset-1 md:-inset-2 bg-grey-500/20 rounded-lg md:rounded-2xl blur-xl -z-10"></div>
                  <iframe
                    src={`https://player.vimeo.com/video/${videoId}?autoplay=0&title=0&byline=0&portrait=0`}
                    className="absolute top-0 left-0 w-full h-full rounded-lg md:rounded-xl"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative w-full pb-[56.25%] rounded-lg md:rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 md:border-2 lg:border-4 bg-gray-800 flex items-center justify-center">
                  <p className="text-grey-700 text-xs sm:text-sm md:text-base">Video unavailable</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Description Section */}
          {work.summary && (
            <div className="w-full h-full flex-shrink-0 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 md:py-0">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-3xl bg-grey-50 rounded-lg md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 border border-grey-300 shadow-xl"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6">About This Work</h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed text-grey-800 whitespace-pre-line">
                  {work.summary}
                </p>
                {work.externalUrl && (
                  <Link
                    href={work.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-grey-800 hover:text-grey-900 active:text-grey-700 transition-colors text-xs sm:text-sm md:text-base touch-manipulation focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded"
                  >
                    Learn more
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {canGoPrevious && (
        <button
          onClick={handlePrevious}
          className="absolute left-3 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-grey-100 active:bg-grey-200 flex items-center justify-center transition-colors border border-grey-300 touch-manipulation shadow-lg"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-grey-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {canGoNext && (
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gray-800/90 hover:bg-gray-700 active:bg-gray-600 flex items-center justify-center transition-colors border border-gray-700/50 touch-manipulation"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-grey-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}

function PersonShadow({ variant = 0, delay = 0 }: { variant?: number; delay?: number }) {
  const variants = [
    { width: 50, height: 70, opacity: 0.2 },
    { width: 60, height: 80, opacity: 0.15 },
    { width: 55, height: 75, opacity: 0.18 },
  ];
  const selectedVariant = variants[variant % variants.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: selectedVariant.opacity }}
      transition={{ duration: 1, delay }}
      className="scale-75 sm:scale-90 md:scale-100"
    >
      <svg
        width={selectedVariant.width}
        height={selectedVariant.height}
        viewBox="0 0 60 80"
        fill="none"
        className="drop-shadow-lg"
      >
        {/* Head */}
        <circle cx="30" cy="20" r="12" fill="currentColor" className="text-grey-400" />
        {/* Body - Silhouette */}
        <path
          d="M30 32 Q20 50 15 60 Q15 70 25 70 Q30 70 30 75 Q30 80 35 80 Q40 80 40 75 Q40 70 45 70 Q55 70 55 60 Q50 50 30 32 Z"
          fill="currentColor"
          className="text-grey-400"
        />
      </svg>
    </motion.div>
  );
}
