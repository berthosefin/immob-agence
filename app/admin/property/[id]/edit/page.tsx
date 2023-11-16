import { PropertyForm } from "@/components/properties/form";
import { getAllOptions, getPropertyById } from "@/lib/actions";
import { Metadata } from "next";
import NotFound from "./not-found";
import { generatePageTitle } from "@/lib/page-utils";

const page_title = generatePageTitle("property", "edit");

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const property = await getPropertyById(params.id);

  return {
    title: `${page_title} ${property.title}`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const propertyData = await getPropertyById(params.id);
  const allOptions = await getAllOptions();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {page_title}: `{propertyData.title}`
      </h1>
      {propertyData ? (
        <PropertyForm propertyData={propertyData} allOptions={allOptions} />
      ) : (
        NotFound()
      )}
    </div>
  );
}
