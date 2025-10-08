import { getCardColor } from "@/lib/card";
import { cn } from "@/lib/utils";
import type { Suit } from "@/types/games";

import { Card } from "../ui/card";
import { SuitIcon } from "./suit-icon";

type EmptyPileProps = {
  suit: Suit;
};

export const EmptyPile = ({ suit }: EmptyPileProps) => {
  const suitColor = getCardColor(suit);

  return (
    <Card
      className={cn(
        "w-[75px] h-[100px] flex items-center justify-center bg-transparent ",
        suitColor === "red" && "text-destructive"
      )}
    >
      <SuitIcon suit={suit} />
    </Card>
  );
};
