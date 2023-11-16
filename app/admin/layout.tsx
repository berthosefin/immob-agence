import AdminNavbar from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Administration",
    default: "Administration",
  },
  description: "Immbo Agence",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container">{children}</div>;
}
