"use client";

import {
  useSmoothScroll,
  useScrollAnimations,
} from "@/hooks/use-smooth-scroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSmoothScroll();
  useScrollAnimations();

  return <>{children}</>;
}
