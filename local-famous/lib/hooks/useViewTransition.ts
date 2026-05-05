"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Wrap router.push with the View Transitions API when available.
 * Falls back to a normal navigation otherwise.
 */
export function useViewTransition() {
  const router = useRouter();
  return useCallback(
    (href: string) => {
      const start = (
        document as Document & {
          startViewTransition?: (cb: () => void) => unknown;
        }
      ).startViewTransition;
      if (typeof start === "function") {
        start.call(document, () => router.push(href));
      } else {
        router.push(href);
      }
    },
    [router],
  );
}
