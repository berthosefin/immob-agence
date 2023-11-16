import { getProperties } from "@/lib/actions";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { ConfirmDelete } from "../confirm-delete";
import { getTotalPropertiesCount } from "@/lib/property-utils";
import Pagination from "../pagination";

export default async function PropertyTable({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const properties = await getProperties({ page: currentPage });
  const totalProperties = await getTotalPropertiesCount();

  return (
    <>
      {properties && properties.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Surface ({"\u33A1"})</TableHead>
                <TableHead className="text-right">Prix</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties?.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">
                    {property.title}
                  </TableCell>
                  <TableCell>{property.city}</TableCell>
                  <TableCell>{property.surface}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("mg-MG", {
                      style: "currency",
                      currency: "MGA",
                      minimumFractionDigits: 2,
                    }).format(property.price)}
                  </TableCell>
                  <TableCell className="text-right space-x-4 flex justify-end">
                    <Link href={`/admin/property/${property.id}/edit`}>
                      <Pencil className="w-5 text-gray-500" />
                    </Link>
                    <ConfirmDelete id={property.id} itemName="property" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalItems={totalProperties}
            path="/admin/property"
          />
        </>
      ) : (
        <p className="text-center text-gray-400 my-4">Aucun bien enregistré.</p>
      )}
    </>
  );
}
