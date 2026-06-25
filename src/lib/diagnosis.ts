import {
  ANIMALS,
  PERSONALITY_TYPES,
  QUESTIONS,
  type Animal,
  type AxisKey,
  type PersonalityType,
  type Question,
} from "@/data/gameData";

/** A single answer to a diagnosis question: true = Yes, false = No. */
export type Answer = boolean;

/** The two MBTI letters that sit at each end of every axis. */
const AXIS_LETTERS: Record<AxisKey, [string, string]> = {
  EI: ["E", "I"],
  NS: ["N", "S"],
  TF: ["T", "F"],
  JP: ["J", "P"],
};

/**
 * Extract the single MBTI letter contained in a pole label.
 * Pole labels look like "外向(E)", "内向(I)", "現実(S)" — we read the letter in parens.
 */
function letterOf(pole: string, axis: AxisKey): string {
  const [a, b] = AXIS_LETTERS[axis];
  if (pole.includes(`(${a})`)) return a;
  if (pole.includes(`(${b})`)) return b;
  // Fallback: a bare letter somewhere in the label.
  if (pole.includes(a)) return a;
  return b;
}

export interface AxisTally {
  axis: AxisKey;
  /** Net score: positive favors the first letter (E/N/T/J), negative the second (I/S/F/P). */
  score: number;
  /** Total questions answered on this axis (for margin/confidence). */
  count: number;
  letter: string;
}

export interface DiagnosisResult {
  code: string;
  type: PersonalityType;
  animal: Animal;
  tallies: AxisTally[];
  /** Sum of absolute axis margins — how decisive the answers were overall. */
  conviction: number;
}

/**
 * Tally answers per axis. Each Yes adds the question's yesPole letter,
 * each No adds the leftPole letter. We accumulate toward the first letter
 * of the axis as +1 and the second as -1.
 */
export function tallyAxes(
  answers: Answer[],
  questions: Question[] = QUESTIONS,
): AxisTally[] {
  const acc: Record<AxisKey, { score: number; count: number }> = {
    EI: { score: 0, count: 0 },
    NS: { score: 0, count: 0 },
    TF: { score: 0, count: 0 },
    JP: { score: 0, count: 0 },
  };

  questions.forEach((q, i) => {
    const answer = answers[i];
    if (answer === undefined) return;
    const pole = answer ? q.yesPole : q.leftPole;
    const letter = letterOf(pole, q.axis);
    const [first] = AXIS_LETTERS[q.axis];
    acc[q.axis].score += letter === first ? 1 : -1;
    acc[q.axis].count += 1;
  });

  return (Object.keys(acc) as AxisKey[]).map((axis) => {
    const { score, count } = acc[axis];
    const [first, second] = AXIS_LETTERS[axis];
    // Ties default to the second letter (I/S/F/P), the more reserved pole.
    const letter = score > 0 ? first : second;
    return { axis, score, count, letter };
  });
}

/** Build the 4-letter MBTI code from per-axis tallies, in EI-NS-TF-JP order. */
export function codeFromTallies(tallies: AxisTally[]): string {
  const order: AxisKey[] = ["EI", "NS", "TF", "JP"];
  return order
    .map((axis) => tallies.find((t) => t.axis === axis)?.letter ?? "")
    .join("");
}

/**
 * Pick one of the (up to 3) animals for a type by tier.
 *
 * NOTE: the data does not define how tier is chosen from a diagnosis. We use
 * "conviction": more decisive answers (larger summed axis margins) yield a
 * higher tier. This is an intentional, easily-swappable assumption — see plan.
 */
export function selectAnimal(code: string, conviction: number, pool: Animal[] = ANIMALS): Animal {
  const candidates = pool
    .filter((a) => a.type === code)
    .sort((a, b) => a.tier - b.tier);
  if (candidates.length === 0) {
    throw new Error(`No animal defined for type ${code}`);
  }
  // Map conviction (0..max) onto tier 1..N. Max conviction = 4 axes * 6 questions = 24.
  const maxConviction = 24;
  const ratio = Math.min(conviction, maxConviction) / maxConviction;
  const index = Math.min(
    candidates.length - 1,
    Math.floor(ratio * candidates.length),
  );
  return candidates[index];
}

/** Run the full diagnosis: answers -> MBTI type -> assigned animal. */
export function diagnose(
  answers: Answer[],
  questions: Question[] = QUESTIONS,
): DiagnosisResult {
  const tallies = tallyAxes(answers, questions);
  const code = codeFromTallies(tallies);
  const type = PERSONALITY_TYPES.find((t) => t.code === code);
  if (!type) {
    throw new Error(`No personality type defined for code ${code}`);
  }
  const conviction = tallies.reduce((sum, t) => sum + Math.abs(t.score), 0);
  const animal = selectAnimal(code, conviction);
  return { code, type, animal, tallies, conviction };
}
