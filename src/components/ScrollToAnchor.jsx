import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToAnchor() {
  const location = useLocation();
  const lastHash = useRef("");

  useEffect(() => {
    if (location.hash) lastHash.current = location.hash.slice(1);
    if (!lastHash.current) return;

    const el = document.getElementById(lastHash.current);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      lastHash.current = "";
    }
  }, [location]);

  return null;
}
