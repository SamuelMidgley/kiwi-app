import { DndContext } from "@dnd-kit/core";

import { SolitaireColumn } from "@/components/games/solitaire-column";
import { SolitaireDeck } from "@/components/games/solitaire-deck";
import { SolitaireDiscardPile } from "@/components/games/solitaire-discard-pile";
import { Typography } from "@/components/ui/typography";

import { useSolitaire } from "./use-solitaire";

export const Solitare = () => {
  const {
    remainingCards,
    solitaireColumns,
    discardPiles,
    flipCardFromRemainingDeck,
    handleDragEnd,
  } = useSolitaire();

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Typography as="h1" className="mb-10">
        Solitaire
      </Typography>

      <div className="flex  mb-5">
        <SolitaireDiscardPile piles={discardPiles} />
        <SolitaireDeck
          remainingCards={remainingCards}
          flipCardFromRemainingDeck={flipCardFromRemainingDeck}
        />
      </div>

      <div className="flex gap-4">
        <SolitaireColumn id="column-1" cards={solitaireColumns["column-1"]} />
        <SolitaireColumn id="column-2" cards={solitaireColumns["column-2"]} />
        <SolitaireColumn id="column-3" cards={solitaireColumns["column-3"]} />
        <SolitaireColumn id="column-4" cards={solitaireColumns["column-4"]} />
        <SolitaireColumn id="column-5" cards={solitaireColumns["column-5"]} />
        <SolitaireColumn id="column-6" cards={solitaireColumns["column-6"]} />
        <SolitaireColumn id="column-7" cards={solitaireColumns["column-7"]} />
      </div>
    </DndContext>
  );
};
