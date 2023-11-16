import Pagination from "@/components/pagination";
import { PropertyCard } from "@/components/properties/card";
import { FilterForm } from "@/components/properties/filter-form";
import { getFilteredProperties } from "@/lib/actions";
import { generatePageTitle } from "@/lib/page-utils";
import { getTotalPropertiesCount } from "@/lib/property-utils";
import { Metadata } from "next";

const page_title = generatePageTitle("property");
const BLIMIT = 16;

export const metadata: Metadata = {
  title: page_title,
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    rooms?: string;
    surface?: string;
    price?: string;
    title?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const rooms = Number(searchParams?.rooms) || "";
  const surface = Number(searchParams?.surface) || "";
  const price = Number(searchParams?.price) || "";
  const title = searchParams?.title || "";

  const properties = await getFilteredProperties({
    page: currentPage,
    limit: BLIMIT,
    rooms,
    surface,
    price,
    title,
  });

  const totalProperties = await getTotalPropertiesCount();

  return (
    <>
      {properties && properties.length > 0 ? (
        <>
          <div className="container my-5">
            <FilterForm />
            <div className="flex flex-wrap">
              {properties?.map((property) => (
                <div
                  key={property.id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalItems={totalProperties}
              path="/property"
              limit={BLIMIT}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-400 my-4">Aucun bien enregistré.</p>
      )}
    </>
  );
}
