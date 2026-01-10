"use client";

import ReadMore from "./ReadMore";

interface ReadMoreWrapperProps {
  text: string;
  minLength?: number;
  maxLength?: number;
  className?: string;
}

/**
 * Wrapper component that decides whether to render ReadMore based on text length.
 * Only shows ReadMore functionality if text exceeds minLength.
 */
export default function ReadMoreWrapper({ 
  text, 
  minLength = 200,
  maxLength = 150,
  className = "" 
}: ReadMoreWrapperProps) {
  // If text is shorter than minLength, just render it normally
  if (text.length < minLength) {
    return (
      <p className={className}>
        {text}
      </p>
    );
  }

  // Otherwise, use ReadMore component
  return (
    <ReadMore 
      text={text} 
      maxLength={maxLength}
      className={className}
    />
  );
}
