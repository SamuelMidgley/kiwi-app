import { Club, Diamond, Heart, Spade } from "lucide-react";

import type { Suit } from "@/types/games";

type SuitIconProps = {
  suit: Suit;
};

export const SuitIcon = ({ suit }: SuitIconProps) => {
  switch (suit) {
    case "hearts":
      return <Heart className="text-destructive" />;

    case "clubs":
      return <Club />;

    case "diamonds":
      return <Diamond className="text-destructive" />;

    case "spades":
      return <Spade />;
  }
};
