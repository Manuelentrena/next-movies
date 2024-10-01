"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { GetMovies } from "@/core/movies/domain/contract/MovieRepository";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { zodResolver } from "@hookform/resolvers/zod";
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
  getMovies: (values: GetMovies) => void;
}

export function Search({ getMovies }: SearchProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: MOVIE_SEARCH_BY_DEFAULT,
      type: TypesMovie.ALL,
    },
  });

  const onSubmit = ({ title, type }: z.infer<typeof formSchema>) => {
    getMovies({ title: title, type: type, page: 1 });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
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
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Types</SelectLabel>
                      {Object.values(TypesMovie).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
