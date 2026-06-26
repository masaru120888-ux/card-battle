import {
  ANIMALS,
  PERSONALITY_TYPES,
  QUESTIONS,
  type Animal,
  type AxisKey,
  type PersonalityType,
  type Question,
} from "@/data/gameData";

// Diagnosis spec (data/animal-databank.xlsx README):
//  1. Draw one question per axis (EI/NS/TF/JP) at random = 4 questions.
//  2. Each answered on a 5-step slider. Dominant pole per axis -> MBTI (16 types).
//  3. Sum the per-answer tier value (0..8) and draw Tier 1/2/3 by a weighted table.

/** Slider position: 1 = full "no/left", 3 = neutral, 5 = full "yes/right". */
export type SliderValue = 1 | 2 | 3 | 4 | 5;

/** Injectable RNG returning [0, 1). Defaults to Math.random; overridden in tests. */
export type Rng = () => number;

const AXES: AxisKey[] = ["EI", "NS", "TF", "JP"];

const AXIS_LETTERS: Record<AxisKey, [string, string]> = {
  EI: ["E", "I"],
  NS: ["N", "S"],
  TF: ["T", "F"],
  JP: ["J", "P"],
};

/** Read the single MBTI letter from a pole label like "外向(E)" / "内向(I)". */
function letterOf(pole: string, axis: AxisKey): string {
  const [a, b] = AXIS_LETTERS[axis];
  if (pole.includes(`(${a})`)) return a;
  if (pole.includes(`(${b})`)) return b;
  return pole.includes(a) ? a : b;
}

/** Per-axis slider scoring (left + right always sum to 4; tierVal = |v-3|). */
export function scoreSlider(v: SliderValue): {
  left: number;
  right: number;
  tierVal: number;
} {
  return { left: 5 - v, right: v - 1, tierVal: Math.abs(v - 3) };
}

export interface AxisOutcome {
  axis: AxisKey;
  question: Question;
  value: SliderValue;
  letter: string;
  tierVal: number;
}

export interface DiagnosisResult {
  code: string;
  type: PersonalityType;
  animal: Animal;
  tier: number;
  tierTotal: number;
  perAxis: AxisOutcome[];
}

/** Pick one random question per axis, in EI/NS/TF/JP order. */
export function pickQuestions(rng: Rng = Math.random, pool: Question[] = QUESTIONS): Question[] {
  return AXES.map((axis) => {
    const candidates = pool.filter((q) => q.axis === axis);
    return candidates[Math.floor(rng() * candidates.length)];
  });
}

/**
 * Weighted Tier draw from the README table (tier value 0..8).
 *   low  (0-2): 60 / 30 / 10
 *   mid  (3-5): 25 / 50 / 25
 *   high (6-8): 10 / 30 / 60
 */
export function drawTier(tierTotal: number, rng: Rng = Math.random): number {
  const weights =
    tierTotal <= 2 ? [60, 30, 10] : tierTotal <= 5 ? [25, 50, 25] : [10, 30, 60];
  const roll = rng() * 100;
  let acc = 0;
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i];
    if (roll < acc) return i + 1;
  }
  return 3;
}

/** The animal of a given type at a given Tier (each type has tiers 1/2/3). */
export function selectAnimal(code: string, tier: number, pool: Animal[] = ANIMALS): Animal {
  const animal = pool.find((a) => a.type === code && a.tier === tier);
  if (!animal) throw new Error(`No animal for type ${code} tier ${tier}`);
  return animal;
}

/**
 * Run the full diagnosis from 4 slider answers aligned to `questions`
 * (one per axis, EI/NS/TF/JP order). Randomness (center tie-break + Tier draw)
 * is injectable via `rng`.
 */
export function diagnose(
  answers: SliderValue[],
  questions: Question[],
  rng: Rng = Math.random,
): DiagnosisResult {
  const perAxis: AxisOutcome[] = questions.map((question, i) => {
    const value = answers[i];
    const { left, right, tierVal } = scoreSlider(value);
    const yesLetter = letterOf(question.yesPole, question.axis);
    const noLetter = letterOf(question.leftPole, question.axis);
    let letter: string;
    if (right > left) letter = yesLetter;
    else if (left > right) letter = noLetter;
    else letter = rng() < 0.5 ? noLetter : yesLetter; // center tie: random 50/50
    return { axis: question.axis, question, value, letter, tierVal };
  });

  // Build code in canonical EI/NS/TF/JP order.
  const code = AXES.map(
    (axis) => perAxis.find((o) => o.axis === axis)?.letter ?? "",
  ).join("");

  const type = PERSONALITY_TYPES.find((t) => t.code === code);
  if (!type) throw new Error(`No personality type for code ${code}`);

  const tierTotal = perAxis.reduce((sum, o) => sum + o.tierVal, 0);
  const tier = drawTier(tierTotal, rng);
  const animal = selectAnimal(code, tier);

  return { code, type, animal, tier, tierTotal, perAxis };
}
