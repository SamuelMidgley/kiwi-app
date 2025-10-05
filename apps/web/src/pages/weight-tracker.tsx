import { Typography } from "@/components/ui/typography";
import { WeightChart } from "@/components/weight-chart";
import { WeightEntryEmpty } from "@/components/weight-entry-empty";
import { WeightFormDialog } from "@/components/weight-form-dialog";
import WeightTable from "@/components/weight-table/weight-table";
import type { WeightEntry } from "@/types/weight-tracker";

type WeightTrackerProps = {
  weightEntries: WeightEntry[];
};

export const WeightTracker = ({ weightEntries }: WeightTrackerProps) => {
  return (
    <div>
      <div className="flex justify-between">
        <Typography as="h1" className="mb-10">
          Weight tracker
        </Typography>
        <WeightFormDialog />
      </div>
      {weightEntries.length === 0 ? (
        <WeightEntryEmpty />
      ) : (
        <div className="space-y-8">
          <WeightChart weightEntries={weightEntries} />
          <WeightTable weightEntries={weightEntries} />
        </div>
      )}
    </div>
  );
};
