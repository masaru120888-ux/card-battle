import Link from "next/link";

export default function TitlePage() {
  return (
    <main className="relative z-10 flex flex-1 flex-col items-center justify-between px-6 py-16">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-4 tracking-[0.4em] text-rune text-sm">ORACLE DUNGEON</p>
        <h1 className="text-5xl font-black leading-tight text-parchment drop-shadow-[0_2px_8px_rgba(216,180,90,0.25)]">
          性格診断
          <br />
          <span className="text-oracle">ダンジョン</span>
        </h1>
        <p className="mt-6 max-w-[18rem] text-sm leading-relaxed text-parchment/70">
          24の問いに答えると、あなたの中に眠る
          <br />
          ひとつの「けもの」が目を覚ます。
        </p>
      </div>

      <div className="w-full">
        <Link
          href="/diagnosis"
          className="block w-full rounded-2xl border border-oracle/60 bg-oracle/10 py-4 text-center text-lg font-bold text-oracle transition active:scale-[0.98]"
        >
          占いを始める
        </Link>
        <p className="mt-4 text-center text-xs text-parchment/40">
          診断は出題順がランダム。何度でも占える。
        </p>
      </div>
    </main>
  );
}
