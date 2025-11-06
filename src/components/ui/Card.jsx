// src/components/ui/card.jsx
import React from "react";
import "./card.css";

/**
 * Simple Card wrapper used across the site.
 * - Accepts className (merged) and children
 * - Spreads other props (e.g. onClick)
 */
export function Card({ children, className = "", ...props }) {
  return (
    <div className={`lc-card ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * CardContent helper to apply standard padding/typography
 */
export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`lc-card-content ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
