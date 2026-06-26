#!/usr/bin/env python3
"""Generate src/data/cards.ts from the animal databank Excel.

Reads the battle reference sheets (basic cards, keyword definitions, generic card
pool) from data/animal-databank.xlsx and emits a typed TypeScript module.

The types/animals/questions live in src/data/gameData.ts (already verified
identical to the Excel) and are not regenerated here.

Usage: python3 scripts/extract_excel_data.py
Requires: openpyxl
"""
import json
import os
import sys

try:
    import openpyxl
except ImportError:
    sys.exit("openpyxl required: pip install openpyxl")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XLSX = os.path.join(ROOT, "data", "animal-databank.xlsx")
OUT = os.path.join(ROOT, "src", "data", "cards.ts")


def rows(ws):
    data = list(ws.iter_rows(values_only=True))
    return [r for r in data[1:] if r[0] not in (None, "")]


def js(o):
    return json.dumps(o, ensure_ascii=False)


def main():
    wb = openpyxl.load_workbook(XLSX, data_only=True)

    # 基礎カード only (固有 cards already live on each animal in gameData.ts).
    basics = []
    for r in rows(wb["カード一覧"]):
        category, owner, name, cost, effect = r[0], r[1], r[2], r[3], r[4]
        if str(category).strip() == "基礎":
            basics.append({"name": name, "cost": int(str(cost)), "effect": effect})

    keywords = [
        {"keyword": r[0], "kind": r[1], "effect": r[2]} for r in rows(wb["キーワード定義"])
    ]

    pool = []
    for r in rows(wb["汎用カードプール"]):
        no, tier, category, name, cost, effect = r[0], r[1], r[2], r[3], r[4], r[5]
        pool.append({
            "id": int(no),
            "tier": int(str(tier).replace("T", "")),
            "category": category,
            "name": name,
            "cost": int(str(cost)),
            "effect": effect,
        })

    header = """// AUTO-GENERATED from data/animal-databank.xlsx (do not hand-edit).
// Regenerate with: python3 scripts/extract_excel_data.py
//
// Battle REFERENCE data only. No battle logic is implemented yet (the mockup's
// LIBERATION/RAGE gauges, enemy roster, attack telegraph, Lv system and stages
// remain undefined). These tables describe the deck-building card set defined in
// the Excel so the future battle layer can consume them without reshaping data.
//
// Deck (per Excel README): 7 cards = 3 attack (牙) + 3 defense (鱗) + 1 signature
// (per-animal, see ANIMALS in gameData.ts). Hand 3 / Energy 3 / discard-all on
// turn end; reshuffle discard when the draw pile is empty.

export interface BasicCard {
  name: string;
  cost: number;
  effect: string;
}

export interface Keyword {
  keyword: string;
  kind: string;
  effect: string;
}

export interface PoolCard {
  id: number;
  tier: number; // 1..3
  category: string; // 攻撃 / 防御 / 状態異常 / 支援 / 操作
  name: string;
  cost: number;
  effect: string;
}
"""

    parts = [header]
    parts.append("export const BASIC_CARDS: BasicCard[] = [")
    parts += ["  " + js(b) + "," for b in basics]
    parts.append("];\n")
    parts.append("export const KEYWORDS: Keyword[] = [")
    parts += ["  " + js(k) + "," for k in keywords]
    parts.append("];\n")
    parts.append("export const GENERIC_POOL: PoolCard[] = [")
    parts += ["  " + js(c) + "," for c in pool]
    parts.append("];\n")

    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(parts))
    print(f"wrote {OUT}: {len(basics)} basics, {len(keywords)} keywords, {len(pool)} pool cards")


if __name__ == "__main__":
    main()
