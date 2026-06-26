import { describe, it, expect } from "vitest";
import { QUESTIONS, PERSONALITY_TYPES, ANIMALS, type Question } from "@/data/gameData";
import {
  diagnose,
  drawTier,
  pickQuestions,
  scoreSlider,
  selectAnimal,
  type Rng,
  type SliderValue,
} from "@/lib/diagnosis";

/** One question per axis, in EI/NS/TF/JP order (canonical for diagnose()). */
function oneQuestionPerAxis(): Question[] {
  return (["EI", "NS", "TF", "JP"] as const).map(
    (axis) => QUESTIONS.find((q) => q.axis === axis)!,
  );
}

/** Slider values that drive each axis toward a target MBTI code (no ties). */
function valuesForCode(target: string, questions: Question[]): SliderValue[] {
  return questions.map((q, i) => {
    const desired = target[i];
    // If the yesPole (slider value 5 side) carries the desired letter, answer 5; else 1.
    return q.yesPole.includes(`(${desired})`) ? 5 : 1;
  });
}

/** Deterministic RNG that always returns a fixed value. */
const fixedRng = (v: number): Rng => () => v;

describe("data integrity", () => {
  it("has 16 types, 48 animals, 24 questions, 3 animals/type", () => {
    expect(PERSONALITY_TYPES).toHaveLength(16);
    expect(ANIMALS).toHaveLength(48);
    expect(QUESTIONS).toHaveLength(24);
    for (const t of PERSONALITY_TYPES) {
      const tiers = ANIMALS.filter((a) => a.type === t.code).map((a) => a.tier).sort();
      expect(tiers).toEqual([1, 2, 3]);
    }
  });
});

describe("scoreSlider", () => {
  it("matches the README table (left+right=4, tierVal=|v-3|)", () => {
    expect(scoreSlider(1)).toEqual({ left: 4, right: 0, tierVal: 2 });
    expect(scoreSlider(2)).toEqual({ left: 3, right: 1, tierVal: 1 });
    expect(scoreSlider(3)).toEqual({ left: 2, right: 2, tierVal: 0 });
    expect(scoreSlider(4)).toEqual({ left: 1, right: 3, tierVal: 1 });
    expect(scoreSlider(5)).toEqual({ left: 0, right: 4, tierVal: 2 });
  });
});

describe("pickQuestions", () => {
  it("returns exactly one question per axis in EI/NS/TF/JP order", () => {
    const qs = pickQuestions(fixedRng(0));
    expect(qs.map((q) => q.axis)).toEqual(["EI", "NS", "TF", "JP"]);
  });
});

describe("drawTier", () => {
  // low band [60,30,10]
  it("low tierTotal: roll<60 -> T1, <90 -> T2, else T3", () => {
    expect(drawTier(0, fixedRng(0.0))).toBe(1);
    expect(drawTier(2, fixedRng(0.7))).toBe(2);
    expect(drawTier(1, fixedRng(0.95))).toBe(3);
  });
  // mid band [25,50,25]
  it("mid tierTotal: <25 -> T1, <75 -> T2, else T3", () => {
    expect(drawTier(3, fixedRng(0.1))).toBe(1);
    expect(drawTier(5, fixedRng(0.5))).toBe(2);
    expect(drawTier(4, fixedRng(0.8))).toBe(3);
  });
  // high band [10,30,60]
  it("high tierTotal: <10 -> T1, <40 -> T2, else T3", () => {
    expect(drawTier(8, fixedRng(0.05))).toBe(1);
    expect(drawTier(6, fixedRng(0.3))).toBe(2);
    expect(drawTier(7, fixedRng(0.9))).toBe(3);
  });
});

describe("selectAnimal", () => {
  it("returns the type's animal at the given tier", () => {
    const a = selectAnimal("ENTJ", 1);
    expect(a.name).toBe("アリ");
    expect(a.tier).toBe(1);
  });
});

describe("diagnose", () => {
  it("derives every MBTI code from matching slider values", () => {
    const qs = oneQuestionPerAxis();
    for (const t of PERSONALITY_TYPES) {
      const result = diagnose(valuesForCode(t.code, qs), qs, fixedRng(0));
      expect(result.code).toBe(t.code);
      expect(result.animal.type).toBe(t.code);
    }
  });

  it("full extremes -> tierTotal 8 (high band)", () => {
    const qs = oneQuestionPerAxis();
    const result = diagnose([1, 5, 1, 5], qs, fixedRng(0.99));
    expect(result.tierTotal).toBe(8);
    expect(result.tier).toBe(3); // high band, roll 0.99 -> T3
  });

  it("all-center -> tierTotal 0 and tie-break uses rng", () => {
    const qs = oneQuestionPerAxis();
    // rng < 0.5 -> noLetter on every axis. EI/NS/TF/JP noLetters per these questions.
    const result = diagnose([3, 3, 3, 3], qs, fixedRng(0.0));
    expect(result.tierTotal).toBe(0);
    expect(result.code).toHaveLength(4);
    // tier draw: low band, roll 0 -> T1
    expect(result.tier).toBe(1);
  });
});
