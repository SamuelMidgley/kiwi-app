import type { WeightEntry } from "@/types/weight-tracker";
import { DataTable } from "./data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { deleteWeightEntryOptions } from "@/api/weight-tracker";

type WeightTableProps = {
  weightEntries: WeightEntry[];
};

function WeightTable({ weightEntries }: WeightTableProps) {
  const deleteWeightEntryMutation = useMutation(deleteWeightEntryOptions);

  const columns: ColumnDef<WeightEntry>[] = [
    {
      accessorKey: "date_recorded",
      header: "Date recorded",
      cell: ({ row }) => {
        return format(row.getValue("date_recorded"), "dd/MM/yyyy");
      },
    },
    {
      accessorKey: "weight",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Weight (kg)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="pl-4">{row.getValue("weight")}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    const id = row.original.id;

                    deleteWeightEntryMutation.mutate(id);
                  }}
                >
                  Delete weight
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={weightEntries} />;
}

export default WeightTable;
