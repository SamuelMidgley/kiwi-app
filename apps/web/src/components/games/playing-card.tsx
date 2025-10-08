import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCardInfo } from "@/lib/card";
import type { CardState } from "@/types/games";

import { SuitIcon } from "./suit-icon";

type PlayingCardProps = {
  card: CardState;
  showBorder?: boolean;
};

export const PlayingCard = ({ card, showBorder = false }: PlayingCardProps) => {
  const { suit, suitColor, value } = getCardInfo(card.card);

  return (
    <Card
      className={`w-[75px] h-[100px] py-4 gap-4 ${
        suitColor === "red" && showBorder ? "border-destructive" : ""
      }`}
    >
      <CardHeader className="flex items-center">
        <SuitIcon suit={suit} />
      </CardHeader>
      <CardContent className="text-center text-2xl font-semibold">
        {value}
      </CardContent>
    </Card>
  );
};
