"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// The actual modal is heavy (icons, dataset traversal). Defer until first open.
const PaletteModal = dynamic(() => import("./CommandPalette.modal"), {
  ssr: false,
  loading: () => null,
});

const PaletteCtx = createContext<{ open: () => void; close: () => void; isOpen: boolean } | null>(
  null,
);

export function useCommandPalette() {
  const v = useContext(PaletteCtx);
  if (!v) throw new Error("useCommandPalette inside <CommandPaletteProvider>");
  return v;
}

function isInputTarget(t: EventTarget | null): boolean {
  if (!(t instanceof HTMLElement)) return false;
  const tag = t.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || t.isContentEditable;
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "/" && !isInputTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PaletteCtx.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && <PaletteModal onClose={close} />}
    </PaletteCtx.Provider>
  );
}
