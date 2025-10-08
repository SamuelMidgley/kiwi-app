import { describe, expect, test } from "vitest";

import type { Suit } from "@/types/games";

import { getCardColor } from "./card";

describe("getCardColor", () => {
  test.each([
    { suit: "hearts", color: "red" },
    { suit: "diamonds", color: "red" },
    { suit: "clubs", color: "black" },
    { suit: "spades", color: "black" },
  ])("getCardColor($suit) -> $color", ({ suit, color }) => {
    expect(getCardColor(suit as Suit)).toBe(color);
  });
});
