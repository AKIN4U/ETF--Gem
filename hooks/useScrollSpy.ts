// FIX: Add missing React import to fix reference errors.
import React from 'react';

export const useScrollSpy = (
  elementIds: string[],
  options?: IntersectionObserverInit
): string | null => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const observer = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    const elements = elementIds.map((id) => document.getElementById(id));
    
    // Disconnect previous observer if it exists
    if (observer.current) {
      observer.current.disconnect();
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };
    
    observer.current = new IntersectionObserver(handleIntersect, options);
    
    elements.forEach((el) => {
      if (el) {
        observer.current?.observe(el);
      }
    });

    return () => observer.current?.disconnect();
  }, [elementIds, options]);

  return activeId;
};
