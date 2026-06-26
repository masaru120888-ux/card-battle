"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { type Question } from "@/data/gameData";
import {
  diagnose,
  pickQuestions,
  type SliderValue,
} from "@/lib/diagnosis";
import { saveResult } from "@/lib/session";

const STEPS: SliderValue[] = [1, 2, 3, 4, 5];

/** Strip the parenthetical MBTI letter for display, e.g. "内向(I)" -> "内向". */
function poleLabel(pole: string): string {
  return pole.replace(/\s*\([A-Z]\)\s*/g, "");
}

export default function DiagnosisPage() {
  const router = useRouter();
  // One random question per axis (EI/NS/TF/JP) = 4 questions, fixed for this run.
  const questions = useMemo<Question[]>(() => pickQuestions(), []);
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<(SliderValue | null)[]>(
    () => questions.map(() => null),
  );

  const total = questions.length;
  const current = questions[index];
  const selected = values[index];

  function choose(v: SliderValue) {
    setValues((prev) => {
      const next = [...prev];
      next[index] = v;
      return next;
    });
  }

  function nextOrFinish() {
    if (selected == null) return;
    if (index + 1 < total) {
      setIndex(index + 1);
      return;
    }
    const answers = values.map((v) => v ?? 3) as SliderValue[];
    const result = diagnose(answers, questions);
    saveResult(result);
    router.push("/result");
  }

  function back() {
    if (index > 0) setIndex(index - 1);
  }

  return (
    <main className="relative z-10 flex flex-1 flex-col px-6 py-10">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-2 flex items-center justify-between text-xs text-parchment/60">
          <button onClick={back} disabled={index === 0} className="disabled:opacity-30">
            ← もどる
          </button>
          <span className="tracking-widest">
            {index + 1} <span className="text-parchment/40">/ {total}</span>
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-parchment/10">
          <div
            className="h-full rounded-full bg-oracle transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Axis + question */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-5 text-[11px] tracking-[0.3em] text-rune">
          AXIS · {current.axis} &nbsp; {current.axisMeaning}
        </p>
        <h2 className="text-2xl font-bold leading-relaxed text-parchment">
          {current.text}
        </h2>
      </div>

      {/* 5-step slider */}
      <div className="mb-8">
        <div className="mb-2 flex items-end justify-between text-[11px] text-parchment/55">
          <span className="text-left">
            いいえ
            <br />
            <span className="text-rune">{poleLabel(current.leftPole)}寄り</span>
          </span>
          <span className="text-right">
            はい
            <br />
            <span className="text-oracle">{poleLabel(current.yesPole)}寄り</span>
          </span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {STEPS.map((v) => {
            const active = selected === v;
            return (
              <button
                key={v}
                onClick={() => choose(v)}
                aria-pressed={active}
                className={
                  "rounded-xl border py-5 text-lg font-bold transition active:scale-[0.97] " +
                  (active
                    ? "border-oracle bg-oracle/20 text-oracle"
                    : "border-parchment/15 bg-black/20 text-parchment/60")
                }
              >
                {v}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-center text-[11px] text-parchment/40">
          どちらとも言えない
        </p>
      </div>

      <button
        onClick={nextOrFinish}
        disabled={selected == null}
        className="w-full rounded-2xl border border-oracle/60 bg-oracle/15 py-4 text-center text-lg font-bold text-oracle transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
      >
        {index + 1 < total ? "次へ" : "結果を見る"}
      </button>
    </main>
  );
}
