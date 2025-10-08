import type {
  CardState,
  CardValue,
  Suit,
  SuitColor,
  TCard,
} from "@/types/games";

const Suity = {
  Hearts: "hearts",
  Diamonds: "diamonds",
  Clubs: "clubs",
  Spades: "spades",
} as const;

const suits: Suit[] = [Suity.Hearts, Suity.Diamonds, Suity.Clubs, Suity.Spades];

const convertOrderToValue = (order: number): CardValue => {
  switch (order) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return order;
  }
};

const convertValueToOrder = (value: CardValue) => {
  switch (value) {
    case "A":
      return 1;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return Number(value);
  }
};

export const getCardColor = (suit: Suit): SuitColor => {
  if (suit === "diamonds" || suit === "hearts") {
    return "red";
  }

  return "black";
};

export const getCardInfo = (card: TCard) => {
  const [suit, value] = card.split("-") as [Suit, CardValue];

  return {
    suit,
    value,
    suitColor: getCardColor(suit),
  };
};

const isCardValueOneMore = (value1: CardValue, value2: CardValue) => {
  const order1 = convertValueToOrder(value1);
  const order2 = convertValueToOrder(value2);

  console.log(order1);
  console.log(order2);

  return order1 - 1 === order2;
};

export const canCardGoOnDiscardPile = (card: TCard, pile: CardState[]) => {
  const { value } = getCardInfo(card);

  if (pile.length === 0) {
    return value === "A";
  }

  const lastCardOnPile = pile[pile.length - 1];

  const { value: lastCardValue } = getCardInfo(lastCardOnPile.card);

  return isCardValueOneMore(value, lastCardValue);
};

export const canCardGoOnColumn = (card: TCard, column: CardState[]) => {
  const { value, suitColor } = getCardInfo(card);

  if (column.length === 0) {
    return value === "K";
  }

  const lastCard = column[column.length - 1];
  const { value: lastCardValue, suitColor: lastCardSuitColor } = getCardInfo(
    lastCard.card
  );

  return (
    suitColor !== lastCardSuitColor && isCardValueOneMore(lastCardValue, value)
  );
};

export const createDeck = () => {
  const deckOfCards: CardState[] = [];

  suits.forEach((suit) => {
    for (let i = 1; i < 14; i++) {
      const cardValue = convertOrderToValue(i);

      deckOfCards.push({
        card: `${suit}-${cardValue}`,
        isFlipped: false,
      });
    }
  });

  return deckOfCards
    .map((value) => ({
      value,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const flipLastCardInDeck = (deck: CardState[]): CardState[] => {
  return deck.map((card, index) => ({
    ...card,
    isFlipped: index !== deck.length - 1,
  }));
};

export const createSolitareGame = () => {
  const deck = createDeck();

  const solitaireColumns = {
    "column-1": flipLastCardInDeck(deck.slice(0, 1)),
    "column-2": flipLastCardInDeck(deck.slice(1, 3)),
    "column-3": flipLastCardInDeck(deck.slice(3, 6)),
    "column-4": flipLastCardInDeck(deck.slice(6, 10)),
    "column-5": flipLastCardInDeck(deck.slice(10, 15)),
    "column-6": flipLastCardInDeck(deck.slice(15, 21)),
    "column-7": flipLastCardInDeck(deck.slice(21, 28)),
  };

  const remainingCards = deck.slice(26, -1);

  return {
    solitaireColumns,
    remainingCards,
    discardPiles: {
      [Suity.Hearts]: [] as CardState[],
      [Suity.Spades]: [] as CardState[],
      [Suity.Diamonds]: [] as CardState[],
      [Suity.Clubs]: [] as CardState[],
    },
  };
};
