"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash } from "lucide-react";
import { toast } from "./ui/use-toast";
import {
  deleteOption,
  deleteProperty,
  getOptionById,
  getPropertyById,
} from "@/lib/actions";
import { useEffect, useState } from "react";

export function ConfirmDelete({
  id,
  itemName,
}: {
  id: string;
  itemName: string;
}) {
  const fItemName = itemName === "property" ? "le bien" : "l'option";
  const [rItemName, setrItemName] = useState("");

  useEffect(() => {
    const updateItemName = async () => {
      try {
        let itemNameToDelete = "";
        if (itemName === "property") {
          const property = await getPropertyById(id);
          itemNameToDelete = property.title;
        } else if (itemName === "option") {
          const option = await getOptionById(id);
          itemNameToDelete = option.name;
        }
        setrItemName(itemNameToDelete);
      } catch (error) {
        console.error("Erreur lors de la récupération du nom :", error);
      }
    };

    updateItemName();
  }, [id, itemName]);

  const onDelete = async () => {
    try {
      await setrItemName("");
      if (itemName === "property") {
        await deleteProperty(id);
      } else if (itemName === "option") {
        await deleteOption(id);
      }
      toast({
        title: `Suppression`,
        description: `${
          fItemName.charAt(0).toUpperCase() + fItemName.slice(1)
        } a été supprimé avec succès`,
      });
    } catch (error) {
      toast({
        title: `Erreur lors de la suppression`,
        description: error,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash className={"w-5 text-red-800"} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous absolument sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement {fItemName} :{" "}
            <span className="font-bold text-destructive">{rItemName}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={onDelete}>
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
