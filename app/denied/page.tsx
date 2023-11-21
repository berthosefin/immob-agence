import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const page_title = "Accès refusé";

export const metadata: Metadata = {
  title: page_title,
};

export default function Denied() {
  return (
    <section className="flex flex-col gap-4 mt-12 items-center">
      <h1 className="text-3xl flex font-bold text-destructive">
        <AlertTriangle className="mr-2" />
        {page_title}
      </h1>
      <p className="text-center">
        Vous êtes connecté, mais vous n&apos;avez pas le niveau d&apos;accès
        requis pour visualiser cette page
      </p>
      <Button asChild>
        <Link href={"/"}>Return to Home Page</Link>
      </Button>
    </section>
  );
}
