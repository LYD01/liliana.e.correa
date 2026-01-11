"use client";

import { useState } from "react";

interface ReadMoreProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export default function ReadMore({ text, maxLength = 150, className = "" }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // If text is shorter than maxLength, don't show read more
  if (text.length <= maxLength) {
    return (
      <p className={className}>
        {text}
      </p>
    );
  }

  const truncatedText = text.slice(0, maxLength).trim();
  const displayText = isExpanded ? text : truncatedText;

  return (
    <div className={className}>
      <span className="inline">
        {displayText}
        {!isExpanded && "..."}
      </span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="ml-1.5 text-grey-800 underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded transition-all"
        aria-label={isExpanded ? "Read less" : "Read more"}
        type="button"
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
