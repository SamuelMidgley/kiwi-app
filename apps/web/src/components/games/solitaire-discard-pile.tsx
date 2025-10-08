import type { CardState } from "@/types/games";

import { DroppablePile } from "./droppable-pile";

type SolitaireDiscardPile = {
  piles: {
    hearts: CardState[];
    diamonds: CardState[];
    spades: CardState[];
    clubs: CardState[];
  };
};

export const SolitaireDiscardPile = ({ piles }: SolitaireDiscardPile) => {
  return (
    <div className="flex gap-4 mr-4">
      <DroppablePile pile={piles["hearts"]} suit="hearts" />
      <DroppablePile pile={piles["spades"]} suit="spades" />
      <DroppablePile pile={piles["diamonds"]} suit="diamonds" />
      <DroppablePile pile={piles["clubs"]} suit="clubs" />
      <div className="w-[75px] h-[100px] flex items-center justify-center bg-transparent" />
    </div>
  );
};
