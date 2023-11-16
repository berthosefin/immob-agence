import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Property } from "@prisma/client";
import Link from "next/link";
import { Badge } from "../ui/badge";

export const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            <Link href={`/property/${property.id}`}>{property.title}</Link>
          </CardTitle>
          {property.sold && (
            <Badge className="bg-destructive text-white">Vendu</Badge>
          )}
        </div>
        <CardDescription className="text-justify overflow-hidden whitespace-nowrap overflow-ellipsis">
          {property.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {property.surface}
          {"\u33A1"} - {property.city} ({property.postal_code})
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-base font-bold">
          {new Intl.NumberFormat("mg-MG", {
            style: "currency",
            currency: "MGA",
            minimumFractionDigits: 2,
          }).format(property.price)}
        </p>
      </CardFooter>
    </Card>
  );
};
