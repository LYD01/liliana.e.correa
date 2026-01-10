"use client"
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import type { Work } from "@/app/_constants";
// Using SVG icon instead of lucide-react

interface WorkModalProps {
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkModal({ work, isOpen, onClose }: WorkModalProps) {
  const isVideo = work?.id === 11;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!work) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Night sky with stars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 night-sky-background"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden p-0 md:p-6 lg:p-8 xl:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full md:w-auto md:h-auto md:max-w-[90vw] md:max-h-[90vh] lg:max-w-[85vw] lg:max-h-[85vh] xl:max-w-[80vw] xl:max-h-[80vh]">
              {isVideo ? (
                <VideoRoomModal work={work} onClose={onClose} />
              ) : (
                <StoryModal work={work} onClose={onClose} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StoryModal({ work, onClose }: { work: Work; onClose: () => void }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-none md:rounded-3xl shadow-2xl w-full h-full overflow-hidden flex flex-col pointer-events-auto border-0 md:border border-gray-700/50">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-10 md:h-10 rounded-full bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-700/50"
        aria-label="Close modal"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg md:rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={work.img}
              alt={work.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 sm:mb-5 md:mb-6 space-y-2 sm:space-y-3"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            {work.title}
          </h1>
          {work.subTitle && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 italic">
              {work.subTitle}
            </p>
          )}
        </motion.div>

        {/* Content Boxes - Story-like Layout */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 mt-6 sm:mt-8 md:mt-12">
          {/* Summary/Description Box */}
          {(work.summary || work.description) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 rounded-lg md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border-l-4 border-blue-500/50 shadow-lg"
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 whitespace-pre-line">
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
              className="bg-gray-800/30 rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-gray-700/50 ml-auto max-w-full sm:max-w-md"
            >
              <p className="text-xs sm:text-sm text-gray-400 italic">{work.artist}</p>
            </motion.div>
          )}

          {/* External Link Box */}
          {work.externalUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center pt-2 sm:pt-3 md:pt-4"
            >
              <Link
                href={work.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-lg md:rounded-xl text-white text-sm sm:text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                View Full Work
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoRoomModal({ work, onClose }: { work: Work; onClose: () => void }) {
  // Extract Vimeo video ID from the iframe src
  const vimeoMatch = work.description?.match(/vimeo\.com\/video\/(\d+)/);
  const videoId = vimeoMatch ? vimeoMatch[1] : null;

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-none md:rounded-3xl shadow-2xl w-full h-full overflow-hidden flex flex-col pointer-events-auto border-0 md:border border-gray-700/50 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-700/50"
        aria-label="Close modal"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

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

      {/* Scrollable Room Content */}
      <div
        className="overflow-x-auto overflow-y-hidden flex-1 flex items-center scroll-smooth horizontal-scroll"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'thin' }}
      >
        {/* Room Sections */}
        <div className="flex h-full min-w-max">
          {/* Title Section */}
          <div className="w-screen h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 scroll-snap-align-start relative">
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {work.title}
              </h1>
              {work.subTitle && (
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 italic mb-4 sm:mb-6 md:mb-8">{work.subTitle}</p>
              )}
              <motion.div
                className="text-gray-300 text-sm sm:text-base md:text-lg"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <p className="mb-2 sm:mb-4 flex items-center justify-center gap-2">
                  Scroll right to watch the video
                  <span>→</span>
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Video Section */}
          <div className="w-screen h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 scroll-snap-align-center bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 relative">
            {/* Theater-like lighting effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-5xl relative z-10"
            >
              {videoId ? (
                <div className="relative w-full pb-[56.25%] rounded-lg md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-gray-700/50 bg-black">
                  {/* Glow effect around video */}
                  <div className="absolute -inset-1 md:-inset-2 bg-blue-500/20 rounded-lg md:rounded-2xl blur-xl -z-10"></div>
                  <iframe
                    src={`https://player.vimeo.com/video/${videoId}?autoplay=0&title=0&byline=0&portrait=0`}
                    className="absolute top-0 left-0 w-full h-full rounded-lg md:rounded-xl"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative w-full pb-[56.25%] rounded-lg md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-gray-700/50 bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400 text-sm sm:text-base">Video unavailable</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Description Section */}
          {work.summary && (
            <div className="w-screen h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 scroll-snap-align-end">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-3xl bg-gray-800/50 rounded-lg md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-gray-700/50 shadow-xl"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">About This Work</h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 whitespace-pre-line">
                  {work.summary}
                </p>
                {work.externalUrl && (
                  <Link
                    href={work.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 sm:mt-5 md:mt-6 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
                  >
                    Learn more
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-600"></div>
        {work.summary && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-600"></div>}
      </div>
    </div>
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
        <circle cx="30" cy="20" r="12" fill="currentColor" className="text-gray-700" />
        {/* Body - Silhouette */}
        <path
          d="M30 32 Q20 50 15 60 Q15 70 25 70 Q30 70 30 75 Q30 80 35 80 Q40 80 40 75 Q40 70 45 70 Q55 70 55 60 Q50 50 30 32 Z"
          fill="currentColor"
          className="text-gray-700"
        />
      </svg>
    </motion.div>
  );
}
