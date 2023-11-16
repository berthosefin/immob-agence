import OptionTable from "@/components/options/table";
import { Button } from "@/components/ui/button";
import { generatePageTitle } from "@/lib/page-utils";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const page_title = generatePageTitle("option");

export const metadata: Metadata = {
  title: page_title,
};

export default async function Page() {
  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{page_title}</h1>
        <Button asChild variant="outline">
          <Link href={"/admin/option/create"}>
            <span className="hidden md:block">Créer une option</span>{" "}
            <Plus className="h-5 md:ml-4" />
          </Link>
        </Button>
      </div>
      <OptionTable />
    </div>
  );
}
