import Link from "next/link";

// Placeholder only. The battle system (Slay-the-Spire-like deck builder) is
// intentionally NOT implemented: the mockup's mechanics (LIBERATION / RAGE
// gauges, enemy roster & intent, the common card pool, energy, levels, status
// keywords) are not yet defined. They will be built when the battle data is
// provided. See src/lib/battle/types.ts.

export default function BattlePage() {
  return (
    <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="text-5xl">⚔️</div>
      <h1 className="mt-4 text-2xl font-bold text-parchment">ダンジョン準備中</h1>
      <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-parchment/70">
        戦闘システム（デッキ構築バトル）は、ルールとデータが
        確定し次第このダンジョンに実装されます。
      </p>
      <Link
        href="/"
        className="mt-10 rounded-2xl border border-oracle/60 bg-oracle/10 px-8 py-3 text-oracle transition active:scale-[0.98]"
      >
        タイトルへ
      </Link>
    </main>
  );
}
