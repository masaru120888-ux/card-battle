import { describe, it, expect } from "vitest";
import { QUESTIONS, PERSONALITY_TYPES, ANIMALS } from "@/data/gameData";
import {
  diagnose,
  tallyAxes,
  codeFromTallies,
  type Answer,
} from "@/lib/diagnosis";

/** Build an answer vector (canonical QUESTIONS order) where every question is
 *  answered so that the given target letter wins its axis. */
function answersForCode(target: string): Answer[] {
  const want: Record<string, string> = {
    EI: target[0],
    NS: target[1],
    TF: target[2],
    JP: target[3],
  };
  return QUESTIONS.map((q) => {
    const desired = want[q.axis];
    // Answer Yes if the yesPole carries the desired letter, else No.
    return q.yesPole.includes(`(${desired})`);
  });
}

describe("data integrity", () => {
  it("has 16 types, 48 animals, 24 questions", () => {
    expect(PERSONALITY_TYPES).toHaveLength(16);
    expect(ANIMALS).toHaveLength(48);
    expect(QUESTIONS).toHaveLength(24);
  });

  it("has exactly 3 animals per type", () => {
    for (const t of PERSONALITY_TYPES) {
      expect(ANIMALS.filter((a) => a.type === t.code)).toHaveLength(3);
    }
  });
});

describe("diagnosis engine", () => {
  it("derives every MBTI code from a matching answer vector", () => {
    for (const t of PERSONALITY_TYPES) {
      const code = codeFromTallies(tallyAxes(answersForCode(t.code)));
      expect(code).toBe(t.code);
    }
  });

  it("assigns an animal of the diagnosed type", () => {
    const result = diagnose(answersForCode("ESFP"));
    expect(result.code).toBe("ESFP");
    expect(result.type.name).toBe("華燭");
    expect(result.animal.type).toBe("ESFP");
  });

  it("picks tier 3 when answers are fully decisive (max conviction)", () => {
    const result = diagnose(answersForCode("INTJ"));
    // All 24 answers decisive -> conviction 24 -> highest tier.
    expect(result.conviction).toBe(24);
    expect(result.animal.tier).toBe(3);
  });

  it("breaks ties toward the reserved pole (I/S/F/P)", () => {
    // No answers at all -> every axis score 0 -> ISFP.
    const empty: Answer[] = QUESTIONS.map(() => undefined as unknown as Answer);
    const code = codeFromTallies(tallyAxes(empty));
    expect(code).toBe("ISFP");
  });
});
