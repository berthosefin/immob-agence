import { OptionForm } from "@/components/options/form";
import { generatePageTitle } from "@/lib/page-utils";
import { Metadata } from "next";

const page_title = generatePageTitle("option", "create");

export const metadata: Metadata = {
  title: page_title,
};

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{page_title}</h1>
      <OptionForm optionData={null} />
    </div>
  );
}
