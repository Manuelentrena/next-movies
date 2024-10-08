"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOVIE_BY_DEFAULT } from "@/config/initial";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { Search, SearchSchema } from "@/core/movies/domain/Search";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";

export const SearchFormSchema = SearchSchema.extend({
  page: z.number().positive().optional(),
}).refine((data) => data.type === TypesMovie.FAVS || data.title.length > 3, {
  path: ["title"],
  message: "3 characters unless type is FAVS.",
});

interface SearchProps {
  getMovies: (values: Search) => void;
  getFavs: (values: Omit<Search, "page">) => void;
  setStopObserver: (value: boolean) => void;
}

export function SearchForm({ getMovies, getFavs, setStopObserver }: SearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const title = (searchParams as URLSearchParams | null)?.get("title") ?? MOVIE_BY_DEFAULT;
  const type = ((searchParams as URLSearchParams | null)?.get("type") as TypesMovie) ?? TypesMovie.ALL;

  const form = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: { title: title, type: type },
  });

  const onSubmit = ({ title, type }: z.infer<typeof SearchFormSchema>) => {
    if (type === TypesMovie.FAVS) {
      getFavs({ title: title, type: type });
    } else {
      getMovies({ title: title, type: type, page: 1 });
    }
    setStopObserver(false);
    router.push(`?title=${title}&type=${type}`);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-6 items-center justify-center bg-slate-500 p-2 md:flex md:space-x-4 md:p-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    placeholder="title"
                    role="search"
                    {...field}
                    className="mb-2 border-4 border-primary bg-white text-lg shadow-none md:mb-0"
                  />
                </FormControl>
                <FormMessage aria-label="error-search-title" className="md: top-8 text-lg md:absolute md:h-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="mb-2 w-full border-4 border-primary bg-white text-lg md:mb-0 md:w-[180px]">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Types</SelectLabel>
                        {Object.values(TypesMovie).map((type) => (
                          <SelectItem key={type} value={type} aria-label="option">
                            {type.toLocaleUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage data-testid="message-error-select" className="text-lg md:h-1" aria-label="error-search" />
              </FormItem>
            )}
          />
          <Button type="submit" size="icon" className="w-full md:mb-0 md:h-10 md:w-10">
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Buscar películas</span>
          </Button>
        </form>
      </Form>
    </>
  );
}
