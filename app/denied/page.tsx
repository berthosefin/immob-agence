import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Denied() {
  return (
    <section className="flex flex-col gap-12 mt-8 items-center">
      <h1 className="text-3xl">Access Denied</h1>
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
