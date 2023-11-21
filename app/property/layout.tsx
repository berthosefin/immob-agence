import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Immob Agence",
    default: "Immob Agence",
  },
  description: "Immbo Agence",
};

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container">{children}</div>
    </>
  );
}
