export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export type SuitColor = "red" | "black";

export type CardValue = number | "J" | "Q" | "K" | "A";

export type TCard = `${Suit}-${CardValue}`;

export type CardState = {
  card: TCard;
  isFlipped: boolean;
};

export type Column =
  | "column-1"
  | "column-2"
  | "column-3"
  | "column-4"
  | "column-5"
  | "column-6";

export type DropLocation = Column | `piles-${Suit}`;

export type DragLocation = DropLocation | "deck";
