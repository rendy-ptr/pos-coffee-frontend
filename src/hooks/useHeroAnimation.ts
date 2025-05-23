import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { heroAnimation } from '@/animation/heroAnimation';

export const useHeroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(self => {
      heroAnimation(self);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};
