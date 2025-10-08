import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CardState } from "@/types/games";

import { DraggablePlayingCard } from "./draggable-playing-card";

type SolitaireDeckProps = {
  remainingCards: CardState[];
  flipCardFromRemainingDeck: () => void;
};

export const SolitaireDeck = ({
  remainingCards,
  flipCardFromRemainingDeck,
}: SolitaireDeckProps) => {
  const flippedCards = remainingCards.filter((c) => c.isFlipped);
  const unFlippedCards = remainingCards.filter((c) => !c.isFlipped);

  const topFlippedCard = flippedCards[flippedCards.length - 1];

  return (
    <div className="flex gap-4">
      <Button
        onClick={() => flipCardFromRemainingDeck()}
        variant="outline"
        className="w-[75px] h-[100px] text-2xl font-semibold rounded-xl"
      >
        {unFlippedCards.length}
      </Button>
      {topFlippedCard ? (
        <DraggablePlayingCard
          id={topFlippedCard.card}
          card={topFlippedCard}
          location={"deck"}
        />
      ) : (
        <Card className="w-[75px] h-[100px] bg-transparent" />
      )}
    </div>
  );
};
