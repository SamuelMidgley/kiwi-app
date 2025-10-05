import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getWeightsOptions } from "@/api/weight-tracker";
import { WeightTracker } from "@/pages/weight-tracker";

export const Route = createFileRoute("/_authenticated/weight-tracker")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getWeightsOptions);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const weightsQuery = useSuspenseQuery(getWeightsOptions);
  const weights = weightsQuery.data;

  return <WeightTracker weightEntries={weights.data} />;
}
