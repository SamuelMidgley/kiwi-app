import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import type { CardState } from "@/types/games";

import { PlayingCard } from "./playing-card";

type DraggablePlayingCardProps = {
  id: string;
  card: CardState;
  location: string;
};

export const DraggablePlayingCard = ({
  id,
  card,
  location,
}: DraggablePlayingCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      location,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div id={id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PlayingCard card={card} />
    </div>
  );
};
