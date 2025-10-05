import z from "zod";

export const createValidator = z.object({
  dateRecorded: z.coerce.date("must be a date"),
  weight: z.number().min(0, "cmon really").max(10000, "cmon really"),
});

export const updateValidator = z.object({
  dateRecorded: z.coerce.date("must be a date"),
  weight: z.number().min(0, "cmon really").max(10000, "cmon really"),
});
