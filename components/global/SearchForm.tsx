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
import { GetMovies } from "@/core/movies/domain/contract/MovieRepository";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
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
  title: string;
  type: TypesMovie;
}

export function SearchForm({ getMovies, title, type }: SearchProps) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-slate-500 mb-6 md:flex items-center justify-center md:space-x-4 p-2 md:p-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="title" {...field} className="mb-2 md:mb-0" />
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
                  <SelectTrigger className="md:w-[180px] w-full mb-2 md:mb-0">
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
        <Button type="submit" size="icon" className="w-full md:w-10 md:h-10">
          <Search className="h-4 w-4" />
          <span className="sr-only">Buscar películas</span>
        </Button>
      </form>
    </Form>
  );
}
