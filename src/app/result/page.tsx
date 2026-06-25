"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { diagnose, type DiagnosisResult } from "@/lib/diagnosis";
import { loadAnswers } from "@/lib/session";

function StatBar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-xs text-parchment/60">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-parchment/10">
        <div
          className="h-full rounded-full bg-oracle"
          style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right text-xs tabular-nums text-parchment/80">
        {value}
      </span>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    const answers = loadAnswers();
    if (!answers || answers.some((a) => a === undefined)) {
      router.replace("/diagnosis");
      return;
    }
    try {
      setResult(diagnose(answers));
    } catch {
      router.replace("/diagnosis");
    }
  }, [router]);

  if (!result) {
    return (
      <main className="relative z-10 flex flex-1 items-center justify-center text-parchment/50">
        占い中…
      </main>
    );
  }

  const { type, animal } = result;

  return (
    <main className="relative z-10 flex flex-1 flex-col px-6 py-10">
      {/* Oracle reveal */}
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] text-rune">占いの結果、あなたは</p>
        <div className="my-4 text-7xl">{animal.emoji}</div>
        <h1 className="text-3xl font-black text-oracle">{animal.name}</h1>
        <p className="mt-1 text-sm text-parchment/60">{animal.size}</p>
        <p className="mt-3 text-sm text-parchment/80">
          <span className="text-rune">{type.code}</span> ・ {type.name}
        </p>
        <p className="mt-1 text-xs italic text-parchment/60">「{type.hitokoto}」</p>
      </div>

      {/* Stats */}
      <section className="mt-8 space-y-2 rounded-2xl border border-parchment/10 bg-black/20 p-4">
        <StatBar label="HP" value={animal.hp} max={40} />
        <StatBar label="すばやさ" value={animal.spd} max={10} />
        <StatBar label="うん" value={animal.luk} max={10} />
      </section>

      {/* Passive + signature card */}
      <section className="mt-4 space-y-3">
        <div className="rounded-2xl border border-rune/30 bg-rune/5 p-4">
          <p className="text-xs tracking-widest text-rune">パッシブ ・ {animal.passiveName}</p>
          <p className="mt-1 text-sm text-parchment/85">{animal.passive}</p>
        </div>
        <div className="rounded-2xl border border-oracle/30 bg-oracle/5 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-widest text-oracle">固有カード ・ {animal.card}</p>
            <span className="rounded-full bg-oracle/20 px-2 py-0.5 text-xs text-oracle">
              コスト {animal.cost}
            </span>
          </div>
          <p className="mt-1 text-sm text-parchment/85">{animal.cardEffect}</p>
        </div>
        <p className="px-1 text-xs italic text-parchment/50">{animal.flavor}</p>
      </section>

      {/* Actions */}
      <div className="mt-8 space-y-3">
        <Link
          href="/battle"
          className="block w-full rounded-2xl border border-oracle/60 bg-oracle/10 py-4 text-center text-lg font-bold text-oracle transition active:scale-[0.98]"
        >
          ダンジョンへ
        </Link>
        <Link
          href="/diagnosis"
          className="block w-full py-2 text-center text-sm text-parchment/50"
        >
          もう一度占う
        </Link>
      </div>
    </main>
  );
}
