import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SolitaireColumnStackProps = {
  count: number;
};

export const SolitaireColumnStack = ({ count }: SolitaireColumnStackProps) => {
  if (count === 0) {
    return null;
  }

  const getStackHeight = () => {
    switch (count) {
      case 1:
        return "h-[50px]";
      case 2:
        return "h-[75px]";
      case 3:
        return "h-[100px]";
      case 4:
        return "h-[125px]";
      case 5:
        return "h-[150px]";
      case 6:
        return "h-[175px]";
      case 7:
        return "h-[200px]";
    }
  };

  return (
    <Card
      className={cn(
        "font-semibold text-2xl text-center py-0 flex justify-center items-center",
        getStackHeight()
      )}
    >
      {count}
    </Card>
  );
};
