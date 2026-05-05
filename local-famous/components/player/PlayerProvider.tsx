"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Episode } from "@/lib/types";

interface PlayerState {
  episode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  expanded: boolean;
}

interface PlayerContextValue extends PlayerState {
  play: (ep: Episode, startAt?: number) => void;
  toggle: () => void;
  seek: (t: number) => void;
  setRate: (r: number) => void;
  setExpanded: (v: boolean) => void;
  skip: (sec: number) => void;
  close: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [expanded, setExpanded] = useState(false);

  // Wire audio events
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTime = () => setCurrentTime(el.currentTime);
    const onDur = () => setDuration(el.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => setIsPlaying(false);

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onDur);
    el.addEventListener("durationchange", onDur);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnd);

    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onDur);
      el.removeEventListener("durationchange", onDur);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.playbackRate = playbackRate;
  }, [playbackRate]);

  const play = useCallback((ep: Episode, startAt = 0) => {
    const el = audioRef.current;
    if (!el) return;
    if (episode?.slug !== ep.slug) {
      el.src = ep.audioUrl;
      setEpisode(ep);
      setDuration(ep.duration);
    }
    el.currentTime = startAt;
    el.play().catch(() => {
      /* autoplay blocked — user must click */
    });
  }, [episode?.slug]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !episode) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  }, [episode]);

  const seek = useCallback((t: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min(t, el.duration || duration));
    setCurrentTime(el.currentTime);
  }, [duration]);

  const skip = useCallback((sec: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min((el.currentTime || 0) + sec, el.duration || duration));
  }, [duration]);

  const setRate = useCallback((r: number) => setPlaybackRate(r), []);

  const close = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
    setEpisode(null);
    setIsPlaying(false);
    setExpanded(false);
    setCurrentTime(0);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!episode) return;
      const target = e.target as HTMLElement;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      } else if (e.code === "ArrowRight" && e.shiftKey) {
        skip(15);
      } else if (e.code === "ArrowLeft" && e.shiftKey) {
        skip(-15);
      } else if (e.key === "Escape") {
        setExpanded(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [episode, toggle, skip]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      episode,
      isPlaying,
      currentTime,
      duration,
      playbackRate,
      expanded,
      play,
      toggle,
      seek,
      setRate,
      setExpanded,
      skip,
      close,
      audioRef,
    }),
    [episode, isPlaying, currentTime, duration, playbackRate, expanded, play, toggle, seek, setRate, skip, close],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </PlayerContext.Provider>
  );
}
