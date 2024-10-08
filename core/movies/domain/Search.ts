import { z } from "zod";
import { TypesMovie } from "./Movie";

export const SearchSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .trim()
    .min(3, { message: "Title must be 3 characters at least." }),
  type: z.enum([TypesMovie.ALL, TypesMovie.MOVIE, TypesMovie.SERIES, TypesMovie.GAME, TypesMovie.FAVS], {
    required_error: "One type is required.",
  }),
  page: z.number().positive(),
});

export type Search = z.infer<typeof SearchSchema>;

export interface SearchById {
  id: string;
}
