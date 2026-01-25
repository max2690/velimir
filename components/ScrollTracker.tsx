"use client";

import { useEffect } from "react";
import { initScrollTracking, initTimeTracking } from "@/lib/metrika";

export const ScrollTracker = () => {
  useEffect(() => {
    const cleanupScroll = initScrollTracking();
    const cleanupTime = initTimeTracking();

    return () => {
      cleanupScroll?.();
      cleanupTime?.();
    };
  }, []);

  return null;
};
