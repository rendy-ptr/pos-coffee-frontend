import { gsap } from 'gsap';

export const heroAnimation = (context: unknown) => {
  const tl = gsap.timeline({
    defaults: { duration: 0.8, ease: 'power3.out' },
    context,
    delay: 0.2,
  });

  // 1. Hero welcome - subtle entrance
  tl.fromTo(
    '.hero-welcome',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9 }
  );

  // 2. Hero title - smooth follow-up
  tl.fromTo(
    '.hero-title',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9 },
    '-=0.6'
  );

  // 3. Hero description - slightly faster
  tl.fromTo(
    '.hero-desc',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    '-=0.5'
  );

  // 4. Hero buttons container - slide up and fade in
  tl.fromTo(
    '.hero-buttons',
    { y: 12, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
    },
    '-=0.5'
  );

  // 5. Hero buttons individual - staggered pop-in
  tl.fromTo(
    '.hero-buttons > button',
    { y: 10, opacity: 0, scale: 0.92 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out(1.3)',
    },
    '-=0.6'
  );

  // 6. Hero circles - smoother scale and fade
  tl.fromTo(
    '.hero-circle-1',
    { opacity: 0, scale: 0.85 },
    { opacity: 0.25, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.8)' },
    '-=0.8'
  ).fromTo(
    '.hero-circle-2',
    { opacity: 0, scale: 0.85 },
    { opacity: 0.15, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.8)' },
    '-=1'
  );

  // 7. Hero image - refined entrance
  tl.fromTo(
    '.hero-image',
    { scale: 0.95, rotation: 5, opacity: 0 },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'elastic.out(1, 0.6)',
    },
    '-=0.8'
  );

  // 8. Hero features - smooth staggered entrance
  tl.fromTo(
    '.hero-feature',
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    },
    '-=0.7'
  );

  // Floating loop for circles - synchronized and subtle
  gsap.to('.hero-circle-1', {
    y: -10,
    duration: 4,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });

  gsap.to('.hero-circle-2', {
    y: 10,
    duration: 4,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 0.3,
  });

  return tl;
};
