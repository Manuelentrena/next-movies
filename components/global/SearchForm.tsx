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
import { MOVIE_SEARCH_BY_DEFAULT } from "@/config/initial";
import { Search } from "@/core/movies/domain/contract/MovieRepository";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Tile must be at least 3 characters.",
  }),
  type: z.enum([TypesMovie.ALL, TypesMovie.MOVIE, TypesMovie.SERIES], {
    required_error: "One type is required.",
  }),
});

interface SearchProps {
  getMovies: (values: Search) => void;
}

export function SearchForm({ getMovies }: SearchProps) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? MOVIE_SEARCH_BY_DEFAULT;
  const type = (searchParams.get("type") as TypesMovie) ?? TypesMovie.ALL;

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      type: type,
    },
  });

  const onSubmit = ({ title, type }: z.infer<typeof formSchema>) => {
    getMovies({ title: title, type: type, page: 1 });
    router.push(`?title=${title}&type=${type}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-6 items-center justify-center bg-slate-500 p-2 md:flex md:space-x-4 md:p-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="title"
                  {...field}
                  className="mb-2 border-4 border-primary bg-white text-lg shadow-none md:mb-0"
                />
              </FormControl>

              <FormMessage />
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
                        <SelectItem key={type} value={type}>
                          {type.toLocaleUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" className="w-full md:h-10 md:w-10">
          <SearchIcon className="h-4 w-4" />
          <span className="sr-only">Buscar películas</span>
        </Button>
      </form>
    </Form>
  );
}
