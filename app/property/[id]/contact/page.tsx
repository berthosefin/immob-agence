import { getPropertyById } from "@/lib/actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const ContactForm = dynamic(
  () => import("../../../../components/contact-form"),
  {
    ssr: false,
  }
);

const page_title = "Nous contacter";

export const metadata: Metadata = {
  title: page_title,
};

export default async function Page({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id);
  return (
    <>
      {property ? (
        <div className="container px-80">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-8">
            {page_title} pour le bien: {property.title}
          </h1>
          <ContactForm />
        </div>
      ) : (
        notFound()
      )}
    </>
  );
}
