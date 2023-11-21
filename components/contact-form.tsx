"use client";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "./ui/use-toast";
import { sendEmail } from "@/lib/actions";
import { Property } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";

export const formSchema = z.object({
  firstname: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/),
  lastname: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/),
  phone: z
    .string()
    .min(10)
    .max(15)
    .regex(/^\+?\d{1,4}[-.\s]?\d{1,14}$/),
  email: z.string().email(),
  message: z.string().max(1000),
});

export type ContactFormType = z.infer<typeof formSchema>;

const ContactForm = ({ property }: { property: Property }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const result = await sendEmail(values, property);

      setLoading(false);

      if (result && !result.error) {
        toast({
          title: `Succès`,
          description: "Email envoyé avec succès!",
        });

        Object.keys(values).forEach((key) => {
          if (Object.keys(formSchema.shape).includes(key)) {
            form.setValue(key as keyof typeof values, "");
          }
        });
      } else {
        toast({
          title: `Erreur`,
          description: "Une erreur s'est produite lors de l'envoi de l'email.",
        });
      }
    } catch (error) {
      toast({
        title: `Erreur`,
        description: "Une erreur inattendue s'est produite.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="lastname"
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
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Téléphone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Votre message..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={clsx(
            "w-full",
            property.sold ? "pointer-events-none opacity-50" : ""
          )}
          disabled={loading}
        >
          {loading ? "Contacter..." : "Nous contacter"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
