// Deferred battle seam — TYPES ONLY, no logic.
//
// The battle system (Slay-the-Spire-like deck builder) is intentionally NOT
// implemented yet. The mockup (IMG_5100) shows several mechanics whose rules
// are not defined in any provided data and must NOT be invented here:
//
//   - LIBERATION gauge (player) / RAGE gauge (enemy)
//   - enemy roster & stats, enemy attack telegraph (攻撃予告 / intent)
//   - the basic/common card pool (only each animal's *signature* card is defined)
//   - energy configuration, level (Lv) system, stage definitions
//   - keyword mechanics (ブロック / よろめき / 鼓舞 / 毒 / 粘着)
//
// These types describe ONLY what the diagnosis layer already establishes, so a
// future battle implementation can drop in without reshaping the app. Extend
// this file when the battle data is provided.

import type { Animal } from "@/data/gameData";

/** A signature card as defined per-animal in gameData (the only cards defined so far). */
export interface SignatureCard {
  name: string;
  cost: number;
  effect: string;
}

/** A combatant the player controls, derived from their diagnosed animal. */
export interface PlayerCombatant {
  animal: Animal;
  hp: number;
  maxHp: number;
  signature: SignatureCard;
}

/** Build the player's starting combat state from a diagnosed animal. */
export function combatantFromAnimal(animal: Animal): PlayerCombatant {
  return {
    animal,
    hp: animal.hp,
    maxHp: animal.hp,
    signature: { name: animal.card, cost: animal.cost, effect: animal.cardEffect },
  };
}
