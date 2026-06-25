// Tiny client-side store for the single-player diagnosis flow.
// Single-player / client-only for this phase (see plan); swap for Supabase later.

import type { Answer } from "@/lib/diagnosis";

const ANSWERS_KEY = "diagnosis.answers";

export function saveAnswers(answers: Answer[]): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function loadAnswers(): Answer[] | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(ANSWERS_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Answer[]) : null;
  } catch {
    return null;
  }
}

export function clearAnswers(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ANSWERS_KEY);
}
