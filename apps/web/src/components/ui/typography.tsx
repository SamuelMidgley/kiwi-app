import { cn } from "@/lib/utils";

type TypographyProps = {
  as: "h1";
  className?: string;
} & React.PropsWithChildren;

function Typography({ as, className, children }: TypographyProps) {
  switch (as) {
    case "h1":
      return (
        <h1
          className={cn(
            "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
            className
          )}
        >
          {children}
        </h1>
      );

    default:
      return null;
  }
}

export { Typography };
