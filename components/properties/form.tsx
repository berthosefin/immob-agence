"use client";

import { createProperty, editProperty } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { Option, Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Checkbox } from "../ui/checkbox";
import { numberRegExp } from "@/lib/constant";

export type PropertyWithOptions = Prisma.PropertyGetPayload<{
  include: {
    options: {
      include: {
        option: true;
      };
    };
  };
}>;

const formSchema = z.object({
  title: z.string().min(8),
  description: z.string().min(8),
  surface: z
    .string()
    .refine((val) => numberRegExp.test(val))
    .refine((val) => {
      const numericValue = parseFloat(val);
      return (
        !isNaN(numericValue) && isFinite(numericValue) && numericValue >= 10
      );
    }),
  rooms: z
    .string()
    .refine((val) => numberRegExp.test(val))
    .refine((val) => {
      const numericValue = parseFloat(val);
      return (
        !isNaN(numericValue) && isFinite(numericValue) && numericValue >= 1
      );
    }),
  bedrooms: z
    .string()
    .refine((val) => numberRegExp.test(val))
    .refine((val) => {
      const numericValue = parseFloat(val);
      return (
        !isNaN(numericValue) && isFinite(numericValue) && numericValue >= 0
      );
    }),
  floor: z
    .string()
    .refine((val) => numberRegExp.test(val))
    .refine((val) => {
      const numericValue = parseFloat(val);
      return (
        !isNaN(numericValue) && isFinite(numericValue) && numericValue >= 0
      );
    }),
  price: z
    .string()
    .refine((val) => numberRegExp.test(val))
    .refine((val) => {
      const numericValue = parseFloat(val);
      return (
        !isNaN(numericValue) && isFinite(numericValue) && numericValue >= 0
      );
    }),
  city: z.string().min(8),
  address: z.string().min(8),
  postal_code: z.string().min(3),
  sold: z.boolean(),
  options: z.array(z.object({ option: z.object({ id: z.string() }) })),
});

export type PropertyFormType = z.infer<typeof formSchema>;

export const PropertyForm = ({
  propertyData,
  allOptions,
}: {
  propertyData: PropertyWithOptions | null;
  allOptions: Option[];
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [property, setProperty] = useState<PropertyWithOptions | null>(null);

  const buttonLabel = propertyData ? "Editer" : "Créer";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      surface: property?.surface.toString() || "",
      rooms: property?.rooms.toString() || "",
      bedrooms: property?.bedrooms.toString() || "",
      floor: property?.floor.toString() || "",
      price: property?.price.toString() || "",
      city: property?.city || "",
      address: property?.address || "",
      postal_code: property?.postal_code || "",
      sold: property?.sold || false,
      options: propertyData?.options || [],
    },
  });

  useEffect(() => {
    const populate = async () => {
      setProperty(propertyData);

      form.reset({
        title: propertyData?.title || "",
        description: propertyData?.description || "",
        surface: propertyData?.surface.toString() || "",
        rooms: propertyData?.rooms.toString() || "",
        bedrooms: propertyData?.bedrooms.toString() || "",
        floor: propertyData?.floor.toString() || "",
        price: propertyData?.price.toString() || "",
        city: propertyData?.city || "",
        address: propertyData?.address || "",
        postal_code: propertyData?.postal_code || "",
        sold: propertyData?.sold || false,
        options: propertyData?.options || [],
      });
    };

    populate();
  }, [propertyData, form]);

  const performPropertyAction = async (
    action: "create" | "edit",
    propertyId: string | undefined,
    values: z.infer<typeof formSchema>
  ) => {
    const valuesToSave = {
      ...values,
      surface: parseInt(values.surface, 10),
      rooms: parseInt(values.rooms, 10),
      bedrooms: parseInt(values.bedrooms, 10),
      floor: parseInt(values.floor, 10),
      price: parseInt(values.price, 10),
    };

    try {
      let result;

      setLoading(true);

      if (action === "create") {
        result = await createProperty(valuesToSave);
      } else if (action === "edit" && propertyId) {
        result = await editProperty(propertyId, valuesToSave);
      }

      setLoading(true);

      const successMessage =
        action === "edit"
          ? `Bien mise à jour avec succès: ${result?.title}`
          : `Nouveau Bien créée avec succès: ${result?.title}`;

      router.push(`/admin/property`);
      toast({
        title: `Succès`,
        description: successMessage,
      });
    } catch (error) {
      const errorMessage =
        action === "edit"
          ? `Erreur lors de la mise à jour du bien: ${error}`
          : `Erreur lors de la création du bien: ${error}`;

      toast({
        title: `Erreur`,
        description: errorMessage,
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const action = propertyData ? "edit" : "create";
    performPropertyAction(action, propertyData?.id, values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex space-x-4">
          <div className="w-2/4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="surface"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface</FormLabel>
                  <FormControl>
                    <Input placeholder="Surface" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix</FormLabel>
                  <FormControl>
                    <Input placeholder="Prix" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pièces</FormLabel>
                  <FormControl>
                    <Input placeholder="Pièces" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chambres</FormLabel>
                  <FormControl>
                    <Input placeholder="Chambres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etage</FormLabel>
                  <FormControl>
                    <Input placeholder="Etage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Adresse" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input placeholder="Ville" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input placeholder="Code postal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="sold"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Vendue</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="options"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Options</FormLabel>
                <FormDescription>Sélectionner des options.</FormDescription>
              </div>
              {allOptions.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name="options"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={form
                              .getValues("options")
                              .some((o) => o?.option?.id === option.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                // Ajoutez l'option à la liste
                                form.setValue("options", [
                                  ...(form.getValues("options") || []),
                                  { option: { id: option.id } },
                                ]);
                              } else {
                                // Retirez l'option de la liste
                                form.setValue(
                                  "options",
                                  (form.getValues("options") || []).filter(
                                    (o) => o?.option?.id !== option.id
                                  )
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel
                          className={`font-normal ${
                            form
                              .getValues("options")
                              ?.some((o) => o?.option?.id === option.id)
                              ? "font-bold"
                              : ""
                          }`}
                        >
                          {option.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Chargement..." : buttonLabel}
        </Button>
      </form>
    </Form>
  );
};
