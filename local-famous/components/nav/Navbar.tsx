"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Sun, Moon, Menu, X, Command } from "lucide-react";
import { useTheme } from "@/components/system/ThemeProvider";
import { useCommandPalette } from "@/components/system/CommandPalette";
import { OnAirDot } from "@/components/system/OnAirDot";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/episodes", label: "Episodes" },
  { href: "/local-directory", label: "Directory" },
  { href: "/sponsor", label: "Sponsor" },
  { href: "/be-featured", label: "Be Featured" },
  { href: "/submit-a-story", label: "Submit" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const { open: openPalette } = useCommandPalette();

  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [mac, setMac] = useState(true);

  useEffect(() => {
    // Modern UA-Client-Hints with graceful fallback
    const navWithHints = navigator as Navigator & {
      userAgentData?: { platform?: string };
    };
    const platform =
      navWithHints.userAgentData?.platform ?? navigator.platform ?? "";
    setMac(/(Mac|iPhone|iPod|iPad)/i.test(platform));

    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Quick T to toggle theme
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "t" && !isInputTarget(e.target) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        toggle();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled
          ? "border-rule/12 bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-bg",
      )}
      data-print-hide
    >
      {/* Editorial top strip */}
      <div className="border-b border-rule/10">
        <div className="container-app flex h-7 items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          <span className="hidden sm:inline truncate">Vol. 03 · Issue 47 · {todayLabel()}</span>
          <span className="sm:hidden truncate">Vol. 03 · Issue 47</span>
          <div className="flex items-center gap-3 sm:gap-4">
            <OnAirDot />
            <span className="hidden md:inline">New every Tuesday</span>
          </div>
        </div>
      </div>

      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-tightest leading-none">
            Local
          </span>
          <span className="font-serif italic text-2xl text-accent leading-none">
            Famous
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const active = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {n.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={openPalette}
            className="hidden md:flex items-center gap-2 rounded-full border border-rule/15 bg-surface px-3 py-1.5 text-xs text-ink-muted hover:border-rule/30 hover:text-ink transition-colors"
            aria-label="Search"
          >
            <Search size={13} />
            <span>Search</span>
            <span className="ml-3 inline-flex items-center gap-0.5 rounded border border-rule/15 bg-surface-2 px-1 py-0.5 font-mono text-[10px]">
              {mac ? <Command size={10} /> : <span>Ctrl</span>}
              <span>K</span>
            </span>
          </button>

          <button
            onClick={openPalette}
            className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-rule/15 hover:bg-surface-2"
            aria-label="Search"
          >
            <Search size={15} />
          </button>

          <button
            onClick={toggle}
            className="grid h-9 w-9 place-items-center rounded-full border border-rule/15 hover:bg-surface-2 transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <Link
            href="/sponsor"
            className="hidden md:inline-flex btn btn-primary !h-9 !px-4 !text-xs"
          >
            Sponsor
          </Link>

          <button
            onClick={() => setOpenMobile(true)}
            className="lg:hidden grid h-9 w-9 place-items-center rounded-full border border-rule/15 hover:bg-surface-2"
            aria-label="Open menu"
          >
            <Menu size={15} />
          </button>
        </div>
      </div>

      {openMobile && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpenMobile(false)}
          />
          <div
            className="absolute inset-x-3 overflow-hidden rounded-2xl border border-rule/15 bg-surface shadow-elevate"
            style={{ top: "calc(0.75rem + var(--safe-top))" }}
          >
            <div className="flex items-center justify-between border-b border-rule/12 px-4 py-3">
              <span className="font-serif text-lg">Menu</span>
              <button
                onClick={() => setOpenMobile(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2"
                aria-label="Close menu"
              >
                <X size={14} />
              </button>
            </div>
            <nav className="grid">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center justify-between border-b border-rule/10 px-5 py-4 font-serif text-2xl active:bg-surface-2"
                >
                  {n.label}
                  <span className="font-sans text-[11px] text-ink-subtle">→</span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => {
                  toggle();
                  setOpenMobile(false);
                }}
                className="flex items-center gap-2 rounded-full border border-rule/15 px-3 py-1.5 text-xs"
              >
                {theme === "dark" ? <Sun size={12} /> : <Moon size={12} />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <Link
                href="/sponsor"
                onClick={() => setOpenMobile(false)}
                className="btn btn-primary !h-9 !px-4 !text-xs"
              >
                Sponsor
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function isInputTarget(t: EventTarget | null) {
  if (!(t instanceof HTMLElement)) return false;
  return t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable;
}

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
