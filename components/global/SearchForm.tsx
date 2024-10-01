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
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-10 flex items-center justify-center space-x-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
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

        <Button type="submit" className="flex justify-end">
          Buscar
        </Button>
      </form>
    </Form>
  );
}