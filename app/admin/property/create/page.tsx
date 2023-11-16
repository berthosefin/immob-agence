import { PropertyForm } from "@/components/properties/form";
import { getAllOptions } from "@/lib/actions";
import { generatePageTitle } from "@/lib/page-utils";
import { Metadata } from "next";

const page_title = generatePageTitle("property", "create");

export const metadata: Metadata = {
  title: page_title,
};

export default async function Page() {
  const allOptions = await getAllOptions();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{page_title}</h1>
      <PropertyForm propertyData={null} allOptions={allOptions} />
    </div>
  );
}
