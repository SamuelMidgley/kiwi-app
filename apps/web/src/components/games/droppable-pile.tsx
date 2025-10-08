import { useDroppable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import type { CardState, Suit } from "@/types/games";

import { DraggablePlayingCard } from "./draggable-playing-card";
import { EmptyPile } from "./empty-pile";

type DroppablePileProps = {
  pile: CardState[];
  suit: Suit;
};

export const DroppablePile = ({ pile, suit }: DroppablePileProps) => {
  const id = `pile-${suit}`;
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const topCard = pile[pile.length - 1];

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-xl",
        isOver && "outline-1 outline-destructive outline-offset-6"
      )}
    >
      {pile.length === 0 ? (
        <EmptyPile suit={suit} />
      ) : (
        <DraggablePlayingCard
          id={`discard-${suit}`}
          card={topCard}
          location={id}
        />
      )}
    </div>
  );
};
