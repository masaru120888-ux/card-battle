import Link from "next/link";

function PartySlot({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-parchment/15 bg-black/30 text-2xl text-parchment/30">
        ?
      </div>
      <span className="text-[10px] tracking-widest text-parchment/40">{label}</span>
      <span className="text-[9px] text-parchment/25">未開放</span>
    </div>
  );
}

export default function TitlePage() {
  return (
    <main className="relative z-10 flex flex-1 flex-col items-center justify-between px-6 py-12 text-center">
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="mb-6 text-[11px] tracking-[0.35em] text-oracle/80">
          16 TYPES · 3 TIERS · 48 BEASTS
        </p>

        <h1 className="text-5xl font-black leading-tight text-parchment drop-shadow-[0_2px_10px_rgba(216,180,90,0.25)]">
          性格診断<span className="text-oracle">バトル</span>
        </h1>
        <p className="mt-3 text-[11px] tracking-[0.3em] text-parchment/50">
          PERSONA · BEAST · DECK BATTLE
        </p>

        <p className="mt-8 max-w-[19rem] text-sm leading-relaxed text-parchment/75">
          四つの問いに答えよ。
          <br />
          あなたの中に棲む獣が、いま姿を現す。
        </p>

        {/* 3-player co-op party slots — decorative/locked in the single-player MVP. */}
        <div className="mt-10 flex gap-5">
          <PartySlot label="P1" />
          <PartySlot label="P2" />
          <PartySlot label="P3" />
        </div>
      </div>

      <div className="w-full">
        <Link
          href="/diagnosis"
          className="block w-full rounded-2xl border border-oracle/60 bg-oracle/15 py-4 text-center text-lg font-bold text-oracle transition active:scale-[0.98]"
        >
          診断をはじめる
        </Link>
        <p className="mt-4 text-[10px] tracking-[0.3em] text-parchment/35">
          3-PLAYER CO-OP · PvE DECK BATTLE
        </p>
      </div>
    </main>
  );
}
