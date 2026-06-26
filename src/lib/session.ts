// Tiny client-side store for the single-player diagnosis flow.
// Single-player / client-only for this phase (see plan); swap for Supabase later.
//
// We persist the *resolved* result (not raw answers) because question selection
// and the Tier draw are random per run — storing the outcome keeps the result
// page stable across reloads.

import type { DiagnosisResult } from "@/lib/diagnosis";

const RESULT_KEY = "diagnosis.result";

/** Slim, serializable form of a result (animal looked up by id on read). */
export interface StoredResult {
  code: string;
  animalId: number;
  tier: number;
  tierTotal: number;
  perAxis: { axis: string; value: number; letter: string; questionId: number }[];
}

export function saveResult(result: DiagnosisResult): void {
  if (typeof window === "undefined") return;
  const stored: StoredResult = {
    code: result.code,
    animalId: result.animal.id,
    tier: result.tier,
    tierTotal: result.tierTotal,
    perAxis: result.perAxis.map((o) => ({
      axis: o.axis,
      value: o.value,
      letter: o.letter,
      questionId: o.question.id,
    })),
  };
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(stored));
}

export function loadResult(): StoredResult | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredResult;
  } catch {
    return null;
  }
}

export function clearResult(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(RESULT_KEY);
}
