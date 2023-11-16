"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { numberRegExp } from "@/lib/constant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  title: z.string().nullable(),
  surface: z
    .string()
    .nullable()
    .refine((val) => {
      if (val === null || val === undefined || val.trim() === "") {
        return true;
      }

      return numberRegExp.test(val);
    }),
  rooms: z
    .string()
    .nullable()
    .refine((val) => {
      if (val === null || val === undefined || val.trim() === "") {
        return true;
      }

      return numberRegExp.test(val);
    }),
  price: z
    .string()
    .nullable()
    .refine((val) => {
      if (val === null || val === undefined || val.trim() === "") {
        return true;
      }

      return numberRegExp.test(val);
    }),
});

export const FilterForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: searchParams.get("title") || "",
      surface: searchParams.get("surface") || "",
      rooms: searchParams.get("rooms") || "",
      price: searchParams.get("price") || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (values.surface) {
      params.set("surface", values.surface);
    } else {
      params.delete("surface");
    }

    if (values.rooms) {
      params.set("rooms", values.rooms);
    } else {
      params.delete("rooms");
    }

    if (values.price) {
      params.set("price", values.price);
    } else {
      params.delete("price");
    }

    if (values.title) {
      params.set("title", values.title);
    } else {
      params.delete("title");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="p-5 text-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="surface"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Surface minimum" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nombre de pièce minimum" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Budget max" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Mot clefs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/5">
              <Button className="w-full" type="submit">
                Rechercher
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
