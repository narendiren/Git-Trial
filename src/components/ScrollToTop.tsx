"use client";

import { useLayoutEffect } from "react";

// Forces every fresh load to start at the hero, regardless of the
// browser's own history scroll-restoration or an anchor hash left in the
// URL from a previous visit/click. useLayoutEffect (not useEffect) so this
// runs before the browser paints, avoiding a visible jump.
export default function ScrollToTop() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
