import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Denied() {
  return (
    <section className="flex flex-col gap-4 mt-12 items-center">
      <h1 className="text-3xl flex font-bold text-destructive">
        <AlertTriangle className="mr-2" />
        Access Denied
      </h1>
      <p className="text-center">
        You are logged in, but you do not have the required access level to view
        this page
      </p>
      <Button asChild>
        <Link href={"/"}>Return to Home Page</Link>
      </Button>
    </section>
  );
}
