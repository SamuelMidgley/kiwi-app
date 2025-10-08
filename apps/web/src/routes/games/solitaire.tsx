import { createFileRoute } from "@tanstack/react-router";

import { Solitare } from "@/pages/games/solitaire";

export const Route = createFileRoute("/games/solitaire")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Solitare />;
}
