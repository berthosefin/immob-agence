import { getOptions } from "@/lib/actions";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { ConfirmDelete } from "../confirm-delete";
import Pagination from "../pagination";
import { getTotalOptionsCount } from "@/lib/option-utils";

export default async function OptionTable({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const options = await getOptions({ page: currentPage });
  const totalOptions = await getTotalOptionsCount();

  return (
    <>
      {options && options.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {options?.map((option) => (
                <TableRow key={option.id}>
                  <TableCell className="font-medium">{option.name}</TableCell>
                  <TableCell className="text-right space-x-4 flex justify-end">
                    <Link href={`/admin/option/${option.id}/edit`}>
                      <Pencil className="w-5 text-gray-500" />
                    </Link>

                    <ConfirmDelete id={option.id} itemName="option" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            currentPage={currentPage}
            totalItems={totalOptions}
            path="/admin/property"
          />
        </>
      ) : (
        <p className="text-center text-gray-400 my-4">
          Aucune option enregistrée.
        </p>
      )}
    </>
  );
}
