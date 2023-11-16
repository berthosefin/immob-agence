"use client";

import { createOption, editOption } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Option } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(3),
});

export const OptionForm = ({ optionData }: { optionData: Option | null }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [option, setOption] = useState<Option | null>(null);

  const buttonLabel = optionData ? "Editer" : "Créer";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: option?.name || "",
    },
  });

  useEffect(() => {
    const populate = async () => {
      setOption(optionData);

      form.reset({
        name: optionData?.name || "",
      });
    };

    populate();
  }, [optionData, form]);

  const performOptionAction = async (
    action: "create" | "edit",
    optionId: string | undefined,
    values: z.infer<typeof formSchema>
  ) => {
    try {
      let result;

      if (action === "create") {
        result = await createOption(values);
      } else if (action === "edit" && optionId) {
        result = await editOption(optionId, values);
      }

      const successMessage =
        action === "edit"
          ? `Option mise à jour avec succès: ${result?.name}`
          : `Nouvelle option créée avec succès: ${result?.name}`;

      router.push(`/admin/option`);
      toast({
        title: `Succès`,
        description: successMessage,
      });
    } catch (error) {
      const errorMessage =
        action === "edit"
          ? `Erreur lors de la mise à jour de l'option: ${error}`
          : `Erreur lors de la création de l'option: ${error}`;

      toast({
        title: `Erreur`,
        description: errorMessage,
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const action = optionData ? "edit" : "create";
    performOptionAction(action, optionData?.id, values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{buttonLabel}</Button>
      </form>
    </Form>
  );
};
