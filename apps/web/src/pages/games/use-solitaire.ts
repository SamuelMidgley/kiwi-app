import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

import {
  canCardGoOnColumn,
  canCardGoOnDiscardPile,
  createSolitareGame,
} from "@/lib/card";
import type {
  Column,
  DragLocation,
  DropLocation,
  Suit,
  TCard,
} from "@/types/games";

export const useSolitaire = () => {
  const [{ solitaireColumns, remainingCards, discardPiles }, setSolitaire] =
    useState(() => createSolitareGame());

  const flipCardFromRemainingDeck = () => {
    setSolitaire((prev) => {
      const flippedCards = prev.remainingCards.filter((c) => c.isFlipped);
      const unFlippedCards = prev.remainingCards.filter((c) => !c.isFlipped);

      console.log(flippedCards);
      console.log(unFlippedCards);

      if (unFlippedCards.length === 0) {
        return {
          ...prev,
          remainingCards: flippedCards.map((c, i) => ({
            ...c,
            isFlipped: i === flippedCards.length - 1,
          })),
        };
      } else {
        unFlippedCards[0] = {
          ...unFlippedCards[0],
          isFlipped: true,
        };

        return {
          ...prev,
          remainingCards: [...flippedCards, ...unFlippedCards],
        };
      }
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (!over || !active.data.current) {
      return;
    }

    const droppedCardId = active.id as TCard;
    const droppedCardSuit = droppedCardId.split("-")[0];

    const droppedZoneId = over.id as DropLocation;
    const isDiscardPile = droppedZoneId.split("-")[0] === "pile";

    if (isDiscardPile) {
      const discardPileSuit = droppedZoneId.split("-")[1] as Suit;

      const isValueValid = canCardGoOnDiscardPile(
        droppedCardId,
        discardPiles[discardPileSuit]
      );

      if (isValueValid && discardPileSuit === droppedCardSuit) {
        const isFromDeck = active.data.current.location === "deck";

        if (isFromDeck) {
          setSolitaire((prev) => {
            return {
              ...prev,
              discardPiles: {
                ...prev.discardPiles,
                [discardPileSuit]: prev.discardPiles[discardPileSuit].concat({
                  isFlipped: true,
                  card: droppedCardId,
                }),
              },
              remainingCards: remainingCards.filter(
                (c) => c.card !== droppedCardId
              ),
            };
          });
        } else {
          const columnLocation = active.data.current.location as Column;

          setSolitaire((prev) => {
            return {
              ...prev,
              discardPiles: {
                ...prev.discardPiles,
                [discardPileSuit]: prev.discardPiles[discardPileSuit].concat({
                  isFlipped: true,
                  card: droppedCardId,
                }),
              },
              solitaireColumns: {
                ...solitaireColumns,
                [columnLocation]: prev.solitaireColumns[columnLocation]
                  .filter((c) => c.card !== droppedCardId)
                  .map((c, i) => {
                    if (
                      i ===
                      prev.solitaireColumns[columnLocation].length - 2
                    ) {
                      return {
                        card: c.card,
                        isFlipped: false,
                      };
                    }

                    return {
                      ...c,
                    };
                  }),
              },
            };
          });
        }
      }
    } else {
      const columnLocation = droppedZoneId as Column;
      const existingLocation = active.data.current.location as DragLocation;

      const canDrop = canCardGoOnColumn(
        droppedCardId,
        solitaireColumns[columnLocation]
      );

      if (!canDrop) {
        return;
      }

      setSolitaire((prev) => {
        return {
          ...prev,
          solitaireColumns: {
            ...prev.solitaireColumns,
            [columnLocation]: prev.solitaireColumns[columnLocation].concat({
              card: droppedCardId,
              isFlipped: false,
            }),
          },
        };
      });

      if (existingLocation === "deck") {
        setSolitaire((prev) => ({
          ...prev,
          remainingCards: prev.remainingCards.filter(
            (c) => c.card !== droppedCardId
          ),
        }));
      } else if (existingLocation.split("-")[0] === "piles") {
        const suit = existingLocation.split("-")[1] as Suit;
        setSolitaire((prev) => ({
          ...prev,
          discardPiles: {
            ...prev.discardPiles,
            [suit]: prev.discardPiles[suit].filter(
              (c) => c.card !== droppedCardId
            ),
          },
        }));
      } else {
        setSolitaire((prev) => ({
          ...prev,
          solitaireColumns: {
            ...prev.solitaireColumns,
            [existingLocation]: prev.solitaireColumns[
              existingLocation as Column
            ]
              .filter((c) => c.card !== droppedCardId)
              .map((c, i) => {
                if (i === prev.solitaireColumns[columnLocation].length - 2) {
                  return {
                    card: c.card,
                    isFlipped: false,
                  };
                }

                return {
                  ...c,
                };
              }),
          },
        }));
      }
    }
  };

  return {
    solitaireColumns,
    remainingCards,
    discardPiles,
    flipCardFromRemainingDeck,
    handleDragEnd,
  };
};
