import { Metadata } from "next";
import NotFound from "./not-found";
import { getPropertyById } from "@/lib/actions";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("../../../components/contact-form"), {
  ssr: false,
});

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const property = await getPropertyById(params.id);

  return {
    title: property ? property.title : "Bien introuvable",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const propertyData = await getPropertyById(params.id);

  return (
    <>
      {propertyData ? (
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <div className="lg:w-2/3">
              {" "}
              <div className="flex items-center">
                <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl mb-2">
                  {propertyData.title}
                </h1>
                {propertyData.sold && (
                  <Badge className="bg-destructive text-white ml-4">
                    Vendu
                  </Badge>
                )}
              </div>
              <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
                {propertyData.rooms} pièces - {propertyData.surface} {"\u33A1"}
              </h2>
              <div className="font-extrabold text-4xl mb-2">
                {new Intl.NumberFormat("mg-MG", {
                  style: "currency",
                  currency: "MGA",
                  minimumFractionDigits: 2,
                }).format(propertyData.price)}
              </div>
              <hr />
              <div className="mt-4">
                <p className="line-clamp-3">{propertyData.description}</p>
                <div className="mt-4 flex space-x-4">
                  <div className="w-1/2">
                    <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
                      Caractéristique
                    </h2>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Surface habitable
                          </TableCell>
                          <TableCell>{propertyData.surface}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pièces</TableCell>
                          <TableCell>{propertyData.rooms}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Chambres
                          </TableCell>
                          <TableCell>{propertyData.bedrooms}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Etages</TableCell>
                          <TableCell>
                            {propertyData.floor
                              ? propertyData.floor
                              : "Rez de chaussé"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Localisation
                          </TableCell>
                          <TableCell>
                            {propertyData.address} - {propertyData.city} (
                            {propertyData.postal_code})
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="w-1/2">
                    <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0 mb-2">
                      Spécificités
                    </h2>
                    {propertyData.options.map((option) => (
                      <Badge key={option.optionId} className="mr-1">
                        {option.option.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="mt-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">
                  Intéressé par ce bien ?
                </h4>

                <ContactForm property={propertyData} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        NotFound()
      )}
    </>
  );
}
