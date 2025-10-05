import { WeightIcon } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "./ui/empty";
import { WeightFormDialog } from "./weight-form-dialog";

export const WeightEntryEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WeightIcon />
        </EmptyMedia>
        <EmptyTitle>No weights have been entered yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t entered any weights yet. Get started by adding your
          first weight entry.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <WeightFormDialog />
      </EmptyContent>
    </Empty>
  );
};
