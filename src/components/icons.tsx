import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P): P => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...p,
});

export const IconUser = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
);
export const IconBag = (p: P) => (
  <svg {...base(p)}><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>
);
export const IconTruck = (p: P) => (
  <svg {...base(p)}><path d="M2 6h11v10H2z" /><path d="M13 9h4l3 3v4h-7" /><circle cx="6" cy="18" r="1.8" /><circle cx="16" cy="18" r="1.8" /></svg>
);
export const IconShield = (p: P) => (
  <svg {...base(p)}><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base(p)}><path d="M5 12l5 5 9-10" /></svg>
);
export const IconPercent = (p: P) => (
  <svg {...base(p)}><path d="M19 5L5 19" /><circle cx="7" cy="7" r="2" /><circle cx="17" cy="17" r="2" /></svg>
);
export const IconArrow = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconHeart = (p: P) => (
  <svg {...base(p)}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
);
export const IconStar = (p: P) => (
  <svg {...base({ fill: "currentColor", strokeWidth: 0, ...p })}><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7L12 2z" /></svg>
);
export const IconMenu = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
