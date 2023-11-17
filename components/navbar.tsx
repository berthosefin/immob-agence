"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  const [state, setState] = React.useState(false);
  const pathname = usePathname();

  let menus;

  if (pathname.startsWith("/admin/")) {
    menus = [
      { title: "Gérer les biens", path: "/admin/property" },
      { title: "Gérer les options", path: "/admin/option" },
    ];
  } else {
    menus = [{ title: "Les biens", path: "/property" }];
  }

  return (
    <nav className="w-full border-b mb-4">
      <div className="items-center px-4 mx-auto md:flex md:px-4">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-3xl font-bold text-base-600">Immbo Agence</h1>
          </Link>
          <div className="flex items-center md:hidden">
            <ModeToggle />
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="hover:font-bold">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
            <div className="hidden md:block">
              <ModeToggle />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
