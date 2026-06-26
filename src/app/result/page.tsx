"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ANIMALS, PERSONALITY_TYPES, type Animal, type PersonalityType } from "@/data/gameData";
import { loadResult, type StoredResult } from "@/lib/session";

function StatBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 shrink-0 text-[11px] tracking-wider text-parchment/55">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-parchment/10">
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.min(100, (value / max) * 100)}%`, background: color }}
        />
      </div>
      <span className="w-7 shrink-0 text-right text-sm font-bold tabular-nums text-parchment">
        {value}
      </span>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState<{
    stored: StoredResult;
    animal: Animal;
    type: PersonalityType;
  } | null>(null);

  useEffect(() => {
    const stored = loadResult();
    const animal = stored ? ANIMALS.find((a) => a.id === stored.animalId) : undefined;
    const type = stored ? PERSONALITY_TYPES.find((t) => t.code === stored.code) : undefined;
    if (!stored || !animal || !type) {
      router.replace("/diagnosis");
      return;
    }
    setData({ stored, animal, type });
  }, [router]);

  if (!data) {
    return (
      <main className="relative z-10 flex flex-1 items-center justify-center text-parchment/50">
        占い中…
      </main>
    );
  }

  const { animal, type } = data;

  return (
    <main className="relative z-10 flex flex-1 flex-col px-5 py-8">
      {/* Tier + type badges */}
      <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest">
        <span className="rounded bg-oracle/20 px-2 py-1 text-oracle">TIER {animal.tier}</span>
        <span className="rounded border border-rune/40 px-2 py-1 text-rune">{type.code}</span>
        <span className="text-parchment/50">{type.name}</span>
      </div>

      {/* Illustration placeholder (no portrait assets — emoji stand-in) */}
      <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-parchment/10 bg-black/30 py-8">
        <div className="text-7xl">{animal.emoji}</div>
        <p className="mt-3 text-[10px] tracking-[0.3em] text-parchment/30">
          ILLUSTRATION · {animal.size}
        </p>
      </div>

      {/* Name + MBTI letters */}
      <div className="mt-4 text-center">
        <h1 className="text-3xl font-black text-parchment">{animal.name}</h1>
        <div className="mt-2 flex justify-center gap-2 text-xs text-parchment/55">
          {type.code.split("").map((c, i) => (
            <span key={i} className="rounded border border-parchment/15 px-2 py-0.5">
              {c}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs italic text-parchment/60">「{type.hitokoto}」</p>
      </div>

      {/* Battle stats */}
      <section className="mt-5">
        <p className="mb-2 text-[11px] tracking-[0.3em] text-parchment/40">BATTLE STATS</p>
        <div className="space-y-2 rounded-2xl border border-parchment/10 bg-black/20 p-4">
          <StatBar label="HP" value={animal.hp} max={40} color="#d8b45a" />
          <StatBar label="SPD" value={animal.spd} max={10} color="#6f7bb6" />
          <StatBar label="LUK" value={animal.luk} max={10} color="#7bb6a1" />
        </div>
      </section>

      {/* Passive */}
      <section className="mt-3 rounded-2xl border border-rune/30 bg-rune/5 p-4">
        <p className="text-[11px] tracking-widest text-rune">PASSIVE · {animal.passiveName}</p>
        <p className="mt-1 text-sm text-parchment/85">{animal.passive}</p>
      </section>

      {/* Signature card */}
      <section className="mt-3 rounded-2xl border border-oracle/30 bg-oracle/5 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] tracking-widest text-oracle">
            SIGNATURE CARD · {animal.card}
          </p>
          <span className="rounded-full bg-oracle/20 px-2 py-0.5 text-xs text-oracle">
            コスト {animal.cost}
          </span>
        </div>
        <p className="mt-1 text-sm text-parchment/85">{animal.cardEffect}</p>
        <p className="mt-2 text-[11px] italic text-parchment/50">{animal.flavor}</p>
      </section>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <Link
          href="/battle"
          className="block w-full rounded-2xl border border-oracle/60 bg-oracle/15 py-4 text-center text-lg font-bold text-oracle transition active:scale-[0.98]"
        >
          ダンジョンへ
        </Link>
        <Link href="/diagnosis" className="block w-full py-2 text-center text-sm text-parchment/50">
          もう一度占う
        </Link>
      </div>
    </main>
  );
}
