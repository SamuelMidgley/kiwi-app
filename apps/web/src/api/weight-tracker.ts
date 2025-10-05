import type { WeightEntry } from "@/types/weight-tracker";
import api from "./api";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const getWeightEntries = () => {
  return api.get<WeightEntry[]>("/weight-entries");
};

const getWeightEntriesKey = ["weights"];

export const getWeightsOptions = queryOptions({
  queryKey: getWeightEntriesKey,
  queryFn: () => getWeightEntries(),
});

const deleteWeightEntry = (id: number) => {
  return api.delete(`/weight-entries/${id}`);
};

const deleteWeightEntryKey = ["delete-weight"];

export const deleteWeightEntryOptions = mutationOptions({
  mutationKey: deleteWeightEntryKey,
  mutationFn: (id: number) => deleteWeightEntry(id),
  onSuccess(_data, _variables, _onMutateResult, context) {
    context.client.invalidateQueries({
      queryKey: getWeightEntriesKey,
    });
  },
});

type CreateWeightEntryRequest = {
  weight: number;
  dateRecorded: string;
};

const createWeightEntry = (request: CreateWeightEntryRequest) => {
  return api.post("/weight-entries", request);
};

const createWeightEntryKey = ["create-weight"];

export const createWeightEntryOptions = mutationOptions({
  mutationKey: createWeightEntryKey,
  mutationFn: (request: CreateWeightEntryRequest) => createWeightEntry(request),
  onSuccess(_data, _variables, _onMutateResult, context) {
    context.client.invalidateQueries({
      queryKey: getWeightEntriesKey,
    });
  },
});
