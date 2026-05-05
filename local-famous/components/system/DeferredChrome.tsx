"use client";

import dynamic from "next/dynamic";

// Defer non-critical client-only UI so it doesn't block the initial page render.
// `ssr: false` requires this to live in a client component (Next 15 rule).
const MiniPlayer = dynamic(
  () => import("@/components/player/MiniPlayer").then((m) => m.MiniPlayer),
  { ssr: false, loading: () => null },
);

const KeyboardShortcuts = dynamic(
  () => import("@/components/system/KeyboardShortcuts").then((m) => m.KeyboardShortcuts),
  { ssr: false, loading: () => null },
);

export function DeferredChrome() {
  return (
    <>
      <MiniPlayer />
      <KeyboardShortcuts />
    </>
  );
}
