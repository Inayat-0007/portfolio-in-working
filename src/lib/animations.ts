export const ANIMATION_PRESETS = {
  fadeUp: {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  fadeDown: {
    initial: { y: -60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  slideLeft: {
    initial: { x: -80, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  slideRight: {
    initial: { x: 80, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  popIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
} as const;

export const STAGGER_CONTAINER = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const STAGGER_ITEM = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const GSAP_EASE = {
  smooth: "power3.out",
  expo: "expo.out",
  elastic: "elastic.out(1, 0.5)",
  back: "back.out(1.7)",
};
