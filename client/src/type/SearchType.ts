import * as yup from "yup";

export const SearchSchema = yup.object({
  searchValue: yup.string(),
});

export type SearchModel = yup.InferType<typeof SearchSchema>;
