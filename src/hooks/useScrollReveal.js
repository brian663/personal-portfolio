import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px", ...options },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.rootMargin, options.threshold]);

  return [elementRef, isVisible];
}
