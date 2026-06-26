// AUTO-GENERATED from data/animal-databank.xlsx (do not hand-edit).
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

export const BASIC_CARDS: BasicCard[] = [
  {"name": "牙", "cost": 1, "effect": "ダメージ6（×3枚）"},
  {"name": "鱗", "cost": 1, "effect": "ブロック6（×3枚）"},
];

export const KEYWORDS: Keyword[] = [
  {"keyword": "ブロック", "kind": "防御", "effect": "その値ぶんダメージを肩代わり。ターン終了で消滅"},
  {"keyword": "毒", "kind": "デバフ(持続)", "effect": "ターン開始時に数値ぶんダメージ→その後 毒-1"},
  {"keyword": "出血", "kind": "デバフ(持続)", "effect": "カードをプレイするたび1ダメージ。ターン終了で-1"},
  {"keyword": "粘着", "kind": "デバフ", "effect": "SPDダウン(行動順が遅くなる)。スタックで重い"},
  {"keyword": "拘束", "kind": "デバフ", "effect": "1ターン行動不能。強力なので付与は高コスト"},
  {"keyword": "弱体", "kind": "デバフ", "effect": "対象の次の攻撃ダメージ-50%"},
  {"keyword": "挑発", "kind": "デバフ", "effect": "敵の攻撃対象を強制的に自分へ向ける"},
  {"keyword": "回避", "kind": "バフ", "effect": "次に受ける攻撃1回を無効化"},
  {"keyword": "強化", "kind": "バフ", "effect": "攻撃ダメージ+(スタックで重ねがけ可)"},
  {"keyword": "再生", "kind": "バフ(持続)", "effect": "ターン開始時にHP回復→その後 再生-1"},
];

export const GENERIC_POOL: PoolCard[] = [
  {"id": 1, "tier": 1, "category": "攻撃", "name": "ひっかき", "cost": 0, "effect": "ダメージ4"},
  {"id": 2, "tier": 1, "category": "攻撃", "name": "かみつき", "cost": 1, "effect": "ダメージ7"},
  {"id": 3, "tier": 1, "category": "攻撃", "name": "連突き", "cost": 1, "effect": "ダメージ3×2"},
  {"id": 4, "tier": 1, "category": "防御", "name": "とっさの盾", "cost": 0, "effect": "ブロック4"},
  {"id": 5, "tier": 1, "category": "防御", "name": "身構え", "cost": 1, "effect": "ブロック7"},
  {"id": 6, "tier": 1, "category": "状態異常", "name": "かじる", "cost": 1, "effect": "ダメージ3＋毒2"},
  {"id": 7, "tier": 1, "category": "状態異常", "name": "ひるませ", "cost": 1, "effect": "ダメージ4＋弱体"},
  {"id": 8, "tier": 1, "category": "支援", "name": "かけ声", "cost": 1, "effect": "味方1体に強化1"},
  {"id": 9, "tier": 1, "category": "支援", "name": "なめる", "cost": 0, "effect": "自分に再生2"},
  {"id": 10, "tier": 1, "category": "操作", "name": "目配り", "cost": 0, "effect": "1ドロー"},
  {"id": 11, "tier": 1, "category": "操作", "name": "深呼吸", "cost": 1, "effect": "エナジー+1"},
  {"id": 12, "tier": 1, "category": "操作", "name": "様子見", "cost": 0, "effect": "ブロック3＋次ターン開始時1ドロー"},
  {"id": 13, "tier": 2, "category": "攻撃", "name": "連打", "cost": 1, "effect": "ダメージ4×2"},
  {"id": 14, "tier": 2, "category": "攻撃", "name": "強打", "cost": 2, "effect": "ダメージ12"},
  {"id": 15, "tier": 2, "category": "攻撃", "name": "なぎ払い", "cost": 2, "effect": "敵全体にダメージ6"},
  {"id": 16, "tier": 2, "category": "防御", "name": "防壁", "cost": 2, "effect": "ブロック12"},
  {"id": 17, "tier": 2, "category": "防御", "name": "反射", "cost": 1, "effect": "ブロック6＋次に受けた攻撃に反撃3"},
  {"id": 18, "tier": 2, "category": "状態異常", "name": "噛み裂き", "cost": 2, "effect": "ダメージ6＋出血2"},
  {"id": 19, "tier": 2, "category": "状態異常", "name": "毒撒き", "cost": 1, "effect": "敵全体に毒2"},
  {"id": 20, "tier": 2, "category": "状態異常", "name": "足払い", "cost": 1, "effect": "ダメージ4＋粘着"},
  {"id": 21, "tier": 2, "category": "支援", "name": "鼓舞", "cost": 1, "effect": "味方1体に強化2"},
  {"id": 22, "tier": 2, "category": "支援", "name": "治療", "cost": 1, "effect": "味方1体をHP回復6"},
  {"id": 23, "tier": 2, "category": "操作", "name": "早回し", "cost": 1, "effect": "1ドロー＋ブロック3"},
  {"id": 24, "tier": 2, "category": "操作", "name": "仕切り直し", "cost": 1, "effect": "手札を1枚捨て、2ドロー"},
  {"id": 25, "tier": 3, "category": "攻撃", "name": "渾身", "cost": 2, "effect": "ダメージ18"},
  {"id": 26, "tier": 3, "category": "攻撃", "name": "乱舞", "cost": 3, "effect": "ダメージ5×4"},
  {"id": 27, "tier": 3, "category": "攻撃", "name": "大爆発", "cost": 3, "effect": "敵全体にダメージ14"},
  {"id": 28, "tier": 3, "category": "防御", "name": "鉄壁の陣", "cost": 2, "effect": "味方全体にブロック8"},
  {"id": 29, "tier": 3, "category": "防御", "name": "不動", "cost": 3, "effect": "ブロック20＋強化2"},
  {"id": 30, "tier": 3, "category": "状態異常", "name": "猛毒牙", "cost": 3, "effect": "ダメージ8＋毒5"},
  {"id": 31, "tier": 3, "category": "状態異常", "name": "拘束網", "cost": 2, "effect": "ダメージ6＋拘束"},
  {"id": 32, "tier": 3, "category": "状態異常", "name": "衰弱の呪", "cost": 2, "effect": "敵全体に弱体＋出血3"},
  {"id": 33, "tier": 3, "category": "支援", "name": "全体治療", "cost": 2, "effect": "味方全体をHP回復8"},
  {"id": 34, "tier": 3, "category": "支援", "name": "鼓舞の旗", "cost": 2, "effect": "味方全体に強化2"},
  {"id": 35, "tier": 3, "category": "操作", "name": "覚醒", "cost": 3, "effect": "エナジー+2＋2ドロー"},
  {"id": 36, "tier": 3, "category": "操作", "name": "連鎖", "cost": 2, "effect": "2ドロー＋エナジー+1"},
];
