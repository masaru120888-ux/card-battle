"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, type Question } from "@/data/gameData";
import { saveAnswers } from "@/lib/session";

/** Fisher–Yates shuffle (questions are presented in random order per the design). */
function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function DiagnosisPage() {
  const router = useRouter();
  const order = useMemo<Question[]>(() => shuffle(QUESTIONS), []);
  const [index, setIndex] = useState(0);
  // Answers keyed by question id, so display order can differ from canonical order.
  const [byId, setById] = useState<Record<number, boolean>>({});

  const total = order.length;
  const current = order[index];

  function answer(yes: boolean) {
    const next = { ...byId, [current.id]: yes };
    setById(next);

    if (index + 1 < total) {
      setIndex(index + 1);
      return;
    }

    // Done — emit answers in canonical QUESTIONS order and move to the result.
    const answers = QUESTIONS.map((q) => next[q.id]);
    saveAnswers(answers);
    router.push("/result");
  }

  function back() {
    if (index > 0) setIndex(index - 1);
  }

  return (
    <main className="relative z-10 flex flex-1 flex-col px-6 py-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-parchment/60">
          <button
            onClick={back}
            disabled={index === 0}
            className="disabled:opacity-30"
          >
            ← もどる
          </button>
          <span className="tracking-widest">
            {index + 1} <span className="text-parchment/40">/ {total}</span>
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-parchment/10">
          <div
            className="h-full rounded-full bg-oracle transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-6 text-xs tracking-[0.3em] text-rune">
          {current.axisMeaning}
        </p>
        <h2 className="text-2xl font-bold leading-relaxed text-parchment">
          {current.text}
        </h2>
      </div>

      {/* Yes / No — thumb-zone, slider-style */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => answer(false)}
          className="rounded-2xl border border-rune/50 bg-rune/10 py-6 text-lg font-bold text-rune transition active:scale-[0.97]"
        >
          いいえ
        </button>
        <button
          onClick={() => answer(true)}
          className="rounded-2xl border border-oracle/60 bg-oracle/10 py-6 text-lg font-bold text-oracle transition active:scale-[0.97]"
        >
          はい
        </button>
      </div>
    </main>
  );
}
