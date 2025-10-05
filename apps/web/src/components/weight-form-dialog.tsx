import { addHours } from "date-fns";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DatePicker } from "./ui/date-picker";
import { useMutation } from "@tanstack/react-query";
import { createWeightEntryOptions } from "@/api/weight-tracker";

const formSchema = z.object({
  dateRecorded: z.date().max(addHours(new Date(), 2), {
    message: "The date recorded must be either today or in the past",
  }),
  weight: z
    .number({ message: "Not a number" })
    .min(0, { message: "Weight cannot be less than 0" })
    .max(1000, { message: "Congrats on a world record" }),
});

export const WeightFormDialog = () => {
  const createWeightEntryMutation = useMutation(createWeightEntryOptions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRecorded: new Date(),
      weight: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    createWeightEntryMutation.mutate({
      weight: values.weight,
      dateRecorded: values.dateRecorded.toUTCString(),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-1">Add weight</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log(errors);
            })}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Add weight entry</DialogTitle>
              <DialogDescription>
                This is where you add the weight entry
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="dateRecorded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date recorded</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={() => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      {...form.register("weight", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button type="submit">Save</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
