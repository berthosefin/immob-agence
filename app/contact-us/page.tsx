import { ContactForm } from "@/components/contact-form";
import { Metadata } from "next";

const page_title = "Nous contacter";

export const metadata: Metadata = {
  title: page_title,
};

export default function Page() {
  return (
    <div className="container px-80">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-8">
        {page_title}
      </h1>
      <ContactForm />
    </div>
  );
}
