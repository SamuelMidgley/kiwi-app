import { useDroppable } from "@dnd-kit/core";

import type { CardState } from "@/types/games";

import { DraggablePlayingCard } from "./draggable-playing-card";
import { SolitaireColumnStack } from "./solitaire-column-stack";

type SolitaireColumnProps = {
  id: string;
  cards: CardState[];
};

export const SolitaireColumn = ({ id, cards }: SolitaireColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const flippedCards = cards.filter((c) => c.isFlipped);
  const unFlippedCards = cards.filter((c) => !c.isFlipped);

  return (
    <div
      className={`space-y-4 rounded-xl min-w-[75px] ${
        isOver ? "outline-1 outline-destructive outline-offset-6 " : ""
      }`}
      ref={setNodeRef}
    >
      <SolitaireColumnStack count={flippedCards.length} />
      {unFlippedCards.map((card) => (
        <DraggablePlayingCard
          id={card.card}
          key={card.card}
          card={card}
          location={id}
        />
      ))}
    </div>
  );
};
