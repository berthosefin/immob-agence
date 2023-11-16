import { OptionForm } from "@/components/options/form";
import { getOptionById } from "@/lib/actions";
import { generatePageTitle } from "@/lib/page-utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const page_title = generatePageTitle("option", "edit");

export const metadata: Metadata = {
  title: page_title,
};

export default async function Page({ params }: { params: { id: string } }) {
  const optionData = await getOptionById(params.id);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{page_title}</h1>
      {optionData ? <OptionForm optionData={optionData} /> : notFound()}
    </div>
  );
}
